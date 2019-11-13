import React from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../../Common/Forms/LoginForm/LoginForm";

const Login = props => {
  const onSubmit = formData => {
    props.login(formData.login, formData.password);
  };

  return (
    (props.isAuth && (props.userRole === "client" || props.userRole === "guest" ) && (
      <Redirect to={"/tariffs"} />
    )) ||
    (props.isAuth && props.userRole === "admin" && (
      <Redirect to={"/alltariffs"} />
    )) ||
    (props.isAuth && props.userRole === "mounter" && (
      <Redirect to={"/requests"} />
    )) || (
      <div>
        <LoginForm onSubmit={onSubmit} />
      </div>
    )
  );
};

export default Login;
