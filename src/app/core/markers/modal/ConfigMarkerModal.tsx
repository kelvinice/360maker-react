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

export type ConfigMarkerProps = {
    targetSceneId: string;
}

const ConfigMarkerModal = () => {
    const [scenes, setScene] = useAtom(dataScenesAtom);
    const {register, handleSubmit, setValue, watch}= useForm<ConfigMarkerProps>();
    const {markerToConfig, setMarkerToConfig} = useMenu();

    const submit = (data: ConfigMarkerProps) => {
        const scene = scenes?.find((scene) => scene.id === Global.currentScene.id);
        const marker = scene?.markers.find((marker) => marker.id === markerToConfig?.id);

        console.log(data.targetSceneId);
        if (marker) {
            marker.targetSceneId = data.targetSceneId;
            const newSceneObject = [...scenes];
            setScene(newSceneObject);
            Global.currentScene = newSceneObject.find((scene) => scene.id === Global.currentScene.id) ?? Global.currentScene;
            toast.success("Marker Config saved");
            setMarkerToConfig(null);
        }else{
            toast.error("Marker Config failed");
        }
    }

    useEffect(() => {
        if (markerToConfig) {
            console.log(markerToConfig.targetSceneId);
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
                            <ConfigMarkerForm register={register} setValue={setValue} />
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