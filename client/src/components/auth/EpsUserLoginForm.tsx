"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import EpsModalVerificationCode from "./EpsModalVerificationCode";
import { Button, Card, Col, Form, Input, Select } from "antd";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import {
  setIdTypeOptionsLoginEps,
  setIdTypeLoginEps,
  setIdNumberLoginEps,
  setPasswordLoginEps,
  setVerificationCodeLoginEps,
  setErrorsLoginEps,
} from "@/redux/features/login/epsUserLoginSlice";
import { setEpsModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useLoginEpsUsersMutation } from "@/redux/apis/auth/loginUsersApi";

const EpsUserLoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const idTypeOptionsEps = useAppSelector(
    (state) => state.epsUserLogin.idTypeOptions
  );
  const idTypeEpsState = useAppSelector((state) => state.epsUserLogin.id_type);
  const idNumberEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );
  const passwordEpsState = useAppSelector(
    (state) => state.epsUserLogin.password
  );
  const errorsEpsState = useAppSelector((state) => state.epsUserLogin.errors);

  const modalIsOpenEps = useAppSelector((state) => state.modal.epsModalIsOpen);

  const [isSubmittingEps, setIsSubmittingEps] = useState(false);
  const [showErrorMessageEps, setShowErrorMessageEps] = useState(false);

  const {
    data: idTypesEpsData,
    isLoading: idTypesEpsLoading,
    isFetching: idTypesEpsFetching,
    error: idTypesEpsError,
  } = useGetAllIdTypesQuery(null);

  const [
    loginEpsUsers,
    {
      data: isLoginEpsData,
      isLoading: isLoginEpsLoading,
      isSuccess: isLoginEpsSuccess,
      isError: isLoginEpsError,
    },
  ] = useLoginEpsUsersMutation({ fixedCacheKey: "loginEpsData" });

  useEffect(() => {
    if (
      !isLoginEpsSuccess &&
      !isSubmittingEps &&
      !isLoginEpsError &&
      isLoginEpsData
    ) {
      dispatch(setIdTypeLoginEps(""));
      dispatch(setIdNumberLoginEps(""));
      dispatch(setPasswordLoginEps(""));
      dispatch(setVerificationCodeLoginEps(""));
    }
    if (!idTypesEpsLoading && idTypesEpsData) {
      dispatch(setIdTypeOptionsLoginEps(idTypesEpsData));
    }
    if (idTypesEpsError) {
      setShowErrorMessageEps(true);
      dispatch(setIdTypeOptionsLoginEps(idTypesEpsData));
    }
    if (isLoginEpsSuccess && !isLoginEpsLoading && !isSubmittingEps) {
      dispatch(setErrorsLoginEps([]));
      setShowErrorMessageEps(false);
      dispatch(setEpsModalIsOpen(true));
    }
  }, [
    idTypesEpsData,
    idTypesEpsLoading,
    idTypesEpsError,
    isSubmittingEps,
    isLoginEpsError,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingEps(true);

      const response: any = await loginEpsUsers({
        id_type: idTypeEpsState,
        id_number: idNumberEpsState,
        password: passwordEpsState,
      });

      var isLoginUserError = response.error;

      if (isLoginUserError) {
        const errorMessage = isLoginUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginEps(errorMessage[0]));
          setShowErrorMessageEps(true);
        }
        if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginEps(errorMessage));
          setShowErrorMessageEps(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingEps(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginEps([]));
    setShowErrorMessageEps(false);
  };

  return (
    <Card
      style={{
        width: "max-content",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        marginBottom: 31,
      }}
    >
      {modalIsOpenEps && <EpsModalVerificationCode />}

      {showErrorMessageEps && (
        <CustomMessage
          typeMessage="error"
          message={errorsEpsState?.toString() || "¡Error en la petición!"}
        />
      )}

      <Col
        xs={24}
        md={24}
        lg={24}
        style={{ padding: "0 2px", width: "100vw", maxWidth: 321 }}
      >
        <Form
          id="eps-users-login-form"
          name="eps-users-login-form"
          className="eps-users-login-form"
          onFinish={handleSubmit}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-login-eps"
            style={{
              fontWeight: "500",
              lineHeight: 1.3,
              marginTop: 0,
              textAlign: "center",
            }}
          >
            Ingreso de usuario <br />
            Eps
          </h2>

          {idTypesEpsLoading || idTypesEpsFetching ? (
            <CustomSpin />
          ) : (
            <Form.Item
              name="eps-user-id-type"
              label="Tipo de identificación"
              style={{ marginBottom: 7 }}
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingresa tu tipo de identificación!",
                },
              ]}
            >
              <Select
                value={idTypeEpsState}
                placeholder="Tipo de identificación"
                onChange={(e) => dispatch(setIdTypeLoginEps(e))}
              >
                {idTypeOptionsEps?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="eps-user-id-number"
            label="Número de identificación"
            style={{ marginBottom: 7 }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu número de identificación!",
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de identificación sin puntos!",
              },
              {
                min: 7,
                message: "¡Por favor ingresa mínimo 7 números!",
              },
              {
                max: 11,
                message: "¡Por favor ingresa máximo 11 números!",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              type="number"
              value={idNumberEpsState}
              placeholder="Número de identificación"
              onChange={(e) => dispatch(setIdNumberLoginEps(e.target.value))}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="eps-user-password"
            label="Contraseña"
            style={{ marginBottom: 13 }}
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
              value={passwordEpsState}
              placeholder="Contraseña"
              onChange={(e) => dispatch(setPasswordLoginEps(e.target.value))}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <a
              className="eps-login-form-forgot-user"
              href=""
              style={{
                display: "flow",
                color: "#960202",
                textDecorationLine: "underline",
                fontWeight: 500,
                marginBottom: 13,
              }}
            >
              Olvide mi contraseña
            </a>

            {isSubmittingEps && isLoginEpsLoading ? (
              <CustomSpin />
            ) : (
              <Button
                size="large"
                style={{
                  paddingInline: 62,
                  borderRadius: 31,
                  backgroundColor: "#015E90",
                  color: "#f2f2f2",
                }}
                htmlType="submit"
                className="eps-login-form-button"
                onClick={handleButtonClick}
              >
                Ingresar
              </Button>
            )}
          </Form.Item>
          {/* <Form.ErrorList
          errors={errors?.map((error) => (
            <div
              key={error}
              style={{
                marginTop: 0,
                marginBottom: 13,
                textAlign: "center",
                color: "#960202",
              }}
            >
              {error}
            </div>
          ))}
        /> */}
        </Form>
      </Col>
    </Card>
  );
};

export default EpsUserLoginForm;
