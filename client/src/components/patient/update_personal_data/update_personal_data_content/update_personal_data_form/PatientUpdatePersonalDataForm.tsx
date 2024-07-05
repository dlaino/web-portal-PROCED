"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import PatientUpdatePersonalDataFormData from "./PatientUpdatePersonalDataFormData";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { IoMdArrowRoundBack } from "react-icons/io";

import {
  setAuthMethodUserPatient,
  setCellphoneUserPatient,
  setEmailUserPatient,
  setErrorsUserPatient,
  setResidenceAddressUserPatient,
  setWhatsappUserPatient,
} from "@/redux/features/patient/patientSlice";
import { setIdUserPatient } from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useUpdateUserPatientMutation } from "@/redux/apis/users/usersApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

const PatientUpdatePersonalDataForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const nameUserPatientState = useAppSelector((state) => state.patient.name);
  const idTypeNameUserPatientState = useAppSelector(
    (state) => state.patient.id_type_abbrev
  );
  const idNumberUserPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const genderNameUserPatientState = useAppSelector(
    (state) => state.patient.user_gender_abbrev
  );
  const affiliationEpsUserPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const emailUserPatientState = useAppSelector((state) => state.patient.email);
  const cellphoneUserPatientState = useAppSelector(
    (state) => state.patient.cellphone
  );
  const whatsappUserPatientState = useAppSelector(
    (state) => state.patient.whatsapp
  );
  const residendeAddressUserPatientState = useAppSelector(
    (state) => state.patient.residence_address
  );
  const authMethodUserPatientState = useAppSelector(
    (state) => state.patient.authentication_method
  );
  const patientErrorsState = useAppSelector((state) => state.patient.errors);

  const [hasChanges, setHasChanges] = useState(false);

  const [emailUserPatientLocalState, setEmailUserPatientLocalState] =
    useState("");
  const [cellphoneUserPatientLocalState, setCellphoneUserPatientLocalState] =
    useState(0);
  const [whatsappUserPatientLocalState, setWhatsappUserPatientLocalState] =
    useState(0);
  const [
    residendeAddressUserPatientLocalState,
    setResidendeAddressUserPatientLocalState,
  ] = useState("");
  const [authMethodPatientLocalState, setAuthMethodPatientLocalState] =
    useState(0);
  const [
    patientAuthMethodsListLocalState,
    setPatientAuthMethodsListLocalState,
  ]: any = useState([]);

  const [isSubmittingUpdatePersonalData, setIsSubmittingUpdatePersonalData] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const [
    updatePersonalDataPatient,
    {
      data: createMedicalReqPatientData,
      isLoading: createMedicalReqPatientLoading,
      isSuccess: createMedicalReqPatientSuccess,
      isError: createMedicalReqPatientError,
    },
  ] = useUpdateUserPatientMutation({
    fixedCacheKey: "updatePersonalDataPatient",
  });

  useEffect(() => {
    if (
      !userPatientLoading &&
      !userPatientFetching &&
      userPatientData &&
      !idUserPatientState
    ) {
      dispatch(setIdUserPatient(userPatientData.id));
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setPatientAuthMethodsListLocalState(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserPatient(
          "¡No se pudo obtener los métodos de autenticación!"
        )
      );
      setShowErrorMessagePatient(true);
      setPatientAuthMethodsListLocalState(authMethodData);
    }
  }, [
    userPatientData,
    userPatientLoading,
    userPatientFetching,
    idUserPatientState,
  ]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonalData(true);

      const response: any = await updatePersonalDataPatient({
        id: idUserPatientState,
        updateUser: {
          email: emailUserPatientLocalState || emailUserPatientState,
          cellphone:
            cellphoneUserPatientLocalState || cellphoneUserPatientState,
          whatsapp: whatsappUserPatientLocalState || whatsappUserPatientState,
          authentication_method:
            authMethodPatientLocalState || authMethodUserPatientState,
          residence_address:
            residendeAddressUserPatientLocalState ||
            residendeAddressUserPatientState,
        },
      });

      var updatePersonalDataError = response.error;

      var updatePersonalDataStatus = response.data.status;

      var updatePersonalDataValidationData = response.data?.message;

      if (updatePersonalDataError || updatePersonalDataStatus !== 202) {
        const errorMessage = updatePersonalDataError?.data.message;
        const validationDataMessage = updatePersonalDataValidationData;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserPatient(errorMessage[0]));

          setShowErrorMessagePatient(true);
        }
        if (Array.isArray(validationDataMessage)) {
          dispatch(setErrorsUserPatient(validationDataMessage[0]));

          setShowErrorMessagePatient(true);
        }
        if (
          typeof errorMessage === "string" ||
          typeof validationDataMessage === "string"
        ) {
          dispatch(setErrorsUserPatient(errorMessage));
          dispatch(setErrorsUserPatient(validationDataMessage));
          setShowErrorMessagePatient(true);
        }
      }

      if (updatePersonalDataStatus === 202 && !updatePersonalDataError) {
        setHasChanges(false);

        dispatch(
          setEmailUserPatient(
            emailUserPatientLocalState || emailUserPatientState
          )
        );
        dispatch(
          setCellphoneUserPatient(
            cellphoneUserPatientLocalState || cellphoneUserPatientState
          )
        );
        dispatch(
          setWhatsappUserPatient(
            whatsappUserPatientLocalState || whatsappUserPatientState
          )
        );
        dispatch(
          setAuthMethodUserPatient(
            authMethodPatientLocalState || authMethodUserPatientState
          )
        );
        dispatch(
          setResidenceAddressUserPatient(
            residendeAddressUserPatientLocalState ||
              residendeAddressUserPatientState
          )
        );

        setSuccessMessage("¡Datos del paciente actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdatePersonalData(false);
      setEmailUserPatientLocalState("");
      setCellphoneUserPatientLocalState(0);
      setWhatsappUserPatientLocalState(0);
      setAuthMethodPatientLocalState(0);
      setResidendeAddressUserPatientLocalState("");
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsUserPatient([]));
    setShowErrorMessagePatient(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        alignContent: "center",
        paddingInline: "31px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-start",
          paddingBlock: "7px",
          paddingInline: "7px",
        }}
      >
        <Button
          style={{
            paddingInline: "7px",
            color: "#015E90",
            fontWeight: "bold",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
          }}
          type="link"
          size="large"
          className="back-to-homepage-button"
          icon={<IoMdArrowRoundBack size={17} />}
          onClick={() => {
            router.push("/patient/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>
      </div>

      <Card
        key={"card-update-personal-data-patient-form"}
        style={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          margin: "0px",
          padding: "0px",
        }}
      >
        {showErrorMessagePatient && (
          <CustomMessage
            typeMessage="error"
            message={patientErrorsState?.toString() || "¡Error en la petición!"}
          />
        )}

        {showSuccessMessage && (
          <CustomMessage
            typeMessage="success"
            message={successMessage || "¡Proceso finalizado con éxito!"}
          />
        )}

        <PatientUpdatePersonalDataFormData
          nameUserPatientFormData={nameUserPatientState || NOT_REGISTER}
          idTypeNameUserPatientFormData={
            idTypeNameUserPatientState || NOT_REGISTER
          }
          idNumberUserPatientFormData={idNumberUserPatientState || NOT_REGISTER}
          genderNameUserPatientFormData={
            genderNameUserPatientState || NOT_REGISTER
          }
          affiliationEpsUserPatientFormData={
            affiliationEpsUserPatientState || NOT_REGISTER
          }
          handleConfirmUpdatePersonalDataFormData={
            handleConfirmUpdatePersonalData
          }
          initialValuesUpdatePersonalDataFormData={{
            "email-patient-hosvital": emailUserPatientState || NOT_REGISTER,
            "cellphone-patient-hosvital":
              cellphoneUserPatientState || NOT_REGISTER,
            "whatsapp-patient-hosvital":
              whatsappUserPatientState || NOT_REGISTER,
            "radio-select-auth-method-update-personal-data-patient":
              authMethodUserPatientState,
            "residence-address-patient-hosvital":
              residendeAddressUserPatientState || NOT_REGISTER,
          }}
          emailUserPatientFormData={emailUserPatientState || NOT_REGISTER}
          onChangeEmailUserPatientFormData={(e) => {
            setHasChanges(true);

            setEmailUserPatientLocalState(e.target.value.toLowerCase());
          }}
          cellphoneUserPatientFormData={
            cellphoneUserPatientState || NOT_REGISTER
          }
          onChangeCellphoneUserPatientFormData={(e) => {
            setHasChanges(true);

            setCellphoneUserPatientLocalState(parseInt(e.target.value, 10));
          }}
          whatsappUserPatientFormData={whatsappUserPatientState || NOT_REGISTER}
          onChangeWhatsappUserPatientFormData={(e) => {
            setHasChanges(true);

            setWhatsappUserPatientLocalState(parseInt(e.target.value, 10));
          }}
          authMethodUserPatientFormData={authMethodUserPatientState}
          onChangeAuthMethodUserPatientFormData={(e) => {
            setHasChanges(true);

            setAuthMethodPatientLocalState(e.target.value);
          }}
          patientAuthMethodsListFormData={patientAuthMethodsListLocalState}
          residendeAddressUserPatientFormData={
            residendeAddressUserPatientState || NOT_REGISTER
          }
          onChangeResidendeAddressUserPatientFormData={(e) => {
            setHasChanges(true);

            setResidendeAddressUserPatientLocalState(
              e.target.value.toUpperCase()
            );
          }}
          isSubmittingUpdatePersonalDataFormData={
            isSubmittingUpdatePersonalData
          }
          hasChangesFormData={hasChanges}
          handleButtonClickFormData={handleButtonClick}
        />
      </Card>
    </Col>
  );
};

export default PatientUpdatePersonalDataForm;