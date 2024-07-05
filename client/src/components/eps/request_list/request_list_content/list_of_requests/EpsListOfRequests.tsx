"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card } from "antd";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import EpsRequestCardList from "../eps_request_card_list/EpsRequestCardList";
import CustomEmptyButton from "@/components/common/custom_empty_button/CustomEmptyButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPostAdd } from "react-icons/md";

import { setIdUserEps } from "@/redux/features/eps/epsSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";
import { useGetAllMedicalReqOfAUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";

const EpsListOfRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberUserEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );
  const idUserEpsState = useAppSelector((state) => state.eps.id);
  const medicalReqErrorsState = useAppSelector(
    (state) => state.medicalReq.errors
  );

  const [showErrorMessageMedicalReq, setShowErrorMessageMedicalReq] =
    useState(false);

  const {
    data: userEpsData,
    isLoading: userEpsLoading,
    isFetching: userEpsFetching,
    error: userEpsError,
  } = useGetUserByIdNumberEpsQuery(idNumberUserEpsState);

  const {
    data: userMedicalReqData,
    isLoading: userMedicalReqLoading,
    isFetching: userMedicalReqFetching,
    error: userMedicalReqError,
  } = useGetAllMedicalReqOfAUsersQuery(idUserEpsState, {
    // pollingInterval: 7000,
    // skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    if (userEpsData && !userEpsLoading && !userEpsFetching && !idUserEpsState) {
      dispatch(setIdUserEps(userEpsData.id));
    }
  }, [userEpsData, userEpsLoading, userEpsFetching, idUserEpsState]);

  return (
    <div
      style={{
        width: "98vw",
        display: "flex",
        flexFlow: "column wrap",
        alignContent: "center",
        paddingInline: "22px",
      }}
    >
      {showErrorMessageMedicalReq && (
        <CustomMessage
          typeMessage="error"
          message={
            medicalReqErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock: "7px",
          paddingInline: "7px",
        }}
      >
        <Button
          style={{
            color: "#015E90",
            fontWeight: "bold",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
            paddingInline: "7px",
          }}
          type="link"
          size="large"
          className="back-to-homepage-button"
          icon={<IoMdArrowRoundBack size={17} />}
          onClick={() => {
            router.push("/eps/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>

        <Button
          style={{
            backgroundColor: "#1D8348",
            color: "#f2f2f2",
            fontWeight: "bold",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
            paddingInline: "13px",
          }}
          type="primary"
          size="middle"
          className="go-to-create-request-page-button"
          icon={<MdPostAdd size={17} />}
          onClick={() => {
            router.push("/eps/homepage/create_request", {
              scroll: true,
            });
          }}
        >
          Crear solicitud
        </Button>
      </div>

      {!userMedicalReqData &&
      userMedicalReqLoading &&
      userMedicalReqFetching ? (
        <CustomSpin />
      ) : Array.isArray(userMedicalReqData) ? (
        <Card
          key={"card-list-of-request-content-eps"}
          style={{
            width: "100%",
            maxWidth: "609px",
            minWidth: "405px",
            alignContent: "center",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            marginTop: "7px",
          }}
        >
          <h2
            style={{
              ...titleStyleCss,
              textAlign: "center",
            }}
          >
            Total de <b>{userMedicalReqData.length} solicitud(es)</b>
          </h2>

          <EpsRequestCardList requestCardListData={userMedicalReqData} />
        </Card>
      ) : (
        <Card
          key={"card-list-of-request-content-eps"}
          style={{
            width: "100%",
            maxWidth: "540px",
            alignContent: "center",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CustomEmptyButton
            titleCustomEmpty="Sin solicitudes"
            buttonCustomEmpty="Crear nueva solicitud"
            handleClickCustomEmpty={() => {
              router.push("/eps/homepage/create_request", {
                scroll: true,
              });
            }}
          />
        </Card>
      )}
    </div>
  );
};

export default EpsListOfRequests;