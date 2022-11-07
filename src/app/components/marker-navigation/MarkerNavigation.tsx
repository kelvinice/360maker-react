import React, {ReactNode, useCallback} from 'react';
import Draggable from "react-draggable";
import {Chat, Close, Image, Mouse, OpenWith, Settings, Videocam, Delete, PinDropSharp, LocationSearching} from '@material-ui/icons'
import {useMenu} from "../../providers/MenuProvider";
import {useAtom} from "jotai";
import {mouseStateAtom} from "../../atoms/DataAtom";
import clsx from "clsx";
import {MouseState} from "../../constants/MouseState";
import {MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBDropdown} from "mdb-react-ui-kit";
import {useAtomCallback} from "jotai/utils";


const MouseStateButton = (props: { targetMouseState: MouseState, color : string, children: ReactNode, text?: string, className?: string }) => {
    const [mouseState, setMouseState] = useAtom(mouseStateAtom);
    return (
        <div className={clsx({
            "active": props.targetMouseState === mouseState,
        }, `btn btn-sm btn-${props.color} d-flex align-item-center ${props.className || ""}`)} onClick={()=>setMouseState(props.targetMouseState)}>
            <div className="d-flex align-items-center ">
                {props.children}
                {props.text && <span className="ms-2 fw-bold">{props.text}</span>}
            </div>

        </div>
    )

}

const MarkerNavigation = () => {
    const {setMarkerNavigationOpen} = useMenu();
    const nodeRef = React.useRef(null);
    const [mouseState, setMouseState] = useAtom(mouseStateAtom);

    const markers = [
        {
            icon: <LocationSearching />,
            text: "Place Marker",
            targetMouseState: MouseState.MarkerPlace,
        },
        {
            icon: <Image />,
            text: "Image Marker",
            targetMouseState: MouseState.MarkerImage,
        },
        {
            icon: <Videocam />,
            text: "Video Marker",
            targetMouseState: MouseState.MarkerVideo,
        },
        {
            icon: <Chat />,
            text: "Text Marker",
            targetMouseState: MouseState.MarkerDescription,
        }
    ]

    const getMouseState = useAtomCallback(useCallback((get) => {
        return get(mouseStateAtom);
    }, []));

    const currentMarker = markers.find(marker => marker.targetMouseState === getMouseState());

    return (
        <Draggable handle=".btn-drag" nodeRef={nodeRef}>
            <div className="bg-white rounded-3 shadow-2xl p-2" ref={nodeRef}
                 style={{zIndex: "99999", top: 0, left: 0, position: "absolute"}}>
                <div className="d-flex gap-2">
                    <button className="btn bg-light btn-sm btn-drag">
                        <OpenWith/>
                    </button>

                    <div className="border border-dark border-1 h-auto"/>

                    <MouseStateButton color="info" targetMouseState={MouseState.Cursor} children={<Mouse/>}/>
                    <MouseStateButton color="info" targetMouseState={MouseState.Setting} children={<Settings/>}/>
                    <MouseStateButton color="info" targetMouseState={MouseState.Delete} children={<Delete/>}/>

                    <MDBDropdown group>
                        <MDBDropdownToggle className={clsx({
                            "active": markers.find(marker => marker.targetMouseState === getMouseState()) !== undefined,
                        }, "btn btn-sm")}>
                            {
                                !currentMarker ? <PinDropSharp /> : currentMarker.icon
                            }
                        </MDBDropdownToggle>
                        <MDBDropdownMenu style={{minWidth:0}} >
                            {
                                markers.map((marker, index) => (
                                    <MDBDropdownItem link key={index} className="flat-a">
                                        <MouseStateButton text={marker.text} color="primary" targetMouseState={marker.targetMouseState} children={marker.icon}
                                            className="m-2"
                                        />
                                    </MDBDropdownItem>
                                ))
                            }

                            {/*<MDBDropdownItem link>*/}
                            {/*    <MouseStateButton color="primary" targetMouseState={MouseState.MarkerImage} children={<Image />}/>*/}
                            {/*</MDBDropdownItem>*/}
                            {/*<MDBDropdownItem link>*/}
                            {/*    <MouseStateButton color="primary" targetMouseState={MouseState.MarkerVideo} children={<Videocam />}/>*/}
                            {/*</MDBDropdownItem>*/}
                            {/*<MDBDropdownItem link>*/}
                            {/*    <MouseStateButton color="primary" targetMouseState={MouseState.MarkerDescription} children={<Chat />}/>*/}
                            {/*</MDBDropdownItem>*/}
                        </MDBDropdownMenu>
                    </MDBDropdown>


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