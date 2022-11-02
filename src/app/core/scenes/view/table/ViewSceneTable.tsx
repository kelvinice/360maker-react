import React from 'react';
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../../atoms/DataAtom";
import {SweetAlert} from "../../../../constants/SweetAlert";
import toast from "react-hot-toast";
import {Scene} from "../../../../models/DataModel";
import {changeScene} from "../../../PhotoSphereViewer";

const ViewSceneTable = () => {
    const [scene, setScene] = useAtom(dataScenesAtom);

    const deleteScene = (id: string) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setScene(scene.filter((scene) => scene.id !== id));
                toast.success("Scene deleted");
            }
        })
    }

    const handleView = (scene: Scene) => {
        changeScene(scene);
    }

    return (
        <div>
            {/*Table of scene*/}
            <table className="table table-striped table-responsive">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Path</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    scene.map((scene, index) => (
                        <tr key={scene.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{scene.name}</td>
                            <td>{scene.path}</td>
                            <td>
                                <div className="d-flex flex-row">
                                    <button className="btn btn-danger" onClick={() => deleteScene(scene.id as string)}>
                                        <i className="fa fa-trash"/>
                                    </button>
                                    <button className="btn btn-primary ms-2">
                                        <i className="fa fa-edit"/>
                                    </button>
                                    <button className="btn btn-success ms-2"
                                        onClick={() => handleView(scene)}>
                                        <i className="fa fa-eye"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default ViewSceneTable;