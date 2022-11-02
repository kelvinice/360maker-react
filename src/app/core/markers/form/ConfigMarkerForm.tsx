import React, {FC} from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import {ConfigMarkerProps} from "../modal/ConfigMarkerModal";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../atoms/DataAtom";
import { useMenu } from '../../../providers/MenuProvider';
import Select from 'react-select';

type ConfigMarkerFormProps = {
    register: UseFormRegister<ConfigMarkerProps>,
    setValue: UseFormSetValue<ConfigMarkerProps>,
}

const ConfigMarkerForm: FC<ConfigMarkerFormProps> = ({register, setValue}) => {
    const [scenes] = useAtom(dataScenesAtom);
    const {markerToConfig} = useMenu();

    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Target Scene</label>
                <Select className="form-control" id="targetSceneId"
                    options={scenes?.map((scene) => ({value: scene.id, label: scene.name}))}
                    defaultValue={{
                        value: markerToConfig?.targetSceneId, 
                        label: scenes?.find((scene) => scene.id === markerToConfig?.targetSceneId)?.name
                    }}
                    onChange={(e) => {
                        setValue("targetSceneId", e?.value as string);
                    }}
                    />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Tooltip</label>
                <input type="text" className="form-control" id="tooltip" {...register("tooltip")} />
            </div>
        </form>
    );
};

export default ConfigMarkerForm;