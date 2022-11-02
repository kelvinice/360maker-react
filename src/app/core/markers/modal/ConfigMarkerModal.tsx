import React, {useEffect} from 'react';
import {
    MDBBtn, MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../atoms/DataAtom";
import {useForm} from "react-hook-form";
import ConfigMarkerForm from "../form/ConfigMarkerForm";
import {Global} from "../../../data/Global";
import toast from "react-hot-toast";
import PlaceMarkerConfig from "../place-marker/PlaceMarkerConfig";
import {MarkerType} from "../../../constants/MarkerType";

export type ConfigMarkerProps = {
    targetSceneId: string;
}

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
                            </>
                        }
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ConfigMarkerModal;