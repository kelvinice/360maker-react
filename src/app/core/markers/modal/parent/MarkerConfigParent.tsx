import React, {useEffect} from 'react';
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../../atoms/DataAtom";
import {useForm, UseFormHandleSubmit, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {Marker} from "../../../../models/DataModel";
import {useMenu} from "../../../../providers/MenuProvider";
import {Global} from "../../../../data/Global";
import {updateMarkerOnCurrentScene} from "../../../../utility/PSVUtility";
import toast from "react-hot-toast";
import {MarkerType} from "../../../../constants/MarkerType";
import PlaceMarkerConfig from "../place-marker/PlaceMarkerConfig";
import VideoMarkerConfig from "../video-marker/VideoMarkerConfig";
import ImageMarkerConfig from "../image-marker/ImageMarkerConfig";
import DescriptionMarkerConfig from "../description-marker/DescriptionMarkerConfig";
import {MarkersPlugin} from "photo-sphere-viewer/dist/plugins/markers";

export interface ConfigMarkerModalProps {
    register:  UseFormRegister<Marker>,
    handleSubmit: UseFormHandleSubmit<Marker>,
    setValue: UseFormSetValue<Marker>,
    submit: any,
}

export interface ConfigMarkerModalChildProps {
    props: ConfigMarkerModalProps
}

const MarkerConfigParent = () => {
    const [scenes, setScene] = useAtom(dataScenesAtom);
    const {register, handleSubmit, setValue, reset}= useForm<Marker>();
    const {markerToConfig, setMarkerToConfig} = useMenu();

    useEffect(() => {
        if (markerToConfig) {
            reset(markerToConfig);
        }
    }, [markerToConfig]);

    const submit = (data: Marker) => {
        if(!scenes)
            return;
        const scene = scenes?.find((scene) => scene.id === Global.currentScene.id);
        const marker = scene?.markers.find((marker) => marker.id === markerToConfig?.id);

        if (marker) {
            updateMarkerOnCurrentScene(data, scenes, setScene);
            const markersPlugin = Global.viewer.getPlugin(MarkersPlugin);
            if(markersPlugin && data.id) {
                const contextMarker = markersPlugin.getMarker(data.id);
                if(contextMarker) {
                    const properties = {
                        ...contextMarker.config,
                        tooltip: data.tooltip,
                    }
                    markersPlugin.updateMarker(properties);
                }
            }
            toast.success("Marker Config saved");
            setMarkerToConfig(null);
        }else{
            toast.error("Marker Config failed");
        }
    }

    const props = {register, submit, handleSubmit, setValue};

    const renderMarkerConfig = () => {
        switch (markerToConfig?.type) {
            case MarkerType.PLACE:
                return <PlaceMarkerConfig props={props} />
            case MarkerType.VIDEO:
                return <VideoMarkerConfig props={props} />
            case MarkerType.IMAGE:
                return <ImageMarkerConfig props={props} />
            case MarkerType.DESCRIPTION:
                return <DescriptionMarkerConfig props={props} />
            default:
                return <></>
        }
    }

    return (
        <>
            {renderMarkerConfig()}
        </>
    );
};

export default MarkerConfigParent;