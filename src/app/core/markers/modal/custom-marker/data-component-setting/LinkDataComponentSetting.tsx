import React, {FC, useEffect} from 'react';
import {CustomMarkerConfigProps} from "../CustomMarkerConfig";
import {MarkerDataLink} from "../../../../../models/DataModel";

const LinkDataComponentSetting: FC<CustomMarkerConfigProps> = ({props}) => {
    const data = props.markerData as MarkerDataLink;

    const changeURL = (value: string) => {
        props.changeMarkerDataOnIndex(props.index, {...data, url: value} as MarkerDataLink);
    }
    
    useEffect(() => {
        if (data.url === undefined || data.url=== null) {
            changeURL("");
        }
    },  [data]);

    if(data.url === undefined){
        return null;
    }

    return (
        <div className={"form-group"}>
            <div className={"input-group"}>
                <input type={"text"} className={"form-control"} placeholder={"URL"} value={data.url}
                   onChange={(e)=>changeURL(e.target.value)}
                />
            </div>
        </div>
    );
};

export default LinkDataComponentSetting;