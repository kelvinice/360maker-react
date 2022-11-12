import './styles/App.css';
import './styles/photo-sphere-viewer.min.css';
import './styles/markers.min.css';

import React, {FC, useEffect, useState} from 'react';
import PhotoSphereViewer from "./core/PhotoSphereViewer";
import {FloatingButton} from "./components/side-menu/floating-button/FloatingButton";
import {MenuProvider, useMenu} from "./providers/MenuProvider";
import {Toaster} from "react-hot-toast";
import ModalWrapper from "./components/ModalWrapper";
import MarkerNavigation from "./components/marker-navigation/MarkerNavigation";
import VRButton from "./components/ui/VRButton";
import {WithChildren} from "./types/WithChildren";
import FileManagement from "./core/files/FileManagement";
import {useAtom} from "jotai";
import {dataScenesAtom, isEditorAtom, settingsAtom, shortcutsAtom} from "./atoms/DataAtom";
import {initialDataScene, initialDataSetting, initialDataShortcut} from "./data/InitialData";
import {getURLParameter, tryParseJSON} from "./utility/Utility";
import ShortcutWrapper from "./components/shortcut/ShortcutWrapper";
import BackButton from "./components/ui/BackButton";

const App = () => {
    const {MarkerNavigationOpen} = useMenu();
    const [isEditor] = useAtom(isEditorAtom);

    return (
        <div className="App">
            <PhotoSphereViewer />
            {isEditor &&
                <div className="ui-menu top-0 end-0">
                    <FloatingButton />
                </div>
            }

            <div className="ui-menu start-0 top-50">
                <BackButton />
            </div>
            <div className="ui-menu end-0 top-50">
                <VRButton />
            </div>
            <div className="ui-menu start-0 bottom-0 d-flex mb-5 w-100 " >
                <ShortcutWrapper />
            </div>

            {MarkerNavigationOpen && isEditor && <MarkerNavigation />}
            <ModalWrapper />
        </div>
    );
}

const AppWrapper = () => {
    return (
        <DataInit>
            <MenuProvider>
                <App />
                <Toaster />
            </MenuProvider>
        </DataInit>
    );
}


const DataInit:FC<WithChildren> = ({children}) => {
    const [ready, setReady] = useState(false);
    const [scene, setScene] = useAtom(dataScenesAtom);
    const [setting, setSetting] = useAtom(settingsAtom);
    const [, setShortcuts] = useAtom(shortcutsAtom);
    const [, setIsEditorMode] = useAtom(isEditorAtom);
    let firstLoad = true;

    const init = async () => {
        const edit = getURLParameter("edit");
        const is_dev:boolean = process.env.REACT_APP_IS_DEV === "true" || edit === "1";
        const dataPath = process.env.REACT_APP_DATA_URL;
        setIsEditorMode(is_dev);
        if(is_dev && scene && setting){
            return;
        }

        if(!dataPath){
            setScene(initialDataScene);
            setSetting(initialDataSetting);
            setShortcuts(initialDataShortcut);
            return;
        }
        try {
            const res = await FileManagement.readFile(dataPath);
            const file = await res.text();
            if(res.status === 200){
                const data = tryParseJSON(file);
                if(!data){
                    throw new Error("Invalid JSON");
                }
                setScene(data.scenes);
                setSetting(data.setting);
                data.shortcuts ? setShortcuts(data.shortcuts) : setShortcuts(initialDataShortcut);
            }
        }catch (e) {
            console.error(e);
            setReady(true);
        }
    }

    useEffect(() => {
        if(!scene || !setting)
            return;
        setReady(true);
    }, [scene, setting]);

    useEffect(() => {
        if (firstLoad && !ready) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            firstLoad = false;
            init().then();
        }
    }, []);

    return (
        <>
            {ready && children}
        </>
    )
}


export default AppWrapper;
