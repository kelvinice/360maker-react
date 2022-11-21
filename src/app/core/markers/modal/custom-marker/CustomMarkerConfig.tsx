import React, {FC, useEffect} from 'react';
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";
import {MarkerData} from "../../../../models/DataModel";
import {CustomMarkerDataObject} from "./Models";

const CustomMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    const [markerData, setMarkerData] = React.useState<MarkerData[]>();
    const initialMarkerData = props.watch("data");
    const options = CustomMarkerDataObject();

    useEffect(() => {
        if (initialMarkerData) {
            setMarkerData(initialMarkerData);
        }else{
            setMarkerData([]);
        }
    }, [initialMarkerData]);



    const renderMarkerData = (data: MarkerData) => {

        return <>
            <div className="form-group">
                <label htmlFor="markerData">Marker Data</label>
                <select className="form-control" id="markerData" name="markerData">
                    {options.map((option, index) => {
                        return <option key={index} value={option.code}>{option.name}</option>
                    })}
                </select>
            </div>
        </>
    }

    const addMarkerData = () => {

        setMarkerData([...markerData || [], {type: ""} as MarkerData]);
    }

    if(!markerData){
        return <></>;
    }

    return (
        <>
            {
                markerData.map((data, index) => {
                    return (
                        <div key={index}>
                            {renderMarkerData(data)}
                        </div>
                    )
                })
            }
            <button className="btn btn-primary" onClick={()=>addMarkerData()}>Add Data</button>
        </>
    );
}

export default CustomMarkerConfig;