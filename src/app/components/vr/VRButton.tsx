import React from 'react';
import {Videocam} from '@material-ui/icons'
import {useMenu} from "../../providers/MenuProvider";
import {Global} from "../../data/Global";

const VrButton = () => {
    const {setVRSceneToView} = useMenu();

    return (
        <button className="ms-2 btn btn-warning btn-lg rounded-circle opacity-50 d-flex justify-content-center align-items-center" style={{width:"50px", height:"50px"}}
                onClick={()=>setVRSceneToView(Global.currentScene.path)}>
            <Videocam  />
        </button>
    );
};

export default VrButton;