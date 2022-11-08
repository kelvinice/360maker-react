import React, {FC} from 'react';
import {ConfigMarkerModalChildProps} from "../../parent/MarkerConfigParent";

const DescriptionConfigMarkerForm: FC<ConfigMarkerModalChildProps> = ({props}) => {

    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Description</label>
                <textarea className="form-control" id="description" {...props.register("description")} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Tooltip</label>
                <input type="text" className="form-control" id="tooltip" {...props.register("tooltip")} />
            </div>
        </form>
    );
};

export default DescriptionConfigMarkerForm;