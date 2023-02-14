import NavTabs from './summary/NavTabs';
import { useState } from 'react'
import TableTab from './summary/TableTab';
import MenuTab from './summary/MenuTab';
import CheckTab from './summary/CheckTab';
import PaymentTab from './summary/PaymentTab';
 
const FrontDash = () => {
    const[ tableTabActive, setTableTabActive ] = useState(true);
    const[ menuTabActive, setMenuTabActive ] = useState(false);
    const[ checkTabActive, setCheckTabActive ] = useState(false);
    const[ paymentTabActive, setPaymentTabActive ] = useState(false);

    return(
        <div>
            <NavTabs 
                tableTab={setTableTabActive} 
                menuTab={setMenuTabActive} 
                checkTab={setCheckTabActive} 
                paymentTab={setPaymentTabActive}
                />
            
            {tableTabActive
                ? <TableTab />
                : null
            }

            {menuTabActive
                ? <MenuTab />
                : null
            }

            {checkTabActive
                ? <CheckTab />
                : null
            }

            {paymentTabActive
                ? <PaymentTab />
                : null
            }
        </div>
    )
}

export default FrontDash;