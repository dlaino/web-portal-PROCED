"use client";

import React, { useEffect, useState } from "react";

import { Button } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import ModalRequestsDetails from "./modal_requests_details/ModalRequestsDetails";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { tableColumnsAllRequests } from "./table_columns_all_requests/TableColumnsAllRequests";
import { TbEye } from "react-icons/tb";

import { getTagComponentStatus } from "@/components/common/custom_tags_medical_req_status/CustomTagsStatus";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import { getTagComponentType } from "@/components/common/custom_tags_medical_req_type/CustomTagsTypes";

import { useGetAllMedicalReqUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useViewFileQuery } from "@/redux/apis/upload_view_files/uploadViewFilesApi";
import { useGetAllPatientClassStatusQuery } from "@/redux/apis/patient_class_status/patientClassStatusApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";
import { useGetAllMedicalReqReasonsForRejectionQuery } from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";
import { formatFilingNumber } from "@/helpers/format_filing_number/format_filing_number";
import { reasonForRejectionMap } from "@/helpers/medical_req_reason_for_rejection_map/reason_for_rejection_map";
import { getTagComponentRelationshipType } from "@/components/common/custom_tags_relationship_types/CustomTagsRelationshipTypes";
import StatusItems from "./categorization_by_items/StatusItems";
import ModalActionButtons from "./modal_action_buttons/ModalActionButtons";

const AllRequestContent: React.FC = () => {
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<MedicalReq | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<
    string[] | undefined
  >([]);

  const {
    data: allMedicalReqUsersData,
    isLoading: allMedicalReqUsersLoading,
    isFetching: allMedicalReqUsersFetching,
    error: allMedicalReqUsersError,
  } = useGetAllMedicalReqUsersQuery({});

  const {
    data: userMedicalReqTypeData,
    isLoading: userMedicalReqTypeLoading,
    isFetching: userMedicalReqTypeFetching,
    error: userMedicalReqTypeError,
  } = useGetAllMedicalReqTypesQuery(null);

  const {
    data: userMedicalReqStatusData,
    isLoading: userMedicalReqStatusLoading,
    isFetching: userMedicalReqStatusFetching,
    error: userMedicalReqStatusError,
  } = useGetAllMedicalReqStatusQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: allPatientClassStatusData,
    isLoading: allPatientClassStatusLoading,
    isFetching: allPatientClassStatusFetching,
    error: allPatientClassStatusError,
  } = useGetAllPatientClassStatusQuery(null);

  const {
    data: allRelationshipWithPatientData,
    isLoading: allRelationshipWithPatientLoading,
    isFetching: allRelationshipWithPatientFetching,
    error: allRelationshipWithPatientError,
  } = useGetAllRelationshipTypesQuery(null);

  const {
    data: allCompanyAreasData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  const {
    data: userMedicalReqReasonsForRejectionData,
    isLoading: userMedicalReqReasonsForRejectionLoading,
    isFetching: userMedicalReqReasonsForRejectionFetching,
    error: userMedicalReqReasonsForRejectionError,
  } = useGetAllMedicalReqReasonsForRejectionQuery(null);

  const {
    data: documentUrls,
    isLoading: documentUrlsLoading,
    isFetching: documentUrlsFetching,
    error: documentUrlsError,
  } = useViewFileQuery(selectedDocumentId, { skip: !selectedDocumentId });

  useEffect(() => {
    if (
      documentUrls &&
      documentUrls.length > 0 &&
      !documentUrlsLoading &&
      !documentUrlsFetching &&
      !documentUrlsError
    ) {
      documentUrls.forEach((url) => {
        window.open(url, "_blank");
      });
    }
  }, [
    documentUrls,
    documentUrlsLoading,
    documentUrlsFetching,
    documentUrlsError,
  ]);

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const requirementTypeGetName = transformIdToNameMap(userMedicalReqTypeData);
  const requirementStatusGetName = transformIdToNameMap(
    userMedicalReqStatusData
  );
  const patientClassStatusGetName = transformIdToNameMap(
    allPatientClassStatusData
  );
  const relationshipWithPatientGetName = transformIdToNameMap(
    allRelationshipWithPatientData
  );
  const companyAreaGetName = transformIdToNameMap(allCompanyAreasData);

  const transformedData = Array.isArray(allMedicalReqUsersData)
    ? allMedicalReqUsersData.map((req: any) => ({
        ...req,
        requirement_type:
          requirementTypeGetName?.[req.requirement_type] ||
          req.requirement_type,
        requirement_status:
          requirementStatusGetName?.[req.requirement_status] ||
          req.requirement_status,
        patient_id_type:
          idTypeGetName?.[req.patient_id_type] || req.patient_id_type,
        patient_class_status:
          patientClassStatusGetName?.[req.patient_class_status] ||
          req.patient_class_status,
        relationship_with_patient:
          relationshipWithPatientGetName?.[req.relationship_with_patient] ||
          req.relationship_with_patient,
        aplicant_id_type:
          idTypeGetName?.[req.aplicant_id_type] || req.aplicant_id_type,
        currently_in_area:
          companyAreaGetName?.[req.currently_in_area] || req.currently_in_area,
      }))
    : [];

  const reasonForRejectionMapList = reasonForRejectionMap(
    userMedicalReqReasonsForRejectionData || []
  );

  const rejectionReasons = selectedRowDataLocalState?.motive_for_rejection?.map(
    (id) => reasonForRejectionMapList[id]
  );

  const handleClickSeeMore = (record: MedicalReq) => {
    setSelectedRowDataLocalState(record);

    setIsModalVisibleLocalState(true);
  };

  const handleButtonClick = (documentId: string[] | undefined) => {
    setSelectedDocumentId(documentId);
  };

  return (
    <CustomDashboardLayout
      customLayoutContent={
        <>
          {isModalVisibleLocalState && (
            <CustomModalNoContent
              key={"custom-modal-change-password-eps"}
              widthCustomModalNoContent={"100%"}
              minWidthCustomModalNoContent="960px"
              openCustomModalState={isModalVisibleLocalState}
              closableCustomModal={true}
              maskClosableCustomModal={false}
              handleCancelCustomModal={() => {
                setIsModalVisibleLocalState(false);

                setSelectedRowDataLocalState(null);
              }}
              contentCustomModal={
                <>
                  <ModalRequestsDetails
                    titleDescription={"Revisión de solicitud completa"}
                    labelFilingNumber={"N° de Radicado:"}
                    selectedRequestFilingNumber={formatFilingNumber(
                      selectedRowDataLocalState
                        ? selectedRowDataLocalState.filing_number
                        : "SIN NÚMERO DE RADICADO"
                    )}
                    labelRequestType={"Tipo de solicitud:"}
                    selectedRequestType={getTagComponentType(
                      selectedRowDataLocalState?.requirement_type.toString()
                    )}
                    labelRequestStatus={"Estado de solicitud:"}
                    selectedRequestStatus={getTagComponentStatus(
                      selectedRowDataLocalState?.requirement_status.toString()
                    )}
                    labelResponseDocuments={
                      "Documentos de respuesta a solicitud:"
                    }
                    selectedRequestResponseDocuments={
                      selectedRowDataLocalState?.documents_delivered ? (
                        <Button
                          className="documents-response-link-button-admin"
                          size="middle"
                          style={{
                            backgroundColor: "#015E90",
                            color: "#F7F7F7",
                          }}
                          onClick={() =>
                            handleButtonClick(
                              selectedRowDataLocalState?.documents_delivered
                            )
                          }
                        >
                          <div
                            style={{
                              minWidth: "137px",
                              display: "flex",
                              flexFlow: "row wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TbEye size={17} />
                            &nbsp;Ver documentos
                          </div>
                        </Button>
                      ) : (
                        <b style={{ color: "#960202" }}>
                          No hay documentos anexados
                        </b>
                      )
                    }
                    labelHaveRightPetition={"¿Tiene derecho de petición?:"}
                    selectedHaveRightPetition={
                      selectedRowDataLocalState?.copy_right_petition ? (
                        <Button
                          className="documents-right-petition-button-admin"
                          size="middle"
                          style={{
                            backgroundColor: "#015E90",
                            color: "#F7F7F7",
                          }}
                          onClick={() =>
                            handleButtonClick(
                              selectedRowDataLocalState?.copy_right_petition
                            )
                          }
                        >
                          <div
                            style={{
                              minWidth: "137px",
                              display: "flex",
                              flexFlow: "row wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TbEye size={17} />
                            &nbsp;Ver documentos
                          </div>
                        </Button>
                      ) : (
                        <b style={{ color: "#960202" }}>
                          No hay documentos anexados
                        </b>
                      )
                    }
                    labelRelationShipWithPatient="Parentesco con paciente:"
                    selectedRelationShipWithPatient={
                      selectedRowDataLocalState?.relationship_with_patient ? (
                        getTagComponentRelationshipType(
                          selectedRowDataLocalState?.relationship_with_patient.toString()
                        )
                      ) : (
                        <b style={{ color: "#960202" }}>No aplica</b>
                      )
                    }
                    labelAplicantName="Nombre de solicitante:"
                    selectedAplicantName={`${selectedRowDataLocalState?.aplicant_name} ${selectedRowDataLocalState?.aplicant_last_name}`}
                    labelAplicantIdType="Tipo de ID solicitante:"
                    selectedAplicantIdType={getTagComponentIdTypes(
                      selectedRowDataLocalState?.aplicant_id_type.toString()
                    )}
                    labelAplicantIdNumber="Número de ID solicitante"
                    selectedAplicantIdNumber={
                      selectedRowDataLocalState?.aplicant_id_number
                    }
                    labelAplicantEmail="Email de solicitante:"
                    selectedAplicantEmail={
                      selectedRowDataLocalState?.aplicant_email
                    }
                    labelCopyAplicantIdDocument="Copia de documento de identidad del solicitante"
                    selectedCopyAplicantIdDocument={
                      selectedRowDataLocalState?.copy_applicant_identification_document ? (
                        <Button
                          className="document-aplicant-id-button-admin"
                          size="middle"
                          style={{
                            backgroundColor: "#015E90",
                            color: "#F7F7F7",
                          }}
                          onClick={() =>
                            handleButtonClick(
                              selectedRowDataLocalState?.copy_applicant_identification_document
                            )
                          }
                        >
                          <div
                            style={{
                              minWidth: "137px",
                              display: "flex",
                              flexFlow: "row wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TbEye size={17} />
                            &nbsp;Ver documentos
                          </div>
                        </Button>
                      ) : (
                        <b style={{ color: "#960202" }}>
                          No hay documentos anexados
                        </b>
                      )
                    }
                    labelCopyPatientCitizenshipCard="Copia de cédula del paciente"
                    selectedCopyPatientCitizenshipCard={
                      selectedRowDataLocalState?.copy_patient_citizenship_card ? (
                        <Button
                          className="document-patient-citizenship-card-button-admin"
                          size="middle"
                          style={{
                            backgroundColor: "#015E90",
                            color: "#F7F7F7",
                          }}
                          onClick={() =>
                            handleButtonClick(
                              selectedRowDataLocalState?.copy_patient_citizenship_card
                            )
                          }
                        >
                          <div
                            style={{
                              minWidth: "137px",
                              display: "flex",
                              flexFlow: "row wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TbEye size={17} />
                            &nbsp;Ver documentos
                          </div>
                        </Button>
                      ) : (
                        <b style={{ color: "#960202" }}>
                          No hay documentos anexados
                        </b>
                      )
                    }
                    labelCopyPatientCivilRegistration="Copia de registro civil del paciente"
                    selectedCopyPatientCivilRegistration={
                      selectedRowDataLocalState?.copy_patient_civil_registration ? (
                        <Button
                          className="document-patient-civil-registration-button-admin"
                          size="middle"
                          style={{
                            backgroundColor: "#015E90",
                            color: "#F7F7F7",
                          }}
                          onClick={() =>
                            handleButtonClick(
                              selectedRowDataLocalState?.copy_patient_civil_registration
                            )
                          }
                        >
                          <div
                            style={{
                              minWidth: "137px",
                              display: "flex",
                              flexFlow: "row wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TbEye size={17} />
                            &nbsp;Ver documentos
                          </div>
                        </Button>
                      ) : (
                        <b style={{ color: "#960202" }}>
                          No hay documentos anexados
                        </b>
                      )
                    }
                    labelCopyParentsCitizenshipCard="Copia de cédula de padre o madre"
                    selectedCopyParentsCitizenshipCard={
                      selectedRowDataLocalState?.copy_parents_citizenship_card ? (
                        <Button
                          className="document-parents-citizenship-card-button-admin"
                          size="middle"
                          style={{
                            backgroundColor: "#015E90",
                            color: "#F7F7F7",
                          }}
                          onClick={() =>
                            handleButtonClick(
                              selectedRowDataLocalState?.copy_parents_citizenship_card
                            )
                          }
                        >
                          <div
                            style={{
                              minWidth: "137px",
                              display: "flex",
                              flexFlow: "row wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TbEye size={17} />
                            &nbsp;Ver documentos
                          </div>
                        </Button>
                      ) : (
                        <b style={{ color: "#960202" }}>
                          No hay documentos anexados
                        </b>
                      )
                    }
                    labelCopyMarriageCertificate="Copia de partida de matrimonio o certificado de unión libre"
                    selectedCopyMarriageCertificate={
                      selectedRowDataLocalState?.copy_marriage_certificate ? (
                        <Button
                          className="document-marriage-certificate-button-admin"
                          size="middle"
                          style={{
                            backgroundColor: "#015E90",
                            color: "#F7F7F7",
                          }}
                          onClick={() =>
                            handleButtonClick(
                              selectedRowDataLocalState?.copy_marriage_certificate
                            )
                          }
                        >
                          <div
                            style={{
                              minWidth: "137px",
                              display: "flex",
                              flexFlow: "row wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TbEye size={17} />
                            &nbsp;Ver documentos
                          </div>
                        </Button>
                      ) : (
                        <b style={{ color: "#960202" }}>
                          No hay documentos anexados
                        </b>
                      )
                    }
                    labelCopyCohabitationCertificate="Certificado de convivencia"
                    selectedCopyCohabitationCertificate={
                      selectedRowDataLocalState?.copy_cohabitation_certificate ? (
                        <Button
                          className="document-cohabitation-certificate-button-admin"
                          size="middle"
                          style={{
                            backgroundColor: "#015E90",
                            color: "#F7F7F7",
                          }}
                          onClick={() =>
                            handleButtonClick(
                              selectedRowDataLocalState?.copy_cohabitation_certificate
                            )
                          }
                        >
                          <div
                            style={{
                              minWidth: "137px",
                              display: "flex",
                              flexFlow: "row wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TbEye size={17} />
                            &nbsp;Ver documentos
                          </div>
                        </Button>
                      ) : (
                        <b style={{ color: "#960202" }}>
                          No hay documentos anexados
                        </b>
                      )
                    }
                    labelDateOfAdmission="Fecha de creación de solicitud:"
                    selectedDateOfAdmission={
                      selectedRowDataLocalState?.date_of_admission
                    }
                    labelAnswerDate="Fecha de respuesta de solicitud:"
                    selectedAnswerDate={
                      selectedRowDataLocalState?.answer_date || (
                        <b style={{ color: "#960202" }}>En Revisión</b>
                      )
                    }
                    labelResponseTime="Tiempo de respuesta a solicitud"
                    selectedResponseTime={
                      selectedRowDataLocalState?.response_time || (
                        <b style={{ color: "#960202" }}>En Revisión</b>
                      )
                    }
                    labelCurrentlyInArea="Área actual"
                    selectedCurrentlyInArea={
                      selectedRowDataLocalState?.currently_in_area
                    }
                    labelDocumentExpirationDate="Fecha de expiración de documentos:"
                    selectedRequestDocumentExpirationDate={
                      selectedRowDataLocalState?.download_expiration_date || (
                        <b style={{ color: "#960202" }}>No aplica</b>
                      )
                    }
                    labelReasonsForRejection="Motivos de rechazo a solicitud:"
                    selectedRequestReasonsForRejection={
                      rejectionReasons && rejectionReasons.length > 0 ? (
                        <ul style={{ padding: "0px", margin: "0px" }}>
                          {rejectionReasons?.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      ) : (
                        <b style={{ color: "#960202" }}>No aplica</b>
                      )
                    }
                    labelUserComments={"Detalles del usuario para solicitud:"}
                    selectedRequestUserComments={
                      selectedRowDataLocalState?.user_message
                    }
                    labelPatientName="Nombre de paciente:"
                    selectedPatientName={
                      selectedRowDataLocalState?.patient_name
                    }
                    labelPatientIdType="Tipo de ID paciente:"
                    selectedPatientIdType={getTagComponentIdTypes(
                      selectedRowDataLocalState?.patient_id_type.toString()
                    )}
                    labelPatientIdNumber="Número de ID paciente:"
                    selectedPatientIdNumber={
                      selectedRowDataLocalState?.patient_id_number
                    }
                    labelPatientClassStatus="Tipo de paciente"
                    selectedPatientClassStatus={
                      selectedRowDataLocalState?.patient_class_status || (
                        <b style={{ color: "#960202" }}>No aplica</b>
                      )
                    }
                    labelRegistrationDates="Lapso de tiempo registros"
                    selectedRegistrationDates={
                      selectedRowDataLocalState?.registration_dates
                    }
                    labelRequestResponse={"Mensaje de respuesta a solicitud:"}
                    selectedRequestResponse={
                      selectedRowDataLocalState?.response_comments || (
                        <b style={{ color: "#960202" }}>
                          En espera de respuesta
                        </b>
                      )
                    }
                  />
                  <ModalActionButtons />
                </>
              }
            />
          )}

          {!transformedData ? (
            <CustomSpin />
          ) : (
            <>
              <StatusItems />

              <CustomTableFiltersAndSorting
                dataCustomTable={transformedData || []}
                columnsCustomTable={tableColumnsAllRequests({
                  handleClickSeeMore: handleClickSeeMore,
                  idTypesData: idTypesData,
                  userMedicalReqTypeData: userMedicalReqTypeData,
                  userMedicalReqStatusData: userMedicalReqStatusData,
                })}
              />
            </>
          )}
        </>
      }
    />
  );
};

export default AllRequestContent;
