import SummaryTabNav from "./navs/SummaryTabNav";
import ServerKeyPad from "../keypads/ServerKeyPad";
import { useState } from "react";

const SummaryTab = (props) => {
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
                setHelpModal={props.setHelpModal}
                setManagerKeyPadActive={setManagerKeyPadActive}
                />
        </div>
    )
}

export default SummaryTab;