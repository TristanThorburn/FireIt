import { useEffect } from "react";

const FrontDashNavTabs = (props) => {
    const { tableTabActive, summaryTabActive, menuTabActive, checkTabActive, paymentTabActive} = props
    
    const toggleAdmin = () => {
        props.setAdminPad(true);
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

    // Highlight Tab
    useEffect(() => {
        const topNav = document.querySelector('.frontDashTopNav')
        const summary = topNav.querySelector('#summaryTab')
        const table = topNav.querySelector('#tableTab')
        const menu = topNav.querySelector('#menuTab')
        const check = topNav.querySelector('#checkTab')
        const payment = topNav.querySelector('#paymentTab')
        
        if(summaryTabActive){
            summary.classList.add('activeTopNav')
            table.classList.remove('activeTopNav')
            menu.classList.remove('activeTopNav')
            check.classList.remove('activeTopNav')
            payment.classList.remove('activeTopNav')
        }
        if(tableTabActive){
            summary.classList.remove('activeTopNav')
            table.classList.add('activeTopNav')
            menu.classList.remove('activeTopNav')
            check.classList.remove('activeTopNav')
            payment.classList.remove('activeTopNav')
        }
        if(menuTabActive){
            summary.classList.remove('activeTopNav')
            table.classList.remove('activeTopNav')
            menu.classList.add('activeTopNav')
            check.classList.remove('activeTopNav')
            payment.classList.remove('activeTopNav')
        }
        if(checkTabActive){
            summary.classList.remove('activeTopNav')
            table.classList.remove('activeTopNav')
            menu.classList.remove('activeTopNav')
            check.classList.add('activeTopNav')
            payment.classList.remove('activeTopNav')
        }
        if(paymentTabActive){
            summary.classList.remove('activeTopNav')
            table.classList.remove('activeTopNav')
            menu.classList.remove('activeTopNav')
            check.classList.remove('activeTopNav')
            payment.classList.add('activeTopNav')
        }
    },[summaryTabActive, tableTabActive, menuTabActive, checkTabActive, paymentTabActive])

    return(
        <div className='frontDashTopNav'>
            <ul>
                <li onClick={handleSummary} id='summaryTab'>Summary</li>
                <li onClick={handleTable} id='tableTab'>TableMap</li>
                <li onClick={handleMenu} id='menuTab'>Menu</li>
                <li onClick={handleCheck} id='checkTab'>Check</li>
                <li onClick={handlePayment} id='paymentTab'>Payment</li>
                <li onClick={toggleAdmin}>Admin</li>
            </ul>
        </div>
    )
}

export default FrontDashNavTabs;