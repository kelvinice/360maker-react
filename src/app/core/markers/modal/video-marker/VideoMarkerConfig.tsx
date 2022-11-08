import React, {FC} from 'react';
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import VideoConfigMarkerForm from "./form/VideoConfigMarkerForm";
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";

const VideoMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <>
            <MDBModalBody>
                <VideoConfigMarkerForm props={props} />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='primary' onClick={props.handleSubmit(props.submit)}>Save Config</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default VideoMarkerConfig;