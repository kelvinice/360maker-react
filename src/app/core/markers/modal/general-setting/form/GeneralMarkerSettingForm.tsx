import React, {FC} from 'react';
import {ConfigMarkerModalChildProps} from "../../parent/MarkerConfigParent";
import {MDBInputGroup, MDBBtn, MDBSwitch} from "mdb-react-ui-kit";

const GeneralMarkerSettingForm: FC<ConfigMarkerModalChildProps> = ({props}) => {
    const deleteValueOnAttribute = (attribute: any) => {
        props.setValue(attribute, undefined);
    }

    return (
        <form className={"d-flex flex-column gap-2"}>
            <MDBInputGroup textBefore={"Tooltip"}>
                <input type="text" className="form-control" id="tooltip" {...props.register("tooltip")} />
            </MDBInputGroup>
            <MDBInputGroup textBefore={"Marker size"}>
                <input type="number" className="form-control" {...props.register("size")} placeholder={"Using marker size default value"} />
                <MDBBtn type="button" color="secondary" onClick={()=>deleteValueOnAttribute("size")}><i className={"fa fa-trash"}/></MDBBtn>
            </MDBInputGroup>
            <MDBInputGroup textBefore={"Custom icon"}>
                <input type="text" className="form-control" {...props.register("customIcon")} placeholder={"Using marker icon default value"} />
                <MDBBtn type="button" color="secondary" onClick={()=>deleteValueOnAttribute("customIcon")}><i className={"fa fa-trash"}/></MDBBtn>
            </MDBInputGroup>
            <MDBInputGroup>
                <MDBSwitch checked={props.watch('disableClick') || false} label='Disable click' onChange={(e)=>props.setValue('disableClick', e.target.checked)} />
            </MDBInputGroup>
        </form>
    );
};

export default GeneralMarkerSettingForm;