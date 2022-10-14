import ViewSceneModal from "../core/scenes/view/ViewSceneModal";
import AddSceneModal from "../core/scenes/add/AddSceneModal";
import ConfigMarkerModal from "../core/markers/modal/ConfigMarkerModal";
import React from "react";
import SettingModal from "../core/settings/modal/SettingModal";

const ModalWrapper = () => {
    return (
        <>
            <ViewSceneModal />
            <AddSceneModal />
            <ConfigMarkerModal />
            <SettingModal />
        </>
    )
}

export default ModalWrapper;