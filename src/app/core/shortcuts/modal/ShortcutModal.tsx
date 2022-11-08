import React from 'react';
import {MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";

const ShortcutModal = () => {
    const {modalShortcut} = useMenu();

    return (
        <>
            <MDBModal staticBackdrop show={modalShortcut} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Shortcut</MDBModalTitle>
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