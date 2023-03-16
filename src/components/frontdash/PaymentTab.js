import { useState } from "react";
import PaymentTabNav from './navs/PaymentTabNav';
import ServerKeyPad from "../keypads/ServerKeyPad";
import AlphaNumericPad from '../keypads/AlphaNumericPad';
import FireItAlert from "../help/FireItAlert";
import SummaryTables from '../frontdash/summary_components/SummaryTables';
import TableCheck from "./check_components/TableCheck";
import SummaryReceipts from "./summary_components/SummaryReceipts";

const PaymentTab = (props) => {
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ alphaNumericPadOpen, setAlphaNumericPadOpen ] = useState(false);
    const [ fireItAlert, setFireItAlert ] = useState('')

    return(
        <div className='paymentTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            {alphaNumericPadOpen
                ? <AlphaNumericPad
                    paymentTabActive={props.paymentTabActive}
                    setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                    />
                : null
            }
            {/* KEEP LAST FOR PRIORITY */}
            {fireItAlert !== ''
                ? <FireItAlert
                    fireItAlert={fireItAlert}
                    setFireItAlert={setFireItAlert}
                    />
                : null
            }
            
            <SummaryTables
                serverTableList={props.serverTableList}
                />
            
            <TableCheck
                tableData={props.activeTableData}
                />
            
            <SummaryReceipts
                />

            <PaymentTabNav
                setHelpModal={props.setHelpModal}
                setManagerKeyPadActive={setManagerKeyPadActive}
                setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                />
        </div>
    )
}

export default PaymentTab;