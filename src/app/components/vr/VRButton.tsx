import React from 'react';
import {Videocam} from '@material-ui/icons'
import {useMenu} from "../../providers/MenuProvider";

const VrButton = () => {
    const {setVRSceneToView} = useMenu();

    return (
        <button className="ms-2 btn btn-warning btn-lg rounded-circle opacity-50 d-flex justify-content-center align-items-center" style={{width:"50px", height:"50px"}}>
            <Videocam onClick={()=>setVRSceneToView("http://renderstuff.com/tools/360-panorama-web-viewer-embed/?image=https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg")} />
        </button>
    );
};

export default VrButton;