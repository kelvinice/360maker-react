import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {WithChildren} from "../types/WithChildren";
import {Viewer} from "photo-sphere-viewer";

type PageContextProps = {
    viewer?: Viewer;
    setViewer: Dispatch<SetStateAction<Viewer | undefined>>;
    modalAddScene: boolean
    setModalAddScene: Dispatch<SetStateAction<boolean>>
    modalViewScene: boolean
    setModalViewScene: Dispatch<SetStateAction<boolean>>
}

const initialMenu:PageContextProps = {
    setViewer: () => {},
    modalAddScene: false,
    setModalAddScene: () => {},
    modalViewScene: false,
    setModalViewScene: () => {}
}

const MenuContext = createContext<PageContextProps>(initialMenu)

const MenuProvider: FC<WithChildren> = ({children}) => {
    const [modalAddScene, setModalAddScene] = useState<boolean>(initialMenu.modalAddScene)
    const [modalViewScene, setModalViewScene] = useState<boolean>(initialMenu.modalViewScene)
    const [viewer, setViewer] = useState<Viewer | undefined>(initialMenu.viewer)

    return (
        <MenuContext.Provider
            value={{
                viewer,
                setViewer,
                modalAddScene,
                setModalAddScene,
                modalViewScene,
                setModalViewScene
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}

const useMenu = () => useContext(MenuContext)

export {MenuProvider, useMenu}
