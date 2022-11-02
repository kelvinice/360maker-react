import React, {useEffect} from 'react';
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import ConfigMarkerForm from "../form/ConfigMarkerForm";
import {useMenu} from "../../../providers/MenuProvider";
import {useForm} from "react-hook-form";
import {ConfigMarkerProps} from "../modal/ConfigMarkerModal";
import {Global} from "../../../data/Global";
import toast from "react-hot-toast";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../atoms/DataAtom";

const PlaceMarkerConfig = () => {
    const [scenes, setScene] = useAtom(dataScenesAtom);
    const {register, handleSubmit, setValue, watch}= useForm<ConfigMarkerProps>();
    const {markerToConfig, setMarkerToConfig} = useMenu();

    useEffect(() => {
        if (markerToConfig) {
            setValue("targetSceneId", markerToConfig.targetSceneId as string);
        }
    }, [markerToConfig]);

    const submit = (data: ConfigMarkerProps) => {
        const scene = scenes?.find((scene) => scene.id === Global.currentScene.id);
        const marker = scene?.markers.find((marker) => marker.id === markerToConfig?.id);

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

    return (
        <>
            <MDBModalBody>
                <ConfigMarkerForm register={register} setValue={setValue} />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='primary' onClick={handleSubmit(submit)}>Save Config</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default PlaceMarkerConfig;