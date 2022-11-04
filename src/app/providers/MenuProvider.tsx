import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {WithChildren} from "../types/WithChildren";
import {Marker} from "../models/DataModel";

type PageContextProps = {
    modalAddScene: boolean
    setModalAddScene: Dispatch<SetStateAction<boolean>>
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
}

const initialMenu:PageContextProps = {
    modalAddScene: false,
    setModalAddScene: () => {},
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
    setImageToView: () => {}
}

const MenuContext = createContext<PageContextProps>(initialMenu)

const MenuProvider: FC<WithChildren> = ({children}) => {
    const [modalAddScene, setModalAddScene] = useState<boolean>(initialMenu.modalAddScene)
    const [modalViewScene, setModalViewScene] = useState<boolean>(initialMenu.modalViewScene)
    const [modalSetting, setModalSetting] = useState<boolean>(initialMenu.modalSetting)
    const [markerToConfig, setMarkerToConfig] = useState<Marker|null>(initialMenu.markerToConfig)
    const [VRSceneToView, setVRSceneToView] = useState<string|null>(initialMenu.VRSceneToView)
    const [MarkerNavigationOpen, setMarkerNavigationOpen] = useState<boolean>(initialMenu.MarkerNavigationOpen)
    const [modalImport, setModalImport] = useState<boolean>(initialMenu.modalImport)
    const [videoToView, setVideoToView] = useState<string|null>(initialMenu.videoToView)
    const [imageToView, setImageToView] = useState<string|null>(initialMenu.imageToView)

    return (
        <MenuContext.Provider
            value={{
                modalAddScene, setModalAddScene,
                modalViewScene, setModalViewScene,
                markerToConfig, setMarkerToConfig,
                modalSetting, setModalSetting,
                VRSceneToView, setVRSceneToView,
                MarkerNavigationOpen, setMarkerNavigationOpen,
                modalImport, setModalImport,
                videoToView, setVideoToView,
                imageToView, setImageToView
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}

const useMenu = () => useContext(MenuContext)

export {MenuProvider, useMenu}
