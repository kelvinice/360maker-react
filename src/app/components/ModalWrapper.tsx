import ViewSceneModal from "../core/scenes/view/ViewSceneModal";
import AddSceneModal from "../core/scenes/add/AddSceneModal";
import ConfigMarkerModal from "../core/markers/modal/ConfigMarkerModal";
import React from "react";
import SettingModal from "../core/settings/modal/SettingModal";
import { useMenu } from "../providers/MenuProvider";
import RenderStuffModal from "./vr/modal/RenderStuffModal";

const ModalWrapper = () => {
    const {markerToConfig, VRSceneToView} = useMenu();

    return (
        <>
            {VRSceneToView && <RenderStuffModal/>}
            <ViewSceneModal />
            <AddSceneModal />
            {markerToConfig && <ConfigMarkerModal />}
            <SettingModal />
        </>
    )
}

export default ModalWrapper;