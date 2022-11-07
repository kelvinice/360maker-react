import React from 'react';
import {
    MDBBtn, MDBModal,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";
import PlaceMarkerConfig from "./place-marker/PlaceMarkerConfig";
import {MarkerType} from "../../../constants/MarkerType";
import VideoMarkerConfig from "./video-marker/VideoMarkerConfig";
import ImageMarkerConfig from "./image-marker/ImageMarkerConfig";
import DescriptionMarkerConfig from "./description-marker/DescriptionMarkerConfig";

const ConfigMarkerModal = () => {
    const {markerToConfig, setMarkerToConfig} = useMenu();

    return (
        <>
            <MDBModal staticBackdrop show={markerToConfig !== null} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Marker</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setMarkerToConfig(null)}></MDBBtn>
                        </MDBModalHeader>
                        {
                            markerToConfig &&
                            <>
                                {
                                    markerToConfig.type === MarkerType.place && <PlaceMarkerConfig />
                                }
                                {
                                    markerToConfig.type === MarkerType.video && <VideoMarkerConfig />
                                }
                                {
                                    markerToConfig.type === MarkerType.image && <ImageMarkerConfig />
                                }
                                {
                                    markerToConfig.type === MarkerType.description && <DescriptionMarkerConfig />
                                }
                            </>
                        }
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ConfigMarkerModal;