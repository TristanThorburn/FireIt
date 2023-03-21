const FrontCodeDetails = (props) => {
    // tableTabActive={props.tableTabActive}
    // menuTabActive={props.menuTabActive}
    // checkTabActive={props.checkTabActive}
    // paymentTabActive={props.paymentTabActive}
    // summaryTabActive={props.summaryTabActive}

    return(
        <div className='frontCodeInsights'>
            <h2>
                {props.tableTabActive
                    ? 'Table Tab Code Insights'
                    : props.menuTabActive
                        ? 'Menu Tab Code Insights'
                        : 'Code Info under construction'
                }
            </h2>

            {props.tableTabActive
                ? <ul>
                    <li>The Table Tab uses the table map component which can be editted in the back dash.</li>
                    <li>The table map display is populated from a get snapshot from the firebase database, and the data such as the name is used to determine how and where the tables are displayed.</li>
                    <li>The pixel locations saved from the back dash adjustments are used to style the location on the map absolutely.</li>
                    <li>All tables have a generic table for common styling, and a second class is added from the database to determine additional looks such as the circle table. The default is square.</li>
                    <li>Each table also as a data component for server ownership, based on employee number. If the employee number from the context doesnt match that of the tables ownership it cannot be used by the current server.</li>
                    <li>Attempting to access a table that doesnt belong to the current user toggles the custom Fire It Alert component to explain lack of ownership.</li>
                    <li>Table ownership is given after the first order is made, and removed after all payments on the table are settled.</li>
                    <li>Clicking on a table while Table Tab is active sets the context table to the one selected and navigates to the menu screen so that an order can be made.</li>
                    <li>Prior to understanding event bubbling and capture, both the table and the text inside had seperate on click logic to set the context table. I later changed to on click capture on the table alone. Thanks Wes Bos!</li>
                </ul>
                : null
            }

            {props.menuTabActive
                ? <ul>
                    <li><h3>Main Menu Item and Check Logic:</h3></li>
                    <li>The main aspect of the Menu Tab is a container that filters through which menu components to display based off a string state.</li>
                    <li>The subcategories are populated via getDocsFromCache to save on reads, as currently nothing in their components require a live refresh.</li>
                    <li>Clicking on any menu item appends a copy of the item and its data through a state on to the table's check component.</li>
                    <li>Originally clicking on an item was not temporary and automatically uploaded the information to the check on firebase. Prior to demoing this to some of my hospitality friends I did not realize that firebase array union would not allow for additions of duplicated items on the same check. Because limitations to duplicates, and lacking the pending order mechanic was not authentic to the logic I was trying to recreate, I refactored the code to the append version.</li>
                    <li>The initial solution to deal with duplicate orders got the data from firebase and stored it unshift() to a new array, and then added the new item before uploading. I made a mistake with one of my if statments which was also causing pending orders which existed on a newly created seat from uploading. Regardless while reviewing documentation I have for the original stystems GUI, I was reminded that each item order was time stamped. I used Date.now().toString() to add data for the time of punch in, this allowed for repeat orders of the same item as it would prevent the objects in the array union from ever matching.</li>
                    <li>I had to create 5 different options of how to append the orders to the check...
                        <br />
                        1.The user has not selected any seat, and no order data exists as this is the start of an order. Create a pending seat 1 and set seat 1 to the current default until changed for addition items.
                        <br />
                        2.The user has not selected a desired seat, so default to seat 1, since it does already exist on the check from firebase.
                        <br />
                        3.The user has chosen a seat to add the order to, and it already exists in firebase, thus it also exists on the check.
                        <br />
                        4.The user has selected a seat which is not currently in the firebase data so create a new pending seat for the item and any additional items for this seat.
                        <br />
                        5.The user selected seat does not exist in firebase, but a new pending seat has already been created by a previous item order.
                        </li>
                    <li>The pending items also contain my first use of useCallback to have event listeners that check for clicks on the dynamically created pending items. Two different versions were required depending on if the pending order created a new pending seat, or was simply added to one from firebase.</li>
                    <li>I orginally wanted this all to happen through components but I had difficulty finding a way to 'append' it to the correct seat given the previous 5 possible variables of how I needed it to appear. To resolve this for now I used vanilla JS appending logic.</li>
                    <li><h3>Lower Nav Bar:</h3></li>
                    <li>MGR OVER allows for a key pad pin similar to the admin. A manager context is enabled allowing users to click on sent items and modify them. Clicking on items to modify them without this context triggers an alert.</li>
                    <li>Adding a promo to the item collects its' specific data and removes it from the array. A new version is added indicating the discounted % on the item name with a new price calculated based on the %. Undoing the promo reverses these steps using conditionals. Because the data for the item must be a match, adding a promo closes the modify modal as the state contains data for the old item and will no longer match the changes made by the promo and thus cannot be changed again. The work around forces a new click on the item to update the item data stored in state.</li>
                    <li>Managers can also delete sent items, if they contain a discount it will trigger the Fire It Alert component to notify there is already a discount on the item prior to deleting. This exists as a reminder that if the item was already discounted the pretend guest would have already received it, and deletion would remove records of the loss. In future I would like to create 'loss' data.</li>
                    <li>The SEND ORDER button on the lower nav bar collects the data from all the pending orders to updateDoc on firestore. This also sets the table ownership to the current server 'employeeContext.employeeNumber' . Sending the orders navigates the user back to the table map so they could potentially select another table. This has the added side effect of clearing the pending items. In future I would like to have these pending orders saved and deleted when sent to the official check, using strageties I later found when working on the Payments Tab.</li>
                    <li>SEAT #? Opens the server keypad component, where a state can be set/updated to determine a target seat for orders to be punched in. A useEffect keeps track of the existance of seats in the firestore database when they changed using this mechanic. To reduce reads in the future I'll change this to query data on the tables check.</li>
                    <li>CHNG TBL opens an alpha numeric keypad that allows 'punch' logic similar to the numeric keypad. The inputs are joined together, set to lower case and commas and spaces are removed. While the space button does exist on this pad, table ids created in the 'back' dash already removed spaces. On submit the input is filtered through the tables the server already owns for a match, if this fails it will check to see if the current owner of the table is 'none'. If both fail the user is alerted another sever has ownership of the table.</li>
                    <li>MAIN MENU reverts the string state for menu categories back to the main 'directory'</li>
                </ul>
                : null
            }
        </div>
    )
}

export default FrontCodeDetails;