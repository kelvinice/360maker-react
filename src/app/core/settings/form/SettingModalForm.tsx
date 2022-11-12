import React, {FC, useEffect} from 'react';
import {
    FormState,
    UseFormGetValues,
    UseFormRegister,
    UseFormReset,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import {useAtom} from "jotai";
import {dataScenesAtom, settingsAtom} from "../../../atoms/DataAtom";
import {SettingModel} from "../../../models/DataModel";
import {MDBBtn, MDBInput, MDBInputGroup} from "mdb-react-ui-kit";

export type SettingModalProps = {
    register: UseFormRegister<SettingModel>,
    setValue: UseFormSetValue<SettingModel>,
    getValues: UseFormGetValues<SettingModel>,
    formState: FormState<SettingModel>
    reset: UseFormReset<SettingModel>
    watch: UseFormWatch<SettingModel>
}

export interface SettingModalChildProps {
    props: SettingModalProps
}

const SettingModalForm:FC<SettingModalChildProps> = ({props}) => {
    const [scenes,] = useAtom(dataScenesAtom);
    const [setting,] = useAtom(settingsAtom);

    useEffect(() => {
        if(!setting) return;
        props.reset(setting);
    }, [props.setValue, setting]);

    if(scenes && scenes.length === 0) return <></>;

    const handleValueChange = (name: any, value: any, valueAsNumber?: boolean) => {
        if(valueAsNumber){
            const number = Number(value);
            if(isNaN(number)) {
                props.setValue(name, 0);
                return;
            }
            props.setValue(name, Number(value));
        }else{
            props.setValue(name, value);
        }
    }

    if(!setting || !props.watch("defaultMarkerWidth")) return <></>;

    return (
        <>
            <form className="d-flex flex-column gap-2">
                <div className="input-group">
                    <label className="form-label input-group-text" htmlFor="initialScene">Initial Scene</label>
                    <select className="form-control" id="initialScene" {...props.register("initialScene", {required: true})}>
                        {
                            scenes?.map(scene => (
                                <option key={scene.id} value={scene.id}>{scene.name}</option>
                            ))
                        }
                    </select>
                </div>
                <MDBInputGroup textBefore='Default Marker width and height' className={"w-100"}>
                    <MDBInput label='Width' type="number" className="form-control" min={1}
                              value={props.watch("defaultMarkerWidth")} onChange={(e)=>handleValueChange("defaultMarkerWidth", e.target.value, true)} />
                    <MDBInput label='Height' type="number" className="form-control" min={1}
                              value={props.watch("defaultMarkerHeight")} onChange={(e)=>handleValueChange("defaultMarkerHeight", e.target.value, true)} />
                </MDBInputGroup>
            </form>
        </>
    );
};

export default SettingModalForm;