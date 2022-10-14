import React, {FC} from 'react';
import {UseFormRegister} from "react-hook-form";
import {ConfigMarkerProps} from "../modal/ConfigMarkerModal";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../atoms/DataAtom";

type ConfigMarkerFormProps = {
    register: UseFormRegister<ConfigMarkerProps>,
}

const ConfigMarkerForm: FC<ConfigMarkerFormProps> = ({register}) => {
    const [scenes] = useAtom(dataScenesAtom);

    return (
        <form>
            <div className="form-group">
                <label htmlFor="targetSceneId" className="fw-bold">Target Scene</label>
                <select className="form-control" id="targetSceneId" {...register("targetSceneId", {required: true})}>
                    {
                        scenes.map(scene => (
                            <option key={scene.id} value={scene.id}>{scene.name}</option>
                        ))
                    }
                </select>
            </div>
        </form>
    );
};

export default ConfigMarkerForm;