"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { AdminRolType } from "../../../../../../api/src/utils/enums/admin_roles.enum";

import PatientRequestsLayout from "@/components/admin/request_list/patient_requests/PatientRequestsLayout";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setIdNumberAdmin } from "@/redux/features/admin/adminSlice";
import {
  setIsPageLoading,
  setAdminModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";

import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";

const PatientRequestsPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN];
  useRoleValidation(allowedRoles);

  const adminModalState = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idNumberAdminLoginState = useAppSelector(
    (state) => state.adminLogin.id_number
  );

  const idNumberAdminState = useAppSelector((state) => state.admin.id_number);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: adminData,
    isLoading: adminDataLoading,
    isFetching: adminDataFetching,
    error: adminDataError,
  } = useGetAdminByIdNumberQuery(idNumberAdminLoginState);

  useEffect(() => {
    if (!idNumberAdminState) {
      dispatch(setIdNumberAdmin(adminData?.id_number));
    }
    if (!idNumberAdminLoginState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
      redirect("/login_admin");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login_admin");
    }
    if (adminModalState) {
      dispatch(setAdminModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [status, idNumberAdminLoginState, idNumberAdminState, adminModalState]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberAdminLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="dashboard-patient-requests-admin-content">
          <PatientRequestsLayout />
        </div>
      )}
    </div>
  );
};

export default PatientRequestsPage;
