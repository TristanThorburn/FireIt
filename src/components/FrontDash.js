import FrontDashNavTabs from './frontdash/navs/FrontDashTabsNav';
import { useState } from 'react'
import SummaryTab from './frontdash/SummaryTab';
import TableTab from './frontdash/TableTab';
import MenuTab from './frontdash/MenuTab';
import CheckTab from './frontdash/CheckTab';
import PaymentTab from './frontdash/PaymentTab';
 
const FrontDash = () => {
    // Swap Summary Table Map true/false 
    const[ summaryTabActive, setSummaryTabActive ] = useState(false);
    const[ tableTabActive, setTableTabActive ] = useState(true);
    const[ menuTabActive, setMenuTabActive ] = useState(false);
    const[ checkTabActive, setCheckTabActive ] = useState(false);
    const[ paymentTabActive, setPaymentTabActive ] = useState(false);

    return(
        <div>
            <FrontDashNavTabs 
                tableTab={setTableTabActive} 
                menuTab={setMenuTabActive} 
                checkTab={setCheckTabActive} 
                paymentTab={setPaymentTabActive}
                summaryTab={setSummaryTabActive}
                />
            
            {summaryTabActive
                ? <SummaryTab />
                : null
            }

            {tableTabActive
                ? <TableTab 
                    tableTabActive={tableTabActive}
                    setTableTabActive={setTableTabActive}
                    setMenuTabActive={setMenuTabActive}
                    />
                : null
            }

            {menuTabActive
                ? <MenuTab 
                    setTableTabActive={setTableTabActive}
                    setMenuTabActive={setMenuTabActive}
                    />
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