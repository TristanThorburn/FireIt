const FrontUserGuide = (props) => {
    // tableTabActive={props.tableTabActive}
    // menuTabActive={props.menuTabActive}
    // checkTabActive={props.checkTabActive}
    // paymentTabActive={props.paymentTabActive}
    // summaryTabActive={props.summaryTabActive}

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
                        <li><p>This represents the layout of the restaurant, tables can be 'touched' to select the table and link to the menu for food and drink orders. Table designs, names and positions can be updated and saved by using the Admin tab to enter the back dash.</p></li>
                        <li><p>Stretch Goals: 
                            <br />
                            Color change tables to designate if the table already has ordered items from the server. Prohibit orders on tables in use by any server.</p>
                        </li>
                    </ul>
                    : null
                }

                {props.menuTabActive
                    ? <ul>
                        <li><p>This is the main area where orders are punched in to simulate sending to the bar. Users can select the seat they wish to punch the items in on for future check organization, otherwise seat 1 will be assumed by default. 
                            <br />
                            Pending orders will appear on the check in blue, this also simulates the functionality of unset orders servers could edit without the help of a manager, as nothing has been 'sent' so there is no potential product loss.
                            <br />
                            Unsent orders will currently be lost when switching tabs.
                        </p>
                        </li>
                        <li>
                            <p>When manager override is active, SENT items on the check can be modified. This includes deletion, 25% / 50% / 100% discount application and removal, as well as QSA application and removal of a 100% discount.
                                <br />
                                Attempting to delete an item with a discount will prompt a warning and a confirmation, as future data will account for discount totals and type.
                            </p>
                        </li>
                        <li>
                            <p>New items can be added to the menu categories using the Admin tab and the back dash.</p>
                        </li>
                        <li><p>Stretch Goals:
                            <br />
                            Add quick navigation between menu subcategories.
                            <br />
                            Allow servers to UNDO pending orders.
                            <br />
                            Store Pending orders to database.
                            <br />
                            Add pop-ups to items to choose addons/sides, such as fries or salad to add to burgers. Pop-ups to based on data from menu items in the back dash.
                            <br />
                            Organize appended orders by increasing seat number.
                            </p>
                        </li>
                    </ul>
                    : null
                }

                {props.checkTabActive
                    ? <ul>
                        <li><p>Under Construction: 
                            <br />
                            .</p>
                        </li>
                        <li><p>Stretch Goals: 
                            <br />
                            Organize seats into different billing methods, for example split checks.  Allow for the transfer of items between seats.</p>
                        </li>
                    </ul>
                    : null
                }

                {props.paymentTabActive
                    ? <ul>
                        <li><p>Under Construction: 
                            <br />
                            .</p>
                        </li>
                        <li><p>Stretch Goals: 
                            <br />
                            Settle payments by various methods, cash/visa/amex/mastercard, clearing the orders from the table and allowing it to be used again as a fresh table. Store payment data for reporting</p>
                        </li>
                    </ul>
                    : null
                }

                {props.summaryTabActive
                    ? <ul>
                        <li><p>Under Construction: 
                            <br />
                            .</p>
                        </li>
                        <li><p>Stretch Goals: 
                            <br />
                            Display all tables currently in use by the server for easy reference, allow for the transfer of tables between servers. Allow for the transfer of items between seats. Select items to be repeated for another 'round'.</p>
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
                            <p>MGR OVER</p>
                            <p>- Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished.</p> 
                        </li>
                        <li>
                            <p>TEST</p>
                            <p>- Test buttons exist for coding console.log and has no user functionality.</p> 
                        </li>
                        <li>
                            <p>DEMO</p>
                            <p>- Button under construction.</p> 
                        </li>
                        <li>
                            <p>HELP</p>
                            <p>- Opens modal for user info, or insights to code logic.</p> 
                        </li>
                        <li>
                            <p>USER</p>
                            <p>- Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard.</p> 
                        </li>
                        <li>
                            <p>LOGOUT</p>
                            <p>- Logout user/sever and return to the landing page</p> 
                        </li>
                    </ul>
                    :null
                }

                {props.menuTabActive
                    ? <ul>
                        <li>
                            <p>MGR OVER</p>
                            <p>- Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished.</p> 
                        </li>
                        <li>
                            <p>SEND ORDER</p>
                            <p>- Store the pending orders to firebase, simulating sending orders to the kitchen or bar</p> 
                        </li>
                        <li>
                            <p>SEAT#?</p>
                            <p>- Select the seat number to order the item on. The number can be 1 or 2 digits, seat 1 will be assumed by default.</p> 
                        </li>
                        <li>
                            <p>HIDE OLD</p>
                            <p>- Under construction. Hide non pending orders.</p> 
                        </li>
                        <li>
                            <p>MAIN MENU</p>
                            <p>- Return to the main directory of menu categories.</p> 
                        </li>
                        <li>
                            <p>CHNG TBL</p>
                            <p>- Under construction. Change active table without using table map.</p> 
                        </li>
                        <li>
                            <p>HELP</p>
                            <p>- Opens modal for user info, or insights to code logic.</p> 
                        </li>
                        <li>
                            <p>USER</p>
                            <p>- Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard.</p> 
                        </li>
                        <li>
                            <p>LOGOUT</p>
                            <p>- Logout user/sever and return to the landing page.</p> 
                        </li>
                    </ul>
                    :null
                }

                {props.checkTabActive
                    ? <ul>
                        <li>
                            <p>MGR OVER</p>
                            <p>- Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished.</p> 
                        </li>
                        <li>
                            <p>TEST</p>
                            <p>- Test buttons exist for coding console.log and has no user functionality.</p> 
                        </li>
                        <li>
                            <p>DEMO</p>
                            <p>- Button under construction.</p> 
                        </li>
                        <li>
                            <p>HELP</p>
                            <p>- Opens modal for user info, or insights to code logic.</p> 
                        </li>
                        <li>
                            <p>USER</p>
                            <p>- Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard.</p> 
                        </li>
                        <li>
                            <p>LOGOUT</p>
                            <p>- Logout user/sever and return to the landing page.</p> 
                        </li>
                    </ul>
                    :null
                }

                {props.paymentTabActive
                    ? <ul>
                        <li>
                            <p>MGR OVER</p>
                            <p>- Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished.</p> 
                        </li>
                        <li>
                            <p>TEST</p>
                            <p>- Test buttons exist for coding console.log and has no user functionality.</p> 
                        </li>
                        <li>
                            <p>DEMO</p>
                            <p>- Button under construction.</p> 
                        </li>
                        <li>
                            <p>HELP</p>
                            <p>- Opens modal for user info, or insights to code logic.</p> 
                        </li>
                        <li>
                            <p>USER</p>
                            <p>- Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard.</p> 
                        </li>
                        <li>
                            <p>LOGOUT</p>
                            <p>- Logout user/sever and return to the landing page.</p> 
                        </li>
                    </ul>
                    :null
                }

                {props.summaryTabActive
                    ? <ul>
                        <li>
                            <p>MGR OVER</p>
                            <p>- Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished.</p> 
                        </li>
                        <li>
                            <p>TEST</p>
                            <p>- Test buttons exist for coding console.log and has no user functionality.</p> 
                        </li>
                        <li>
                            <p>DEMO</p>
                            <p>- Button under construction.</p> 
                        </li>
                        <li>
                            <p>HELP</p>
                            <p>- Opens modal for user info, or insights to code logic.</p> 
                        </li>
                        <li>
                            <p>USER</p>
                            <p>- Displays the name of the current user / server in the terminal. New users can be added using the Admin tab and back dashboard.</p> 
                        </li>
                        <li>
                            <p>LOGOUT</p>
                            <p>- Logout user/sever and return to the landing page.</p> 
                        </li>
                    </ul>
                    :null
                }
            </div>
        </div>
    )
}

export default FrontUserGuide;