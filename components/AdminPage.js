import "./ConfigSignIn.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import LoadingAction from "../../../../themes/LoadingAction/LoadingAction";
import ConfigAuth from "../ConfigAuth/ConfigAuth";
import signin from "../../../../assets/images/config.png";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

const initialDataSignIn = {
  email: "",
  password: "",
};

const initErrorField = {
  nome: undefined,
  email: undefined,
  password: undefined,
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const ConfigSignIn = (props) => {
  const { setDataUser, loading, notiMessage, setNotiMessage } =
    useContext(AuthContext);

  const [dataAuth, setDataSingUp] = useState({ ...initialDataSignIn });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorField, setErrorField] = useState({ ...initErrorField });
  const [isLoading, setIsLoading] = useState(false);

  const onsubmit = () => {
    let dataErrorField = {};
    if (dataAuth.nome.trim() === "") {
      dataErrorField = {
        ...dataErrorField,
        nome: "Nome obrigatório.",
      };
    }
    if (dataAuth.email.trim() === "") {
      dataErrorField = {
        ...dataErrorField,
        email: "Email obrigatório.",
      };
    } else if (!validateEmail(dataAuth.email.trim())) {
      dataErrorField = {
        ...dataErrorField,
        email: "Email inválido.",
      };
    }
    if (dataAuth.password.trim() === "") {
      dataErrorField = {
        ...dataErrorField,
        password: "Senha obrigatória",
      };
    } else if (dataAuth.password.trim().length < 6) {
      dataErrorField = {
        ...dataErrorField,
        password: "Senha tem que ter no mínimo 6 dígitos.",
      };
    }

    setSuccess(false);
    if (Object.keys(dataErrorField).length === 0) {
      setIsLoading(true);
      setError(null);
      axios
        .post(`${process.env.REACT_APP_SERVIDOR}/config`, {
          nome: dataAuth.nome,
          senha: dataAuth.password,
          email: dataAuth.email.trim(),
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            setSuccess(true);

            setNotiMessage({
              type: "success",
              message: res.data?.msg,
            });
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          setIsLoading(false);

          setNotiMessage({
            type: "error",
            message: err?.response?.data?.error,
          });
        });
    } else {
      setErrorField((prev) => {
        return {
          ...prev,
          ...dataErrorField,
        };
      });
    }
  };

  return (
    <>
      <NotificationContainer />
      {isLoading && <LoadingAction />}
      <ConfigAuth
        authTitle={"Login"}
        authDescription={"Preencha com e-mail e senha."}
        authFields={[
          {
            label: "Nome",
            placeholder: "Digite seu nome",
            name: "name",
            value: dataAuth?.nome ?? "",
            type: "text",
            setField: (value) => {
              setDataSingUp((prev) => ({
                ...prev,
                nome: value,
              }));
              setErrorField((prev) => ({
                ...prev,
                nome: undefined,
              }));
            },
            error: errorField?.nome ?? "",
          },
          {
            label: "E-mail",
            placeholder: "Digite seu e-mail",
            name: "email",
            value: dataAuth?.email ?? "",
            type: "text",
            setField: (value) => {
              setDataSingUp((prev) => ({
                ...prev,
                email: value,
              }));
              setErrorField((prev) => ({
                ...prev,
                email: undefined,
              }));
            },
            error: errorField?.email ?? "",
          },
          {
            label: "Senha",
            placeholder: "Digite sua senha",
            name: "password",
            value: dataAuth?.password ?? "",
            type: "password",
            setField: (value) => {
              setDataSingUp((prev) => ({
                ...prev,
                password: value,
              }));
              setErrorField((prev) => ({
                ...prev,
                password: undefined,
              }));
            },
            error: errorField?.password ?? "",
          },
        ]}
        authSubmit={"Iniciar minha V4"}
        textImage={"INICIAR V4"}
        authImage={signin}
        onsubmit={() => {
          onsubmit();
        }}
        success={success}
        successMessage={success ? "Usuário cadastrado com sucesso!" : ""}
        errorMessage={error ?? ""}
        isSignIn={true}
      />
    </>
  );
};

export default ConfigSignIn;
