const FrontUserGuide = (props) => {
    return(
        <div className='frontUserGuideContainer'>
            <div className='guideContainer'>
                <h2>How to use the {
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
                </h2>

                {props.tableTabActive
                    ? <ul>
                        <li>This represents the layout of the restaurant, tables can be 'touched' to select the table and link to the menu for food and drink orders. Table designs, names and positions can be updated and saved by using the Admin tab to enter the back dash.</li>
                        <li>Servers cannot access a table that already has orders on it from another server.</li>
                        <li>Tables that are in use will be red, while free tables will be green.</li>
                        <li>Table ownership is released when all seats have settled payments on the check, or if the last item on the check is deleted.</li>
                    </ul>
                    : null
                }

                {props.menuTabActive
                    ? <ul>
                        <li>This is the main area where orders are punched in to simulate sending to the kitchen or bar. Users can select the seat they wish to punch the items in on for future check organization, otherwise seat 1 will be assumed by default.</li>
                        <li>Pending orders will appear on the check in blue, this also simulates the functionality of unsent orders, thus servers could delete without the help of a manager, as nothing has been 'sent' so there is no potential product loss.</li>
                        <li>~Pending orders will currently be lost when switching tabs.~</li>
                        <li>Click on the item name to delete PENDING orders, pending orders which create a new seat can only be deleted if no other items are on the seat.</li>
                        <li>When manager override is active, SENT items on the check can be modified. This includes deletion, 25% / 50% / 100% discount application and removal, as well as QSA application and removal.</li>
                        <li>Attempting to delete an item with a discount will prompt a warning and a confirmation, as future data will account for discount totals and type.</li>
                        <li>If the last item on the table is deleted via manager authorization, table ownership is released.</li>
                        <li>New items can be added to the menu categories using the Admin tab and the back dash.</li>
                        <li>Stretch Goals:
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
                        <li>Use ADD NEW RECEIPT or REMOVE RECEIPT to populate receipts for checks to be split on to.</li>
                        <li>Remove receipt removes the highest numerical receipt and will delete all information on the receipt upon removal.</li>
                        <li>Click on the seat you want to transfer and select the target receipt number.</li>
                        <li>It is not possible to add more receipts that total number of guest seats.</li>
                        <li>A seat from the origin check can only be on one receipt, and cannot be repeated.</li>
                        <li>Click on any pending seperate seat on the receipt to remove it.</li>
                        <li>PRINT ALL RECEIPT to save the pending seats to each receipt, aka printing the checks out to give to guests.</li>
                        <li>Deleting seats from receipts, or removing receipts does not require manager auth as they represent the physical receipts that could just be thrown in the garbage when incorrect.</li>
                        <li>Use 'All On One' for a quick receipt generated as though the entire bill was going to be paid by one guest.</li>
                        <li>Use 'Split Total Evenly' to pre generate the math as though several guests want to pay equal amounts towards the bill.</li>
                    </ul>
                    : null
                }

                {props.paymentTabActive
                    ? <ul>
                        <li>Displays the receipts if they have been organized in the Check Tab.
                        </li>
                        <li>Click on a receipt to input the payment(s) and tip(s) for each receipt, these can consist of multiple fraction payments towards the receipt.</li>
                        <li>Once the receipt is saved it will change color to green while also showing payments currently saved waiting to be submitted. Clicking the receipt again will allow you to undo the settlement and update.</li>
                        <li>SUBMIT SETTLED PAYMENTS to complete payment process and store payment data. This will clean up any of the receipts as well as the seats they contain from the check. If there are no seats left, server ownership of the table will be removed so that anyone else can use it.</li>
                        <li>~Partially settling checks and then attemping to order more and re-separate on this check currently causes errors due the the sequence of receipts being out of order~</li>
                        <li>Stretch Goals: 
                            <br />
                            .
                        </li>
                    </ul>
                    : null
                }

                {props.summaryTabActive
                    ? <ul>
                        <li>
                            Displays all tables currently in use by the server for easy reference. Servers can select tables to order on similar to the table map by using CHANGE TABLE instead.
                        </li>
                        <li>Stretch Goals: 
                            <br />
                            Allow for the transfer of tables between servers. Allow for the transfer of items between seats. Select items to be repeated for another 'round'.
                        </li>
                    </ul>
                    : null
                }
            </div>

            <div>
                <h2>How to use the {
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
                </h2>

                {props.tableTabActive
                    ? <ul>
                        <li>
                            GET MANAGER AUTH
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            DEMO
                            <br />
                            - Button under construction. 
                        </li>
                        <li>
                            TEST
                            <br />
                            - Test buttons exist for coding console.log and has no user functionality. 
                        </li>
                        <li>
                            WELCOME
                            <br />
                            - Thank you message! 
                        </li>
                        <li>
                            INFO
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

                {props.menuTabActive
                    ? <ul>
                        <li>
                            GET MANAGER AUTH
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            "SEND" ORDER
                            <br />
                            - Store the pending orders to firebase, simulating sending orders to the kitchen or bar 
                        </li>
                        <li>
                            SEAT#?
                            <br />
                            - Select the seat number to order the item on. The number can be 1 or 2 digits, seat 1 will be assumed by default. 
                        </li>
                        <li>
                            MAIN MENU
                            <br />
                            - Return to the main directory of menu categories. 
                        </li>
                        <li>
                            CHANGE TABLE
                            <br />
                            - Change active table using the alphanumeric pad instead of TableMap. You cannot access tables that are already in use by another server. There is currently no logic to notify if searched table does not exist.
                        </li>
                        <li>
                            DEMO
                            <br />
                            - Under construction. 
                        </li>
                        <li>
                            INFO
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
                            GET MANAGER AUTH
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            "PRINT" ALL RECEIPT
                            <br />
                            - Confirm the seat separations and 'print' the checks, this stores the data to firebase. 
                        </li>
                        <li>
                            ADD NEW RECEIPT
                            <br />
                            - Add an additional receipt to seperate the original check on to. 
                        </li>
                        <li>
                            REMOVE RECEIPT
                            <br />
                            - Remove an un-needed additional seperate receipt. This will delete all information on the receipt. Removes the highest numerical receipt.
                        </li>
                        <li>
                            ALL ON ONE RECEIPT
                            <br />
                            - Create a receipt with all seats on one, rather than separating seats.
                        </li>
                        <li>
                            SPLIT TOTAL EVENLY
                            <br />
                            - Create one receipt with math completed for total divided by number of guests who will pay.
                        </li>
                        <li>
                            CHANGE TABLE
                            <br />
                            - Change active table using the alphanumeric pad instead of TableMap. You cannot access tables that are already in use by another server. There is currently no logic to notify if searched table does not exist.
                        </li>
                        <li>
                            TEST
                            <br />
                            - Test buttons exist for coding console.log and has no user functionality. 
                        </li>
                        <li>
                            INFO
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
                            GET MANAGER AUTH
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            SUBMIT SETTLED PAYMENTS
                            <br />
                            Completes 'payments', cleaning up the orders and receipts of settled payments and storing to payment database. 
                        </li>
                        <li>
                            DEMO
                            <br />
                            - Button under construction. 
                        </li>
                        <li>
                            TEST
                            <br />
                            - Test buttons exist for coding console.log and has no user functionality. 
                        </li>
                        <li>
                            INFO
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
                            GET MANAGER AUTH
                            <br />
                            - Opens the Keypad, enter the manager combo for additional functionality, becomes CANCEL MGR to remove access level. Demo Code available on Key Pad. Currently allows edits of items on checks in the Menu Tab. In the inspiration GUI managers had to remember to cancel their access level when finished. 
                        </li>
                        <li>
                            START NEW TABLE
                            <br />
                            - Opens the alphanumeric pad for a server to enter the name of the table they would like to start ordering on, it currently does not notify if the table does not exist on the map. 
                        </li>
                        <li>
                            DEMO
                            <br />
                            - Button under construction. 
                        </li>
                        <li>
                            TEST
                            <br />
                            - Test buttons exist for coding console.log and has no user functionality. 
                        </li>
                        <li>
                            INFO
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