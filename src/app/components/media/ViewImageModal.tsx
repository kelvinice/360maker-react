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
import LazyImage from "../lazy-image/LazyImage";

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
                                <LazyImage src={imageToView} alt={imageToView} width={"100%"} height={"500px"} />
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            }
        </>
    );
};

export default ViewVideoModal;
