import React, {useState} from 'react'
import {ChildButton, FloatingMenu, MainButton} from "react-floating-button-menu";
import {Close, Add, Save, CloudUpload, AddAPhoto, PinDrop, Settings, Videocam} from "@material-ui/icons";
import {useMenu} from "../../../providers/MenuProvider";

export const FloatingButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {setModalViewScene, setModalSetting, setVRSceneToView, setMarkerNavigationOpen} = useMenu();

    const mainSize = 56;
    const childSize = 40;
    const buttonBackgroundColor = "#1266f1";


    return (
    <FloatingMenu
    slideSpeed={500}
    spacing={8}
    isOpen={isOpen}
    // @ts-ignore
    direction={"down"}
    className={"text-white"}
  >
    <MainButton
        iconResting={<Add htmlColor={"white"} />}
        iconActive={<Close htmlColor={"white"} />}
        onClick={() => setIsOpen(!isOpen)}
        size={mainSize}
        background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<AddAPhoto />}
            size={childSize}
            onClick={() => setModalViewScene(true)}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<PinDrop />}
            size={childSize}
            onClick={() => setMarkerNavigationOpen(true)}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<Settings />}
            size={childSize}
            onClick={() => setModalSetting(true)}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<CloudUpload />}
            size={childSize}
            onClick={() => console.log('clicked')}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<Save />}
            size={childSize}
            onClick={() => console.log('clicked')}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<Videocam />}
            size={childSize}
            onClick={() => {
                setVRSceneToView("http://renderstuff.com/tools/360-panorama-web-viewer-embed/?image=https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg");
            }}
            background={buttonBackgroundColor}
        />
    </FloatingMenu>
  )
}
