import React from 'react';
import {useMenu} from "../../../providers/MenuProvider";
import {
    MDBBtn, MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";

const RenderStuffModal = () => {
    const {VRSceneToView, setVRSceneToView} = useMenu();
    if(!VRSceneToView) return <></>;
    return (
        <MDBModal staticBackdrop={true} show={VRSceneToView !== ""} tabIndex='-1'>
            <MDBModalDialog size={"fullscreen"}>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>RenderStuff</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={()=>{setVRSceneToView(null)}}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <iframe width="100%" height="100%" title="someTitle" scrolling="no" src={VRSceneToView}>
                        </iframe>
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default RenderStuffModal;