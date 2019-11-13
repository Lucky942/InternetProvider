import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { createNewClient } from "../redux/authReducer";
import UserForm from "../components/Common/Forms/UserForm/UserForm";

let mapStateToProps = state => {
  return {
    role: state.auth.userRole
  };
};



const withModalWindow = Component => {
  let WithModalWindowComponent = props => {
    const [modalIsOpen, changeOpenModalStatus] = useState(false);

    const openModal = () => {
      changeOpenModalStatus(true);
    };

    const closeModal = () => {
      changeOpenModalStatus(false);
    };

    const submit = async values => {
      await props.createNewClient(
        values.firstName,
        values.lastName,
        values.passport,
        values.birthday
      );
      changeOpenModalStatus(false);
    };

    return (
      (props.role === "client" && <Component {...props} />) || (
        <>
          <Modal
            contentLabel="Example Modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <div>Заключить контракт с провайдером</div>
            <UserForm onSubmit={submit} />
          </Modal>
          <Component openModal={openModal} {...props} />
        </>
      )
    );
  };

  return connect(
    mapStateToProps,
    { createNewClient }
  )(WithModalWindowComponent);
};

export default withModalWindow;
