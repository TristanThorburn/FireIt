import FrontDashNavTabs from './frontdash/navs/FrontDashTabsNav';
import { useState } from 'react'
import FrontDashHelp from './help/FrontDashHelp';
import SummaryTab from './frontdash/SummaryTab';
import TableTab from './frontdash/TableTab';
import MenuTab from './frontdash/MenuTab';
import CheckTab from './frontdash/CheckTab';
import PaymentTab from './frontdash/PaymentTab';
 
const FrontDash = () => {
    const[ summaryTabActive, setSummaryTabActive ] = useState(false);
    const[ tableTabActive, setTableTabActive ] = useState(true);
    const[ menuTabActive, setMenuTabActive ] = useState(false);
    const[ checkTabActive, setCheckTabActive ] = useState(false);
    const[ paymentTabActive, setPaymentTabActive ] = useState(false);
    const [ helpModal, setHelpModal ] = useState(false);

    return(
        <div>
            <FrontDashNavTabs 
                tableTab={setTableTabActive} 
                menuTab={setMenuTabActive} 
                checkTab={setCheckTabActive} 
                paymentTab={setPaymentTabActive}
                summaryTab={setSummaryTabActive}
                />
            
            {helpModal
                ? <FrontDashHelp
                    tableTabActive={tableTabActive}
                    menuTabActive={menuTabActive}
                    checkTabActive={checkTabActive}
                    paymentTabActive={paymentTabActive}
                    summaryTabActive={summaryTabActive}
                    setHelpModal={setHelpModal}
                />
                : null
            }
            
            {summaryTabActive
                ? <SummaryTab
                    setHelpModal={setHelpModal}
                    />
                : null
            }

            {tableTabActive
                ? <TableTab
                    setHelpModal={setHelpModal}
                    tableTabActive={tableTabActive}
                    setTableTabActive={setTableTabActive}
                    setMenuTabActive={setMenuTabActive}
                    />
                : null
            }

            {menuTabActive
                ? <MenuTab
                    setHelpModal={setHelpModal}
                    setTableTabActive={setTableTabActive}
                    setMenuTabActive={setMenuTabActive}
                    />
                : null
            }

            {checkTabActive
                ? <CheckTab
                    setHelpModal={setHelpModal}
                    />
                : null
            }

            {paymentTabActive
                ? <PaymentTab
                    setHelpModal={setHelpModal}
                    />
                : null
            }
        </div>
    )
}

export default FrontDash;