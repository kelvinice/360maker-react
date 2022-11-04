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
import VRButton from "./components/vr/VRButton";
import {WithChildren} from "./types/WithChildren";
import FileManagement from "./core/files/FileManagement";
import {useAtom} from "jotai";
import {dataScenesAtom, isDevAtom, settingsAtom} from "./atoms/DataAtom";
import {initialDataScene, initialDataSetting} from "./data/InitialData";
import {tryParseJSON} from "./utility/Utility";

const App = () => {
    const {MarkerNavigationOpen} = useMenu();
    const [isDev] = useAtom(isDevAtom);

    return (
        <div className="App">
            <PhotoSphereViewer />
            {!isDev &&
                <div className="ui-menu top-0 end-0 m-2">
                    <FloatingButton />
                </div>
            }

            <div className="ui-menu start-0 top-50">
                <VRButton />
            </div>
            {MarkerNavigationOpen && !isDev && <MarkerNavigation />}
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
    const [, setIsDev] = useAtom(isDevAtom);
    let firstLoad = true;

    const init = async () => {
        const is_dev:boolean = process.env.REACT_APP_IS_DEV === "true";
        const dataPath = process.env.REACT_APP_DATA_URL;
        setIsDev(is_dev);
        if(is_dev && scene && setting){
            return;
        }

        if(!dataPath){
            setScene(initialDataScene);
            setSetting(initialDataSetting);
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
