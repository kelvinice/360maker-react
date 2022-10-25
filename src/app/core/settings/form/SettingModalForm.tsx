import React, {FC, useEffect} from 'react';
import {UseFormRegister, UseFormSetValue} from "react-hook-form";
import {useAtom} from "jotai";
import {dataScenesAtom, settingsAtom} from "../../../atoms/DataAtom";
import {SettingModel} from "../../../models/DataModel";

type SettingModalProps = {
    register: UseFormRegister<SettingModel>,
    setValue: UseFormSetValue<SettingModel>
}

const SettingModalForm:FC<SettingModalProps> = ({register, setValue}) => {
    const [scenes,] = useAtom(dataScenesAtom);
    const [setting,] = useAtom(settingsAtom);

    useEffect(() => {
        setValue("initialScene", setting.initialScene);
    }, [setValue, setting]);

    if(scenes.length === 0) return <></>;

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="initialScene" className="fw-bold">Initial Scene</label>
                    <select className="form-control" id="initialScene" {...register("initialScene", {required: true})}>
                        {
                            scenes.map(scene => (
                                <option key={scene.id} value={scene.id}>{scene.name}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </>
    );
};

export default SettingModalForm;