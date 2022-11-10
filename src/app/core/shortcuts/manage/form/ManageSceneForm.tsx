import React from 'react';
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import {useForm} from "react-hook-form";
import {Shortcut} from "../../../../models/DataModel";
import {dataScenesAtom} from "../../../../atoms/DataAtom";
import {useAtom} from "jotai";

const ManageSceneForm = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<Shortcut>();
    const [scenes,] = useAtom(dataScenesAtom);

    const submit = (data: Shortcut) => {
        console.log(data);
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
                        <label htmlFor="path">Scene</label>
                        <select className="form-select" aria-label="Scene" {...register("sceneId", {required: true})}>
                            <option value="">Select a scene</option>
                            {
                                scenes && scenes.map(scene => <option key={scene.id} value={scene.id}>{scene.name}</option>)
                            }
                        </select>
                    </div>
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn onClick={handleSubmit(submit)}>Save changes</MDBBtn>
            </MDBModalFooter>

        </>
    );
};

export default ManageSceneForm;