import { useState } from "react";
import PaymentTabNav from './navs/PaymentTabNav';
import ServerKeyPad from "../keypads/ServerKeyPad";
import AlphaNumericPad from '../keypads/AlphaNumericPad';
import FireItAlert from "../help/FireItAlert";
import SummaryTables from '../frontdash/summary_components/SummaryTables';
import TableCheck from "./check_components/TableCheck";
import SummaryReceipts from "./summary_components/SummaryReceipts";
import PaymentKeyPad from "../keypads/PaymentKeyPad";

const PaymentTab = (props) => {
    const { checkTotal, setCheckTotal } = props
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ alphaNumericPadOpen, setAlphaNumericPadOpen ] = useState(false);
    const [ fireItAlert, setFireItAlert ] = useState('');
    const [ paymentKeyPadActive, setPaymentKeyPadActive ] = useState(false);
    const [ receiptToSettle, setReceiptToSettle ] = useState('');
    const [ fullPaymentData, setFullPaymentData ] = useState('');
    const [ finalizePayments, setFinalizePayments ] = useState(false);
    const [ undoSettledPayment, setUndoSettledPayment ] = useState(false);
    const [ undoTargetReceipt, setUndoTargetReceipt ] = useState('')

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

            {paymentKeyPadActive
                ? <PaymentKeyPad
                    receiptToSettle={receiptToSettle}
                    setPaymentKeyPadActive={setPaymentKeyPadActive}
                    setFireItAlert={setFireItAlert}
                    setFullPaymentData={setFullPaymentData}
                    />
                : null
            }
            {/* KEEP LAST FOR PRIORITY */}
            {fireItAlert !== ''
                ? <FireItAlert
                    fireItAlert={fireItAlert}
                    setFireItAlert={setFireItAlert}
                    setUndoSettledPayment={setUndoSettledPayment}
                    paymentTabActive={props.paymentTabActive}
                    />
                : null
            }

            <SummaryTables
                serverTableList={props.serverTableList}
                />
            
            <TableCheck
                tableData={props.activeTableData}
                checkTotal={checkTotal}
                setCheckTotal={setCheckTotal}
                />
            
            <SummaryReceipts
                setPaymentKeyPadActive={setPaymentKeyPadActive}
                setReceiptToSettle={setReceiptToSettle}
                fullPaymentData={fullPaymentData}
                setFullPaymentData={setFullPaymentData}
                setFireItAlert={setFireItAlert}
                setFinalizePayments={setFinalizePayments}
                finalizePayments={finalizePayments}
                setUndoSettledPayment={setUndoSettledPayment}
                undoSettledPayment={undoSettledPayment}
                undoTargetReceipt={undoTargetReceipt}
                setUndoTargetReceipt={setUndoTargetReceipt}
                setLoading={props.setLoading}
                />

            <PaymentTabNav
                setHelpModal={props.setHelpModal}
                setManagerKeyPadActive={setManagerKeyPadActive}
                setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                setFinalizePayments={setFinalizePayments}
                setFireItAlert={setFireItAlert}
                />
        </div>
    )
}

export default PaymentTab;