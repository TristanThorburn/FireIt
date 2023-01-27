import { Link } from 'react-router-dom';

const NavTabs = (props) => {
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
                <li><Link to='/backend-dash'>Admin</Link></li>
            </ul>
        </div>
    )
}

export default NavTabs;