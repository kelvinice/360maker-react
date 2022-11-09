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

const ShortcutModal = () => {
    const {modalShortcut, setModalShortcut} = useMenu();

    return (
        <>
            <MDBModal staticBackdrop show={modalShortcut} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Shortcut</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setModalShortcut(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            Shortcut
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ShortcutModal;