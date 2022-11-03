import React, {FC} from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import {ConfigMarkerProps} from "../VideoMarkerConfig";

type ConfigMarkerFormProps = {
    register: UseFormRegister<ConfigMarkerProps>,
    setValue: UseFormSetValue<ConfigMarkerProps>,
}

const VideoConfigMarkerForm: FC<ConfigMarkerFormProps> = ({register, setValue}) => {

    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Media Path</label>
                <input type="text" className="form-control" id="mediaPath" {...register("mediaPath")} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Tooltip</label>
                <input type="text" className="form-control" id="tooltip" {...register("tooltip")} />
            </div>
        </form>
    );
};

export default VideoConfigMarkerForm;