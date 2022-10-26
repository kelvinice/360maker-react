import React from 'react';
import Draggable from "react-draggable";
import {PinDrop, Menu, Mouse, Close} from '@material-ui/icons'

const MarkerNavigation = () => {
    return (
        <Draggable >
            <div  className="bg-white rounded-3 shadow-2xl p-2" style={{zIndex:"99999", top: 10, left: 10, position: "absolute"}}>
                <div className="d-flex gap-2">
                    <button className="btn bg-transparent btn-sm">
                        <Menu />
                    </button>

                    <div className="border border-dark border-1 h-auto"/>

                    <button className="btn btn-info btn-sm">
                        <Mouse />
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <PinDrop />
                    </button>

                    <div className="border border-dark border-1 h-auto"/>

                    <button className="btn btn-danger btn-sm">
                        <Close />
                    </button>
                </div>

            </div>
        </Draggable>
    );
};

export default MarkerNavigation;