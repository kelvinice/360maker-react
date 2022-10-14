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
}

const MenuContext = createContext<PageContextProps>(initialMenu)

const MenuProvider: FC<WithChildren> = ({children}) => {
    const [modalAddScene, setModalAddScene] = useState<boolean>(initialMenu.modalAddScene)
    const [modalViewScene, setModalViewScene] = useState<boolean>(initialMenu.modalViewScene)
    const [modalSetting, setModalSetting] = useState<boolean>(initialMenu.modalSetting)
    const [markerToConfig, setMarkerToConfig] = useState<Marker|null>(initialMenu.markerToConfig)

    return (
        <MenuContext.Provider
            value={{
                modalAddScene,
                setModalAddScene,
                modalViewScene,
                setModalViewScene,
                markerToConfig,
                setMarkerToConfig,
                modalSetting,
                setModalSetting,
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}

const useMenu = () => useContext(MenuContext)

export {MenuProvider, useMenu}
