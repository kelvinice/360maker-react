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
    const {setSceneToManage, sceneToManage} = useMenu();

    return (
        <MDBModal staticBackdrop show={sceneToManage !== null} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Manage Scene</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={()=>{setSceneToManage(null)}}></MDBBtn>
                    </MDBModalHeader>
                    <AddSceneModalForm />
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default AddSceneModal;