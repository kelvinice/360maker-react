import React, {useEffect} from 'react';
import {useMenu} from "../../../providers/MenuProvider";
import {
    MDBBtn, MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import SettingModalForm from "../form/SettingModalForm";
import {useForm} from "react-hook-form";
import {SettingProps} from "../../../models/SettingModel";
import {useAtom} from "jotai";
import {settingsAtom} from "../../../atoms/DataAtom";
import toast from "react-hot-toast";

const SettingModal = () => {
    const {setModalSetting, modalSetting} = useMenu();
    const {register, handleSubmit, setValue} = useForm<SettingProps>();
    const [, setSetting] = useAtom(settingsAtom);

    const submit = (data: SettingProps) => {
        setSetting(data);
        toast.success("Setting saved");
        setModalSetting(false);
    }

    return (
        <>
            <MDBModal staticBackdrop show={modalSetting} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Setting</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setModalSetting(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <SettingModalForm register={register} setValue={setValue} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='primary' onClick={handleSubmit(submit)}>Save Setting</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </>
    );
};

export default SettingModal;