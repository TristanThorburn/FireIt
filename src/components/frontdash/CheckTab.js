import CheckTabNav from "./navs/CheckTabNav";
import ServerKeyPad from "../user/ServerKeyPad";
import { useState } from "react";

const CheckTab = () => {
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);

    return(
        <div className='checkTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }
            
            <h2>Check Tab Under Construction</h2>

            <CheckTabNav 
                setManagerKeyPadActive={setManagerKeyPadActive}
                />
        </div>
    )
}

export default CheckTab;