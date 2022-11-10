import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";

const ViewShortcutModal = () => {
    const {modalShortcut, setModalShortcut, setShortcutToManage, shortcutToManage} = useMenu();

    return (
        <>
            <MDBModal staticBackdrop show={modalShortcut && shortcutToManage === null} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Shortcut</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setModalShortcut(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            Shortcut
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={()=>setShortcutToManage("")}>Add Shortcut</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ViewShortcutModal;