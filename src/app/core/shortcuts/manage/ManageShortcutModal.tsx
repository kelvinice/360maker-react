import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";
import ManageSceneForm from "./form/ManageSceneForm";

const ManageShortcutModal = () => {
    const {shortcutToManage, setShortcutToManage} = useMenu();

    return (
        <MDBModal staticBackdrop show={shortcutToManage !== null} tabIndex='-1'>
            <MDBModalDialog size={"xl"} scrollable={true}>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Manage Shortcut</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={()=>setShortcutToManage(null)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <ManageSceneForm />
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default ManageShortcutModal;