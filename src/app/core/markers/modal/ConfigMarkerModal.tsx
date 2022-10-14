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
import {Marker} from "../../../models/DataModel";
import {Global} from "../../../data/Global";
import toast from "react-hot-toast";

export type ConfigMarkerProps = {
    targetSceneId: string;
}

const ConfigMarkerModal = () => {
    const [scenes, setScene] = useAtom(dataScenesAtom);
    // const {setModalConfigMarker, modalConfigMarker} = useMenu();
    const {register, handleSubmit, setValue}= useForm<ConfigMarkerProps>();
    const {markerToConfig, setMarkerToConfig} = useMenu();

    const submit = (data: ConfigMarkerProps) => {
        const temp = [...scenes];
        const marker = Global.currentScene.markers.find((marker) => marker.id === markerToConfig?.id);
        console.log(Global.currentScene);
        console.log(markerToConfig);

        if (marker) {
            marker.targetSceneId = data.targetSceneId;
            setScene(temp);
            toast.success("Marker Config saved");
        }else{
            toast.error("Marker Config failed");
        }
    }

    useEffect(() => {
        if (markerToConfig) {
            console.log(markerToConfig);
            setValue("targetSceneId", markerToConfig.targetSceneId as string);
        }
    }, [markerToConfig]);

    return (
        <>
            <MDBModal staticBackdrop show={markerToConfig !== null} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Marker</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setMarkerToConfig(null)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <ConfigMarkerForm register={register} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='primary' onClick={handleSubmit(submit)}>Save Config</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ConfigMarkerModal;