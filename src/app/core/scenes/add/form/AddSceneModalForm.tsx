import React from 'react';
import {useForm} from "react-hook-form";
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import {Scene} from "../../../../models/DataModel";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../../atoms/DataAtom";
import {v4 as uuidv4} from 'uuid';
import toast from "react-hot-toast";
import {useMenu} from "../../../../providers/MenuProvider";


const AddSceneModalForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<Scene>();
    const {setModalAddScene} = useMenu();
    const [scenes, setScenes] = useAtom(dataScenesAtom);

    const submit = (data: Scene) => {
        data.id = uuidv4();
        data.markers = [];
        if(scenes)
            setScenes([...scenes, data]);
        toast.success("Scene added");
        setModalAddScene(false);
        reset();
    }

    return (
        <>
            <MDBModalBody>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name" {...register("name", {required: true})}/>
                        {
                            errors.name && <div className="text-danger">This field is required</div>
                        }
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="path">Path</label>
                        <input type="text" className="form-control" id="path" placeholder="Enter path" {...register("path", {required: true})}/>
                        {
                            errors.path && <div className="text-danger">This field is required</div>
                        }
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