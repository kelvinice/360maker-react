import React, {FC} from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import {ConfigMarkerProps} from "../modal/ConfigMarkerModal";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../atoms/DataAtom";
import {useEffect} from 'react';
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
            <div className="form-group">
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
        </form>
    );
};

export default ConfigMarkerForm;