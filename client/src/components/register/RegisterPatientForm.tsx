"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import {
  Card,
  Form,
  Button,
  Checkbox,
  CheckboxProps,
  Input,
  Radio,
  Select,
  Space,
  Typography,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import {
  setNameUserPatient,
  setIdTypeUserPatient,
  setIdTypeAbbrevUserPatient,
  setIdNumberUserPatient,
  setGenderUserPatient,
  setBirthdateUserPatient,
  setEmailUserPatient,
  setCellphoneUserPatient,
  setPasswordUserPatient,
  setAuthMethodUserPatient,
  setResidenceAddressUserPatient,
  setAffiliationEpsUserPatient,
  setErrorsUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

import { IdTypeAbbrev } from "../../../../api/src/users/enums/id_type_abbrev.enum";

const RegisterPatientForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const namePatientState = useAppSelector((state) => state.patient.name);
  const idTypePatientState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idTypeAbbrevPatientState = useAppSelector(
    (state) => state.patient.id_type_abbrev
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const genderPatientState = useAppSelector(
    (state) => state.patient.user_gender
  );
  const passwordPatientState = useAppSelector(
    (state) => state.patient.password
  );
  const birthdatePatientState = useAppSelector(
    (state) => state.patient.birthdate
  );
  const emailPatientState = useAppSelector((state) => state.patient.email);
  const cellphonePatientState = useAppSelector(
    (state) => state.patient.cellphone
  );
  const authMethodPatientState = useAppSelector(
    (state) => state.patient.auth_method
  );
  const affiliationEpsPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const residenceAddressPatientState = useAppSelector(
    (state) => state.patient.residence_address
  );
  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const {
    data: gendersData,
    isLoading: gendersLoading,
    isFetching: gendersFetching,
    error: gendersError,
  } = useGetAllGendersQuery(null);
  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const [allGendersData, setAllGendersData]: any = useState([]);
  const [allAuthMethodsData, setAllAuthMethodsData]: any = useState([]);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isSubmittingConfirmData, setIsSubmittingConfirmData] = useState(false);
  const [isSubmittingIncorrectData, setIsSubmittingIncorrectData] =
    useState(false);
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  useEffect(() => {
    if (!gendersLoading && !gendersFetching && gendersData) {
      setAllGendersData(gendersData);
    }
    if (gendersError) {
      dispatch(setErrorsUserPatient("¡No se pudo obtener los tipos de sexo!"));
      setShowErrorMessagePatient(true);
      setAllGendersData(gendersData);
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setAllAuthMethodsData(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserPatient(
          "¡No se pudo obtener los métodos de autenticación!"
        )
      );
      setShowErrorMessagePatient(true);
      setAllAuthMethodsData(authMethodData);
    }
  }, [
    gendersLoading,
    gendersFetching,
    gendersData,
    gendersError,
    authMethodLoading,
    authMethodFetching,
    authMethodData,
    authMethodError,
  ]);

  const handleConfirmData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirmData(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingConfirmData(false);
    }
  };

  const handleIncorrectData = async (e: React.MouseEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingIncorrectData(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingIncorrectData(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserPatient([]));
    setShowErrorMessagePatient(false);
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const customCheckboxValidator = async (_: any, value: boolean) => {
    if (!value) {
      throw new Error(
        "¡Para continuar debes aceptar las políticas de tratamientos de datos!"
      );
    }
  };

  return (
    <Card
      style={{
        width: 321,
        height: "min-content",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        marginBottom: 31,
      }}
    >
      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
        />
      )}

      <h2
        className="title-register-patient"
        style={{
          fontWeight: "500",
          lineHeight: 1.3,
          marginTop: 7,
          marginBottom: 7,
          textAlign: "center",
        }}
      >
        Confirmar datos
      </h2>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Nombre de paciente:
        </Typography.Title>
        <Input id="name-patient-auto-input" value={namePatientState} disabled />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Tipo de documento:
        </Typography.Title>
        <Input
          id="id-type-patient-auto-input"
          value={idTypePatientState}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Número de documento:
        </Typography.Title>
        <Input
          id="patient-id-number-hosvital"
          value={idNumberPatientState}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Fecha de nacimiento:
        </Typography.Title>
        <Input
          id="patient-birthdate-hosvital"
          value={birthdatePatientState}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Correo electrónico:
        </Typography.Title>
        <Input
          id="patient-email-hosvital"
          value={emailPatientState}
          size="large"
          style={{ fontSize: 8 }}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Número de celular:
        </Typography.Title>
        <Input
          id="patient-cellphone-hosvital"
          value={cellphonePatientState}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Afiliado a EPS:
        </Typography.Title>
        <Input
          id="patient-affiliationeps-hosvital"
          value={affiliationEpsPatientState}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Dirección de residencia:
        </Typography.Title>
        <Input
          id="patient-residenceaddress-hosvital"
          value={residenceAddressPatientState}
          size="large"
          style={{ fontSize: 8 }}
          disabled
        />
      </div>

      <Form
        id="patient-user-register-form"
        name="patient-user-register-form"
        className="patient-user-register-form"
        style={{ width: 270, marginTop: 13 }}
        onFinish={handleConfirmData}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        <h2
          className="title-register-patient"
          style={{
            fontWeight: "500",
            lineHeight: 1.3,
            marginBottom: 13,
            textAlign: "center",
          }}
        >
          Ingresar datos adicionales
        </h2>

        {gendersLoading || gendersFetching ? (
          <CustomSpin />
        ) : (
          <Form.Item
            name="patient-user-gender-register"
            label="Sexo descrito en documento de identidad"
            style={{ marginBottom: 22, textAlign: "start" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el tipo de género que aparece en tu documento de identidad!",
              },
            ]}
          >
            <Select
              value={allGendersData}
              placeholder="Seleccionar el sexo"
              onChange={(e) => dispatch(setGenderUserPatient(e))}
            >
              {allGendersData?.map((option: any) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="radio-select-auth-method"
          label="Método de autenticación"
          style={{ marginBottom: 22 }}
          rules={[
            {
              required: true,
              message: "¡Por favor selecciona un método de autenticación!",
            },
          ]}
        >
          <Radio.Group
            value={authMethodPatientState}
            onChange={(e) => dispatch(setAuthMethodUserPatient(e.target.value))}
            style={{ textAlign: "start" }}
          >
            <Space size={"small"} direction="horizontal">
              {allAuthMethodsData?.map((option: any) => (
                <Radio key={option.id} value={option.id}>
                  {option.name}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="patient-user-password-register"
          label="Contraseña"
          style={{ marginBottom: 22 }}
          rules={[
            {
              required: true,
              message: "¡Por favor ingresa tu contraseña!",
            },
            {
              min: 7,
              message: "¡La contraseña debe tener mínimo 7 caracteres!",
            },
            {
              max: 14,
              message: "¡La contraseña debe tener máximo 14 caracteres!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value={passwordPatientState}
            placeholder="Contraseña"
            onChange={(e) => dispatch(setPasswordUserPatient(e.target.value))}
          />
        </Form.Item>

        <Form.Item
          name="checkbox-data-autorization"
          valuePropName="checked"
          style={{ textAlign: "center", marginBottom: 13 }}
          rules={[
            {
              validator: customCheckboxValidator,
            },
          ]}
        >
          <div style={{ marginBlock: 7 }}>
            <div style={{ marginBottom: 13 }}>
              <a
                className="data-processing-autorization-link"
                href={process.env.NEXT_PUBLIC_DATA_PROCESSING_AUTORIZATION_LINK}
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                Leer Política de Tratamiento de Datos
              </a>
            </div>
            <Checkbox
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            >
              Acepto las políticas de tratamiento de datos personales
            </Checkbox>
          </div>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          {isSubmittingConfirmData ? (
            <CustomSpin />
          ) : (
            <Button
              size="large"
              style={{
                paddingInline: 31,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
                marginBlock: 7,
              }}
              htmlType="submit"
              className="patient-confirm-data-button"
              onClick={handleButtonClick}
              onMouseDown={handleButtonClick}
            >
              Datos Correctos
            </Button>
          )}
          {isSubmittingIncorrectData ? (
            <CustomSpin />
          ) : (
            <Button
              size="large"
              style={{
                paddingInline: 31,
                borderRadius: 31,
                backgroundColor: "#8C1111",
                color: "#f2f2f2",
                marginTop: 7,
              }}
              className="patient-incorrect-data-button"
              onClick={handleIncorrectData}
              onMouseDown={handleButtonClick}
            >
              Datos Incorrectos
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterPatientForm;
