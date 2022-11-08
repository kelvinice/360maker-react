import ViewSceneModal from "../core/scenes/view/ViewSceneModal";
import AddSceneModal from "../core/scenes/add/AddSceneModal";
import ConfigMarkerModal from "../core/markers/modal/ConfigMarkerModal";
import React from "react";
import SettingModal from "../core/settings/modal/SettingModal";
import { useMenu } from "../providers/MenuProvider";
import RenderStuffModal from "./vr/modal/RenderStuffModal";
import DataImportModal from "./data/DataImportModal";
import ViewVideoModal from "./media/ViewVideoModal";
import ViewImageModal from "./media/ViewImageModal";
import ShortcutModal from "../core/shortcuts/modal/ShortcutModal";

const ModalWrapper = () => {
    const {markerToConfig, VRSceneToView} = useMenu();

    return (
        <>
            {VRSceneToView && <RenderStuffModal/>}
            <ViewSceneModal />
            <AddSceneModal />
            {markerToConfig && <ConfigMarkerModal />}
            <ShortcutModal />
            <SettingModal />
            <DataImportModal />
            <ViewVideoModal />
            <ViewImageModal />
        </>
    )
}

export default ModalWrapper;