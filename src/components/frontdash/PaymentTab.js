import PaymentTabNav from './navs/PaymentTabNav';
import ServerKeyPad from "../user/ServerKeyPad";
import { useState } from "react";

const PaymentTab = () => {
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);

    return(
        <div className='paymentTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            <h2>Payment Tab Under Construction</h2>

            <PaymentTabNav 
                setManagerKeyPadActive={setManagerKeyPadActive}
                />
        </div>
    )
}

export default PaymentTab;