import React, {FC} from 'react';
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import PlaceConfigMarkerForm from "./form/PlaceConfigMarkerForm";
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";

const PlaceMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <>
            <MDBModalBody>
                <PlaceConfigMarkerForm props={props} />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='primary' onClick={props.handleSubmit(props.submit)}>Save Config</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default PlaceMarkerConfig;