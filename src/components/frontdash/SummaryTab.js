import SummaryTabNav from "./navs/SummaryTabNav";
import ServerKeyPad from "../user/ServerKeyPad";
import { useState } from "react";

const SummaryTab = () => {
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);

    return(
        <div className='summaryTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            <h2>Summary Tab Under Construction</h2>

            <SummaryTabNav 
                setManagerKeyPadActive={setManagerKeyPadActive}
                />
        </div>
    )
}

export default SummaryTab;