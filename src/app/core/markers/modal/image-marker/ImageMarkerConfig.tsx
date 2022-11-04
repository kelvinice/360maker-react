import React, {useEffect} from 'react';
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import {useMenu} from "../../../../providers/MenuProvider";
import {useForm} from "react-hook-form";
import {Global} from "../../../../data/Global";
import toast from "react-hot-toast";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../../atoms/DataAtom";
import ImageConfigMarkerForm from "./form/ImageConfigMarkerForm";

export type ConfigMarkerProps = {
    mediaPath: string;
    tooltip: string;
}

const ImageMarkerConfig = () => {
    const [scenes, setScene] = useAtom(dataScenesAtom);
    const {register, handleSubmit, setValue}= useForm<ConfigMarkerProps>();
    const {markerToConfig, setMarkerToConfig} = useMenu();

    useEffect(() => {
        if (markerToConfig) {
            setValue("mediaPath", markerToConfig.mediaPath as string);
            setValue("tooltip", markerToConfig.tooltip as string);
        }
    }, [markerToConfig]);

    const submit = (data: ConfigMarkerProps) => {
        if(!scenes)
            return;
        const scene = scenes?.find((scene) => scene.id === Global.currentScene.id);
        const marker = scene?.markers.find((marker) => marker.id === markerToConfig?.id);

        if (marker) {
            marker.mediaPath = data.mediaPath;
            marker.tooltip = data.tooltip;
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
                <ImageConfigMarkerForm register={register} setValue={setValue} />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='primary' onClick={handleSubmit(submit)}>Save Config</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default ImageMarkerConfig;