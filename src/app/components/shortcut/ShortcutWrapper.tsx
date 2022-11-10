import React, {useEffect, useState} from 'react';
import {Shortcut} from "../../models/DataModel";
import {v4 as uuidv4} from "uuid";
import clsx from "clsx";
import {MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBDropdown} from "mdb-react-ui-kit";

const ShortcutWrapper = () => {
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    useEffect(() => {
        setShortcuts([
            {
                id: uuidv4(),
                name: "First",
            },
            {
                id: uuidv4(),
                name: "Queen Palace",
            },
            {
                id: uuidv4(),
                name: "King Palace",
                children: [
                    {
                        id: uuidv4(),
                        name: "Inside palace",
                    },
                    {
                        id: uuidv4(),
                        name: "Middle palace",
                    },
                    {
                        id: uuidv4(),
                        name: "lorem ipsum dolor sit amet .",
                    },
                    {
                        id: uuidv4(),
                        name: "Outside palace",
                    }
                ]
            },
            {
                id: uuidv4(),
                name: "Last",
            },
        ])
    }, []);

    return (
        <div className="w-100 overflow-auto d-flex mx-3" >
            {
                shortcuts.map((shortcut, index) => (
                    shortcut.children ? (
                        <MDBDropdown key={index} className="position-static" dropup={true}>
                            <MDBDropdownToggle className={clsx({
                                "ms-auto": index === 0,
                                "me-auto": index === shortcuts.length - 1,
                            }, "p-2 rounded-1 btn btn-lg btn-info text-nowrap m-1")}>
                                {shortcut.name}
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="overflow-auto bg-white" style={{maxHeight:"500px"}}>
                                {
                                    shortcut.children.map((child, index) => (
                                        <MDBDropdownItem link key={index} className={"flat-a m-1"}>
                                            <div className="p-2 rounded-1 btn btn-lg btn-info text-wrap w-100">
                                                {child.name}
                                            </div>
                                        </MDBDropdownItem>
                                    ))
                                }
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    ) : (
                        <div className={clsx({
                            "ms-auto": index === 0,
                            "me-auto": index === shortcuts.length - 1,
                        }, "p-2 rounded-1 btn btn-lg btn-info text-nowrap m-1")} key={index}>
                            {shortcut.name}
                        </div>

                    )
                ))
            }
        </div>
    );
};

export default ShortcutWrapper;