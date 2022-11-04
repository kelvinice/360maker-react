import React, {FC} from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import {ConfigMarkerProps} from "../DescriptionMarkerConfig";

type ConfigMarkerFormProps = {
    register: UseFormRegister<ConfigMarkerProps>,
    setValue: UseFormSetValue<ConfigMarkerProps>,
}

const DescriptionConfigMarkerForm: FC<ConfigMarkerFormProps> = ({register, setValue}) => {

    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Description</label>
                <textarea className="form-control" id="description" {...register("description")} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Tooltip</label>
                <input type="text" className="form-control" id="tooltip" {...register("tooltip")} />
            </div>
        </form>
    );
};

export default DescriptionConfigMarkerForm;