import React, {FC} from 'react';
import {ConfigMarkerModalChildProps} from "../../parent/MarkerConfigParent";

const GeneralMarkerSettingForm: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Tooltip</label>
                <input type="text" className="form-control" id="tooltip" {...props.register("tooltip")} />
            </div>
        </form>
    );
};

export default GeneralMarkerSettingForm;