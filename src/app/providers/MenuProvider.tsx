import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {WithChildren} from "../types/WithChildren";
import {Marker} from "../models/DataModel";

type PageContextProps = {
    sceneToManage: string|null,
    setSceneToManage: Dispatch<SetStateAction<string|null>>
    shortcutToManage: string|null,
    setShortcutToManage: Dispatch<SetStateAction<string|null>>
    modalViewScene: boolean
    setModalViewScene: Dispatch<SetStateAction<boolean>>
    markerToConfig: Marker|null;
    setMarkerToConfig: Dispatch<SetStateAction<Marker|null>>
    modalSetting: boolean
    setModalSetting: Dispatch<SetStateAction<boolean>>
    VRSceneToView: string|null
    setVRSceneToView: Dispatch<SetStateAction<string|null>>
    MarkerNavigationOpen: boolean
    setMarkerNavigationOpen: Dispatch<SetStateAction<boolean>>
    modalImport: boolean
    setModalImport: Dispatch<SetStateAction<boolean>>
    videoToView: string|null
    setVideoToView: Dispatch<SetStateAction<string|null>>
    imageToView: string|null
    setImageToView: Dispatch<SetStateAction<string|null>>
    modalShortcut: boolean
    setModalShortcut: Dispatch<SetStateAction<boolean>>
}

const initialMenu:PageContextProps = {
    sceneToManage: null,
    setSceneToManage: () => {},
    shortcutToManage: null,
    setShortcutToManage: () => {},
    modalViewScene: false,
    setModalViewScene: () => {},
    markerToConfig: null,
    setMarkerToConfig: () => {},
    modalSetting: false,
    setModalSetting: () => {},
    VRSceneToView: null,
    setVRSceneToView: () => {},
    MarkerNavigationOpen: true,
    setMarkerNavigationOpen: () => {},
    modalImport: false,
    setModalImport: () => {},
    videoToView: null,
    setVideoToView: () => {},
    imageToView: null,
    setImageToView: () => {},
    modalShortcut: false,
    setModalShortcut: () => {},
}

const MenuContext = createContext<PageContextProps>(initialMenu)

const MenuProvider: FC<WithChildren> = ({children}) => {
    const [sceneToManage, setSceneToManage] = useState<string|null>(null)
    const [shortcutToManage, setShortcutToManage] = useState<string|null>(null);
    const [modalViewScene, setModalViewScene] = useState<boolean>(initialMenu.modalViewScene)
    const [modalSetting, setModalSetting] = useState<boolean>(initialMenu.modalSetting)
    const [markerToConfig, setMarkerToConfig] = useState<Marker|null>(initialMenu.markerToConfig)
    const [VRSceneToView, setVRSceneToView] = useState<string|null>(initialMenu.VRSceneToView)
    const [MarkerNavigationOpen, setMarkerNavigationOpen] = useState<boolean>(initialMenu.MarkerNavigationOpen)
    const [modalImport, setModalImport] = useState<boolean>(initialMenu.modalImport)
    const [videoToView, setVideoToView] = useState<string|null>(initialMenu.videoToView)
    const [imageToView, setImageToView] = useState<string|null>(initialMenu.imageToView)
    const [modalShortcut, setModalShortcut] = useState<boolean>(initialMenu.modalShortcut)

    return (
        <MenuContext.Provider
            value={{
                sceneToManage, setSceneToManage,
                shortcutToManage, setShortcutToManage,
                modalViewScene, setModalViewScene,
                markerToConfig, setMarkerToConfig,
                modalSetting, setModalSetting,
                VRSceneToView, setVRSceneToView,
                MarkerNavigationOpen, setMarkerNavigationOpen,
                modalImport, setModalImport,
                videoToView, setVideoToView,
                imageToView, setImageToView,
                modalShortcut, setModalShortcut
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}

const useMenu = () => useContext(MenuContext)

export {MenuProvider, useMenu}
