const FrontUserGuide = (props) => {
    return(
        <div className='frontUserGuideContainer'>
            <div>
                <h3>How to use the {
                    props.tableTabActive
                        ? 'TableMap Tab'
                        : props.menuTabActive
                            ? 'Menu Tab'
                            : props.checkTabActive
                                ? 'Check Tab'
                                : props.paymentTabActive
                                    ? 'Payment Tab'
                                    : props.summaryTabActive
                                        ? 'Summary Tab'
                                        : null
                    }
                </h3>

                {props.tableTabActive
                    ? <ul>
                        <li>This represents the layout of the restaurant, tables can be 'touched' to select the table and link to the menu for food and drink orders. Table designs, names and positions can be updated and saved by using the Admin tab to enter the back dash.</li>
                        <li>Stretch Goals: 
                            <br />
                            Color change tables to designate if the table already has ordered items from the server. Prohibit orders on tables in use by any server.
                        </li>
                    </ul>
                    : null
                }

                {props.menuTabActive
                    ? <ul>
                        <li>This is the main area where orders are punched in to simulate sending to the bar. Users can select the seat they wish to punch the items in on for future check organization, otherwise seat 1 will be assumed by default.</li>
                        <li>Pending orders will appear on the check in blue, this also simulates the functionality of unsent orders, thus servers could delete without the help of a manager, as nothing has been 'sent' so there is no potential product loss.</li>
                        <li>~Pending orders will currently be lost when switching tabs.~</li>
                        <li>Click on the item name to delete PENDING orders, pending orders which create a new seat can only be deleted if no other items are on the seat.</li>
                        <li>When manager override is active, SENT items on the check can be modified. This includes deletion, 25% / 50% / 100% discount application and removal, as well as QSA application and removal of a 100% discount.</li>
                        <li>Attempting to delete an item with a discount will prompt a warning and a confirmation, as future data will account for discount totals and type.</li>
                        <li>New items can be added to the menu categories using the Admin tab and the back dash.</li>
                        <li>Stretch Goals:
                            <br />
                            Add quick navigation between menu subcategories.
                            <br />
                            Store Pending orders to database.
                            <br />
                            Add pop-ups to items to choose addons/sides, such as fries or salad to add to burgers. Pop-ups to based on data from menu items in the back dash.
                            <br />
                            Organize appended orders by increasing seat number.
                        </li>
                    </ul>
                    : null
                }

                {props.checkTabActive
                    ? <ul>
                        <li>Under Construction: 
                            <br />
                            .
                        </li>
                        <li>Stretch Goals: 
                            <br />
                            Organize seats into different billing methods, for example split checks.  Allow for the transfer of items between seats.
                        </li>
                    </ul>
                    : null
                }

                {props.paymentTabActive
                    ? <ul>
                        <li>Under Construction: 
                            <br />
                            .
                        </li>
                        <li>Stretch Goals: 
                            <br />
                            Settle payments by various methods, cash/visa/amex/mastercard, clearing the orders from the table and allowing it to be used again as a fresh table. Store payment data for reporting
                        </li>
                    </ul>
                    : null
                }

                {props.summaryTabActive
                    ? <ul>
                        <li>Under Construction: 
                            <br />
                            .
                        </li>
                        <li>Stretch Goals: 
                            <br />
                            Display all tables currently in use by the server for easy reference, allow for the transfer of tables between servers. Allow for the transfer of items between seats. Select items to be repeated for another 'round'.
                        </li>
                    </ul>
                    : null
                }
            </div>

            <div>
                <h3>How to use the {
                    props.tableTabActive
                        ? 'TableMap Bottom Nav Bar'
                        : props.menuTabActive
                            ? 'Menu Bottom Nav Bar'
                            : props.checkTabActive
                                ? 'Check Bottom Nav Bar'
                                : props.paymentTabActive
                                    ? 'Payment Bottom Nav Bar'
                                    : props.summaryTabActive
                                        ? 'Summary Bottom Nav Bar'
                                        : null
                    }
                </h3>

                {props.tableTabActive
                    ? <ul>
                        <li>
                            MGR OVER
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            TEST
                            <br />
                            - Test buttons exist for coding console.log and has no user functionality. 
                        </li>
                        <li>
                            DEMO
                            <br />
                            - Button under construction. 
                        </li>
                        <li>
                            HELP
                            <br />
                            - Opens modal for user info, or insights to code logic. 
                        </li>
                        <li>
                            USER
                            <br />
                            - Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard. 
                        </li>
                        <li>
                            LOGOUT
                            <br />
                            - Logout user/sever and return to the landing page 
                        </li>
                    </ul>
                    :null
                }

                {props.menuTabActive
                    ? <ul>
                        <li>
                            MGR OVER
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            SEND ORDER
                            <br />
                            - Store the pending orders to firebase, simulating sending orders to the kitchen or bar 
                        </li>
                        <li>
                            SEAT#?
                            <br />
                            - Select the seat number to order the item on. The number can be 1 or 2 digits, seat 1 will be assumed by default. 
                        </li>
                        <li>
                            HIDE OLD
                            <br />
                            - Under construction. Hide non pending orders. 
                        </li>
                        <li>
                            MAIN MENU
                            <br />
                            - Return to the main directory of menu categories. 
                        </li>
                        <li>
                            CHNG TBL
                            <br />
                            - Under construction. Change active table without using table map. 
                        </li>
                        <li>
                            HELP
                            <br />
                            - Opens modal for user info, or insights to code logic. 
                        </li>
                        <li>
                            USER
                            <br />
                            - Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard. 
                        </li>
                        <li>
                            LOGOUT
                            <br />
                            - Logout user/sever and return to the landing page. 
                        </li>
                    </ul>
                    :null
                }

                {props.checkTabActive
                    ? <ul>
                        <li>
                            MGR OVER
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            TEST
                            <br />
                            - Test buttons exist for coding console.log and has no user functionality. 
                        </li>
                        <li>
                            DEMO
                            <br />
                            - Button under construction. 
                        </li>
                        <li>
                            HELP
                            <br />
                            - Opens modal for user info, or insights to code logic. 
                        </li>
                        <li>
                            USER
                            <br />
                            - Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard. 
                        </li>
                        <li>
                            LOGOUT
                            <br />
                            - Logout user/sever and return to the landing page. 
                        </li>
                    </ul>
                    :null
                }

                {props.paymentTabActive
                    ? <ul>
                        <li>
                            MGR OVER
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            TEST
                            <br />
                            - Test buttons exist for coding console.log and has no user functionality. 
                        </li>
                        <li>
                            DEMO
                            <br />
                            - Button under construction. 
                        </li>
                        <li>
                            HELP
                            <br />
                            - Opens modal for user info, or insights to code logic. 
                        </li>
                        <li>
                            USER
                            <br />
                            - Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard. 
                        </li>
                        <li>
                            LOGOUT
                            <br />
                            - Logout user/sever and return to the landing page. 
                        </li>
                    </ul>
                    :null
                }

                {props.summaryTabActive
                    ? <ul>
                        <li>
                            MGR OVER
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            TEST
                            <br />
                            - Test buttons exist for coding console.log and has no user functionality. 
                        </li>
                        <li>
                            DEMO
                            <br />
                            - Button under construction. 
                        </li>
                        <li>
                            HELP
                            <br />
                            - Opens modal for user info, or insights to code logic. 
                        </li>
                        <li>
                            USER
                            <br />
                            - Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard. 
                        </li>
                        <li>
                            LOGOUT
                            <br />
                            - Logout user/sever and return to the landing page. 
                        </li>
                    </ul>
                    :null
                }
            </div>
        </div>
    )
}

export default FrontUserGuide;