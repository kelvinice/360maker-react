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
import {useMenu} from "../../providers/MenuProvider";

const ViewVideoModal = () => {
    const {imageToView, setImageToView}= useMenu();

    return (
        <>
            {
                imageToView &&
                <MDBModal staticBackdrop={true} show={true} tabIndex='-1'>
                    <MDBModalDialog size={"lg"}>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Media</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={()=>setImageToView(null)}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <img src={imageToView} alt="image" width="100%" height="100%"/>
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            }
        </>
    );
};

export default ViewVideoModal;
