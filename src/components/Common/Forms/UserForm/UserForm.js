import {Field, reduxForm} from "redux-form";
import React from "react";
import {required} from "../../../../utils/validators/validators";
import {UserFormInput} from "../../FormControls/FormsControls";

let UserForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field label={"Имя"} name="firstName" component={UserFormInput} type={"text"} validate={[required]} />
            </div>
            <div>
                <Field label={"Фамилия"} name="lastName" component={UserFormInput} type={"text"} validate={[required]} />
            </div>
            <div>
                <Field label={"Пасспорт"} name="passport" component={UserFormInput} type={"text"} validate={[required]} />
            </div>
            <div>
                <Field label={"Дата рождения"} name="birthday" component={UserFormInput} type={"date"} validate={[required]} />
            </div>
            <button type="submit">Принять</button>
        </form>
    );
};

export default reduxForm({
    form: "userForm"
})(UserForm)