import { useState } from 'react';
import AdminPad from '../user/AdminPad';

const NavTabs = (props) => {
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
        props.paymentTab(false)
    }

    const handleMenu = () => {
        props.tableTab(false);
        props.menuTab(true);
        props.checkTab(false);
        props.paymentTab(false);
    }

    const handleCheck = () => {
        props.tableTab(false);
        props.menuTab(false);
        props.checkTab(true);
        props.paymentTab(false);
    }

    const handlePayment = () => {
        props.tableTab(false);
        props.menuTab(false);
        props.checkTab(false);
        props.paymentTab(true);
    }

    return(
        <div className="navTabs">
            <ul>
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

export default NavTabs;