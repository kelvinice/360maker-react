import React from 'react';
import {useForm} from "react-hook-form";
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";

type AddSceneModalFormProps = {
    id?: string
    name: string
    path: string
}

const AddSceneModalForm = () => {
    const {register, handleSubmit} = useForm<AddSceneModalFormProps>();

    const submit = (data: AddSceneModalFormProps) => {
        console.log(data);
    }

    return (
        <>
            <MDBModalBody>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name" {...register("name")}/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="path">Path</label>
                        <input type="text" className="form-control" id="path" placeholder="Enter path" {...register("path")}/>
                    </div>
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn onClick={handleSubmit(submit)}>Save changes</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default AddSceneModalForm;