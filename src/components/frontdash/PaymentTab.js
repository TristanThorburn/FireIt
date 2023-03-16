import { useState } from "react";
// import { useTable } from "../../contexts/TableContext";
// import { useAuth } from "../../contexts/AuthContext";
import PaymentTabNav from './navs/PaymentTabNav';
import ServerKeyPad from "../keypads/ServerKeyPad";
import AlphaNumericPad from '../keypads/AlphaNumericPad';
import FireItAlert from "../help/FireItAlert";

const PaymentTab = (props) => {
    // const { contextTable } = useTable();
    // const { employeeContext } = useAuth();
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ alphaNumericPadOpen, setAlphaNumericPadOpen ] = useState(false);
    const [ fireItAlert, setFireItAlert ] = useState('')

    const handleTest = () => {
        console.log('hi')
    }

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

            <h2>Payment Tab Under Construction</h2>
            <button onClick={handleTest} className='testButton'>TEST</button>

            <PaymentTabNav
                setHelpModal={props.setHelpModal}
                setManagerKeyPadActive={setManagerKeyPadActive}
                setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                />
        </div>
    )
}

export default PaymentTab;