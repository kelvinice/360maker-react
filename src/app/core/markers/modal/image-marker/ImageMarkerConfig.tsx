import React, {FC} from 'react';
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import ImageConfigMarkerForm from "./form/ImageConfigMarkerForm";
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";

const ImageMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <>
            <MDBModalBody>
                <ImageConfigMarkerForm props={props} />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='primary' onClick={props.handleSubmit(props.submit)}>Save Config</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default ImageMarkerConfig;