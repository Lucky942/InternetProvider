import React from "react";
import styles from "./SignUp.module.css";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators.jsx";

const SignUpForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                Registration
                <div>
                    <Field placeholder="login" name={"login"} component={"input"} validate={[required]}/>
                </div>
                <div>
                    <Field placeholder="password" name={"password"} component={"input"} type={"password"}/>
                </div>
                <div>
                    <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> Remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
};

const SignUpReduxForm =  reduxForm({
    // a unique name for the form
    form: 'signup'
})(SignUpForm);

const SignUp = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    };

    return (
        <div className={styles.login}>
            <SignUpReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default SignUp;
