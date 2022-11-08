import React, {FC} from 'react';
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import DescriptionConfigMarkerForm from "./form/DescriptionConfigMarkerForm";
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";

const DescriptionMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {

    return (
        <>
            <MDBModalBody>
                <DescriptionConfigMarkerForm props={props} />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='primary' onClick={props.handleSubmit(props.submit)}>Save Config</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default DescriptionMarkerConfig;