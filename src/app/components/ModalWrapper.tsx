import ViewSceneModal from "../core/scenes/view/ViewSceneModal";
import AddSceneModal from "../core/scenes/add/AddSceneModal";
import ConfigMarkerModal from "../core/markers/modal/ConfigMarkerModal";
import React from "react";
import SettingModal from "../core/settings/modal/SettingModal";
import { useMenu } from "../providers/MenuProvider";

const ModalWrapper = () => {
    const {markerToConfig} = useMenu();

    return (
        <>
            <ViewSceneModal />
            <AddSceneModal />
            {markerToConfig && <ConfigMarkerModal />}
            <SettingModal />
        </>
    )
}

export default ModalWrapper;