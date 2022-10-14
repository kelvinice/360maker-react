import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";
import AddSceneModalForm from "./form/AddSceneModalForm";

const AddSceneModal = () => {
    const {setModalAddScene, modalAddScene} = useMenu();

    const toggleShow = () => {
        setModalAddScene(!modalAddScene);
    }

    return (
        <MDBModal staticBackdrop show={modalAddScene} setShow={setModalAddScene} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Add Scene</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <AddSceneModalForm />
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default AddSceneModal;