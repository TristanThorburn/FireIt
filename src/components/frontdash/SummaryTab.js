import { useState } from "react";
import SummaryTabNav from "./navs/SummaryTabNav";
import ServerKeyPad from "../keypads/ServerKeyPad";
import SummaryTables from "./summary_components/SummaryTables";
import FireItAlert from '../help/FireItAlert';
import TableCheck from "./check_components/TableCheck";
import AlphaNumericPad from "../keypads/AlphaNumericPad";

const SummaryTab = (props) => {
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ fireItAlert, setFireItAlert ] = useState('');
    const [ alphaNumericPadOpen, setAlphaNumericPadOpen ] = useState(false);

    return(
        <div className='summaryTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            {alphaNumericPadOpen
                ? <AlphaNumericPad
                    setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                    serverTableList={props.serverTableList}
                    summaryTabActive={props.summaryTabActive}
                    setSummaryTabActive={props.setSummaryTabActive}
                    setMenuTabActive={props.setMenuTabActive}
                    />
                : null
            }

            {fireItAlert !== ''
                ? <FireItAlert
                    fireItAlert={fireItAlert}
                    setFireItAlert={setFireItAlert}
                    />
                : null
            }

            <div className='summaryTabDisplayContainer'>
                <SummaryTables
                    setFireItAlert={setFireItAlert}
                    serverTableList={props.serverTableList}
                    />
                
                <TableCheck
                    tableData={props.activeTableData}
                    summaryTabActive={props.summaryTabActive}
                    />
            </div>

            <SummaryTabNav
                setHelpModal={props.setHelpModal}
                setManagerKeyPadActive={setManagerKeyPadActive}
                setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                />
        </div>
    )
}

export default SummaryTab;