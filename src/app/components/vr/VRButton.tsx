import React from 'react';
import {Videocam} from '@material-ui/icons'
import {useMenu} from "../../providers/MenuProvider";
import {Global} from "../../data/Global";

const VrButton = () => {
    // const {setVRSceneToView} = useMenu();

    const openLinkInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }

    return (
        <button className="ms-2 btn btn-warning btn-lg rounded-circle opacity-50 d-flex justify-content-center align-items-center" style={{width:"50px", height:"50px"}}
                onClick={()=>openLinkInNewTab(`https://competition.binus.ac.id/vr/vr.php?url=${Global.currentScene.path}`)}>
            <Videocam  />
        </button>
    );
};

export default VrButton;