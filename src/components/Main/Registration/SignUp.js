import React from "react";
import styles from "./SignUp.module.css";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators.js";
import {maxLengthCreator} from "../../../utils/validators/validators";
import Input from "../../Common/FormControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const SignUpForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                Registration
                <div>
                    <Field label="login" name={"login"} component={Input} validate={[required, maxLength10]}/>
                </div>
                <div>
                    <Field label="password" name={"password"} component={Input}  validate={[required, maxLength10]} type={"password"} />
                </div>
                <div>
                    <Field component={Input} name={"rememberMe"} type={"checkbox"}/> Remember me
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
