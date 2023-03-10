import { useState } from 'react';
import AdminPad from '../../keypads/AdminPad';

const FrontDashNavTabs = (props) => {
    const [ adminPad, setAdminPad ] = useState(false)

        const toggleAdmin = () => {
        setAdminPad(!adminPad);
    }

    if(adminPad){
        document.body.classList.add('adminOpen')
    } else {
        document.body.classList.remove('adminOpen')
    }

    const handleTable = () => {
        props.tableTab(true);
        props.menuTab(false);
        props.checkTab(false);
        props.paymentTab(false);
        props.summaryTab(false);
    }

    const handleMenu = () => {
        props.tableTab(false);
        props.menuTab(true);
        props.checkTab(false);
        props.paymentTab(false);
        props.summaryTab(false);
    }

    const handleCheck = () => {
        props.tableTab(false);
        props.menuTab(false);
        props.checkTab(true);
        props.paymentTab(false);
        props.summaryTab(false);
    }

    const handlePayment = () => {
        props.tableTab(false);
        props.menuTab(false);
        props.checkTab(false);
        props.paymentTab(true);
        props.summaryTab(false);
    }

    const handleSummary = () => {
        props.tableTab(false);
        props.menuTab(false);
        props.checkTab(false);
        props.paymentTab(false);
        props.summaryTab(true);
    }

    return(
        <div className='frontDashTopNav'>
            <ul>
                <li onClick={handleSummary}>Summary</li>
                <li onClick={handleTable}>TableMap</li>
                <li onClick={handleMenu}>Menu</li>
                <li onClick={handleCheck}>Check</li>
                <li onClick={handlePayment}>Payment</li>
                <li onClick={toggleAdmin}>Admin</li>
            </ul>
            {adminPad
            ? <AdminPad closeAdmin={setAdminPad}/> 
            : null
            }
        </div>
    )
}

export default FrontDashNavTabs;