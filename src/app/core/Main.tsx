import React, {createRef, useEffect} from 'react';
import {Viewer} from "photo-sphere-viewer";


const Main = () => {
    const ref = createRef<HTMLDivElement>();

    useEffect(()=>{
        if(!ref || !ref.current)
            return;
        new Viewer({
            panorama: "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg",
            container: ref.current,
        });
    }, [ref]);

    return (
        <div id="viewer" ref={ref} />
    )
};

export default Main;
