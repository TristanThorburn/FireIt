const NavTabs = (props) => {
    // tableTab={setTableTabActive} 
    // menuTab={setMenuTabActive} 
    // checkTab={setCheckTabActive} 
    // paymentTab={setPaymentTabActive}
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
            </ul>
        </div>
    )
}

export default NavTabs;