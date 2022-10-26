import React, {ReactNode} from 'react';
import Draggable from "react-draggable";
import {Chat, Close, Image, Mouse, OpenWith, PinDrop, Settings, Videocam, Delete} from '@material-ui/icons'
import {useMenu} from "../../providers/MenuProvider";
import {useAtom} from "jotai";
import {mouseStateAtom} from "../../atoms/DataAtom";
import clsx from "clsx";
import {MouseState} from "../../constants/MouseState";

const MouseStateButton = (props: { targetMouseState: MouseState, color : string, children: ReactNode }) => {
    const [mouseState, setMouseState] = useAtom(mouseStateAtom);
    return <button className={clsx({
            "active": props.targetMouseState === mouseState,
        }, `btn btn-sm btn-${props.color}`)} onClick={()=>setMouseState(props.targetMouseState)}>
        {props.children}
    </button>;
}

const MarkerNavigation = () => {
    const {setMarkerNavigationOpen} = useMenu();
    const nodeRef = React.useRef(null);

    return (
        <Draggable handle=".btn-drag" nodeRef={nodeRef}>
            <div className="bg-white rounded-3 shadow-2xl p-2" ref={nodeRef}
                 style={{zIndex: "99999", top: 10, left: 10, position: "absolute"}}>
                <div className="d-flex gap-2">
                    <button className="btn bg-light btn-sm btn-drag">
                        <OpenWith/>
                    </button>

                    <div className="border border-dark border-1 h-auto"/>

                    <MouseStateButton color="info" targetMouseState={MouseState.Cursor} children={<Mouse/>}/>
                    <MouseStateButton color="info" targetMouseState={MouseState.Setting} children={<Settings/>}/>
                    <MouseStateButton color="info" targetMouseState={MouseState.Delete} children={<Delete/>}/>
                    <MouseStateButton color="primary" targetMouseState={MouseState.MarkerPlace} children={<PinDrop/>}/>
                    <MouseStateButton color="primary" targetMouseState={MouseState.MarkerImage} children={<Image />}/>
                    <MouseStateButton color="primary" targetMouseState={MouseState.MarkerVideo} children={<Videocam />}/>
                    <MouseStateButton color="primary" targetMouseState={MouseState.MarkerDescription} children={<Chat />}/>

                    <div className="border border-dark border-1 h-auto"/>

                    <button className="btn btn-danger btn-sm" onClick={() => setMarkerNavigationOpen(false)}>
                        <Close/>
                    </button>
                </div>

            </div>
        </Draggable>
    );
};

export default MarkerNavigation;