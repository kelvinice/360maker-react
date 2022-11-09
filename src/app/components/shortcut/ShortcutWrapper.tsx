import React, {useEffect, useState} from 'react';
import {Shortcut} from "../../models/DataModel";
import {v4 as uuidv4} from "uuid";
import clsx from "clsx";

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
                name: "King Palace",
            },
            {
                id: uuidv4(),
                name: "King Palace",
            },
            {
                id: uuidv4(),
                name: "King Palace",
            },
            {
                id: uuidv4(),
                name: "King Palace",
            },
            {
                id: uuidv4(),
                name: "Last",
            },
        ])
    }, []);

    return (
        <div className="w-100 overflow-auto d-flex mx-3">
            {
                shortcuts.map((shortcut, index) =>
                    <div className={clsx({
                        "ms-auto": index === 0,
                        "me-auto": index === shortcuts.length - 1,
                    }, "p-2 rounded-3 btn btn-lg btn-info text-nowrap m-1")} key={index} style={{maxHeight: "100px"}}>
                        {shortcut.name}
                    </div>
                )
            }
        </div>
    );
};

export default ShortcutWrapper;