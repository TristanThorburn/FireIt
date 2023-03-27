const BackDashHelp = (props) => {

    const handleCloseModal = () => {
        if(props.menuEntryHelp === true){
            props.setMenuEntryHelp(false)
        }
        if(props.employeeDataHelp === true){
            props.setEmployeeDataHelp(false)
        }
        if(props.tableSetupHelp === true){
            props.setTableSetupHelp(false)
        }
        if(props.paymentDataHelp === true){
            props.setPaymentDataHelp(false)
        }
        if(props.settingsHelp === true){
            props.setSettingsHelp(false)
        }
        if(props.scheduleHelp === true){
            props.setScheduleHelp(false)
        }
        if (props.loginHelp === true) {
            props.setLoginHelp(false)
        }
    }

    return(
        <div className='popUpModal'>
            <div className='backDashHelpContainer'>

                <button onClick={handleCloseModal} className='closePad'>Exit Help</button>
{/* USER GUIDE */}
                <div className='backUserGuideContainer'>
                    <div>
                        <h2>How to use &nbsp;
                            {props.loginHelp
                                ? 'Fire It Login'
                                : null
                            }
                            {props.menuEntryHelp
                                ? 'Menu Entry Setup'
                                : null
                            }
                            {props.employeeDataHelp
                                ? 'Employee Data'
                                : null
                            }
                            {props.tableSetupHelp
                                ? 'Table Setup'
                                : null
                            }
                            {props.paymentDataHelp
                                ? 'Payment Data'
                                : null
                            }
                            {props.settingsHelp
                                ? 'Settings'
                                : null
                            }
                            {props.scheduleHelp
                                ? 'Schedule'
                                : null
                            }
                        </h2>
                        {props.loginHelp
                            ? <ul>
                                <li>Click the 4 digit combo of a firebase authorized user set up in the Employee Data section, or use the demo user listed.</li>
                                <li>The ⛔ button will reset the punch in combo.</li>
                                <li>The confirm 🔥 will appear after reaching the 4 digit requirement.</li>
                                <li>Click on the X on the top of they keypad to return to the previous step of log in.</li>
                                <li>Once logged in the user is navigated to a 'Front' dashboard that represets the terminal view for the average server.</li>
                                <li>Along the top navigator of 'tabs' the ADMIN tab nagivates to a 'Back' dashboard which represents more of the view a manager may use to set up various aspects of the front view.</li>
                            </ul>
                            : null
                        }
                        {props.menuEntryHelp
                            ? <ul>
                                <li>Use the navigation bar to filter menu items between categories and sub categories</li>
                                <li>New Item button allows you to create a new menu entry to be saved to the database, at minimum a name is required to create an item.</li>
                                <li>Leaving some categories blank can cause issues with population in the Menu Tab screen in the front dash. This is intentional as part of my job was trouble shooting menu items with no cost for example.</li>
                                <li>There is no limit to the number of items that can be created.</li>
                                <li>When an item is selected from the list its' properties can be updated or deleted.</li>
                                <li>There is also an option to clone the selected item, this was a time saving feature of the inspiration GUI which would for example, allow you to easily mass populate a beer bottle list with similar properties, only requiring some name changing.</li>
                                <li>Several of the form categories are for future stretch goals.</li>
                            </ul>
                            : null
                        }
                        {props.employeeDataHelp
                            ? <ul>
                                <li>Begin by selecting an employee from the list or creating a new employee.</li>
                                <li>You cannot update, or create a new employee if the employee number or user ID is already in use to prevent duplicates, a name is also required.</li>
                                <li>UserID and UserPW must be 4 characters.</li>
                                <li>The email field is auto populated at this time to enable firebase authorization.</li>
                                <li>A second form will populate on the bottom for new employees who are created and are not firebase activated, they must be at this point in order to be a new server using the app.</li>
                                <li>When a new user is activated to firebase, the current user is logged out, as currently authorizing a new employee will update which user firebase considers to be active.</li>
                                <li>Several data fields exist for future stretch goals, included in those are firebase authorization without forced log out, or simply refactoring so that only ADMIN users require firebase auth.</li>
                            </ul>
                            : null
                        }
                        {props.tableSetupHelp
                            ? <ul>
                                <li>To begin select 'Update Map.'</li>
                                <li>Add a new table, or select the table on the map you wish to modify.</li>
                                <li>You cannot create a new table if it already exists on the map.</li>
                                <li>Enable reposition to drag the tables to a new location, when you are finished, save the table positions so the updates will appear on the Table Tab screen</li>
                                <li>Selected tables can also have their style changed between the 4 current styles.</li>
                                <li>Stretch goals include improvements to the table repositioning smoothness as well as including more styles</li>
                            </ul>
                            : null
                        }
                        {props.paymentDataHelp
                            ? <ul>
                                <li>This section will be where you see the payments history for servers.</li>
                            </ul>
                            : null
                        }
                        {props.scheduleHelp
                            ? <ul>
                                <li>This section will be used create an employee schedule.</li>
                            </ul>
                            : null
                        }
                        {props.settingsHelp
                            ? <ul>
                                <li>This section will be used to update misc data.</li>
                            </ul>
                            : null
                        }
                    </div>
{/* CODE INSIGHTS */}
                    <div className='backCodeInsights'>
                        <h2>Code insights for &nbsp;
                            {props.loginHelp
                                ? 'Fire It Login'
                                : null
                            }
                            {props.menuEntryHelp
                                ? 'Menu Entry Setup'
                                : null
                            }
                            {props.employeeDataHelp
                                ? 'Employee Data'
                                : null
                            }
                            {props.tableSetupHelp
                                ? 'Table Setup'
                                : null
                            }
                            {props.paymentDataHelp
                                ? 'Payment Data'
                                : null
                            }
                            {props.settingsHelp
                                ? 'Settings'
                                : null
                            }
                            {props.scheduleHelp
                                ? 'Schedule'
                                : null
                            }
                        </h2>

                        {props.loginHelp
                            ?  <ul>
                                <li>The login components were the first created for this project.</li>
                                <li>Clicking the keys gets the target of the events text content and pushes it to an array.</li>
                                <li>Both the login and password push additional content to allow for firebase authorization, such as adding @fireit.ca to create a fake email address.</li>
                                <li>Each index of the array is joined and the commas are replaced.</li>
                                <li>The clear button resets the array variable to be empty again.</li>
                                <li>Submitting with the password logs in through firebase and navigates to the Front Dash, which is nested in a Private Route.</li>
                                <li>The log in creates an authorization context as well as an employee context based off the data filled in using the Employee Data section.</li>
                                <li>The user, password and admin key pads each exist as their own component. In the future I will combine them into the 'server key pad' component that other sections of the app use.</li>
                                <li>Unlike the user and password keypads rather than firebase auth, the admin just checks that the array combo matches a specific string when used inside the Fire It app as a logged in user.</li>
                            </ul>
                            : null
                        }
                        {props.menuEntryHelp
                            ? <ul>
                                <li><h3>Data Display:</h3></li>
                                <li>The Menu Entry Setup navigation bars change string states to determine what to display, the states are also prop drilled through the components to the form, where they are used to determine the collection reference to search in firestore, first to populate the items list then specify which document to search for when an item is clicked.</li>
                                <li>In the begining this was done with true/false states, but as I started to add more data categories I eventually changed them to strings as the list of states was not very DRY. </li>
                                <li>When an item is selected from the list its' data is used to populate placeholders for any values that exist.</li>
                                <li>I did want these place holders to be able to have the selections or radio buttons pre chosen from the data like the placeholders, but it was causing issues with updates to the item, and is something I plan to review later. For now I opted to give them labels to display the current data.</li>
                                <li>I originally found a solution to reset the forum inputs by query selecting them all and then setting them to default states, such as checked = false, I later learned to just query the form itself and .reset()</li>
                                <li><h3>Item Manipulation:</h3></li>
                                <li>Clicking any item gets the e.target.id which is generated from firestores auto id, rather than being setDoc like in other areas of this app, menu items are created with addDoc.</li>
                                <li>Adding items collects values selected by the user, or useRefs for text. A name must exist to create an item, and for now if no screen name is given the document will upload with the screen name the same as the item name.</li>
                                <li>The update doc checks for any changes on the individual form values so that only the updated one is changed in firestore.</li>
                                <li>Cloning items was used in the Squirrel UI so I opted to recreate it as well as adding many new items myself was going to be tedious. Selecting to clone the item copies all the information for the item and creates a new one with -CLONE added to the name, the user can then update. This would simplify adding for example several burgers which would be fundamentally the same but have a different name.</li>
                                <li>As stated in the user guide, several of these data points for items would be for use beyond the project's MVP.</li>
                            </ul>
                            : null
                        }
                        {props.employeeDataHelp
                            ? <ul>
                                <li>As it was made after the Menu Entry Setup section, much of the Employee Data form's logic is replicated from there.</li>
                                <li>Employees are added with setDocs to allow for the document id to match the employee number.</li>
                                <li>A useEffect watches if changes in employee number or userID match one that is already in use to prevent duplicates. I later updated this to also allow for blank userIDs.</li>
                                <li>I opted to update the form to block deletions on users who have been activated through Firebase for now. The previously activated combo would still be capable of logging in to the app, which would crash due to no longer finding matching employee data credentials.</li>
                                <li>From my understanding Firebase admin sdk would be required to delete authorized users through the app and not the firebase console, so that may be a stretch goal, otherwise not finding matching employee data for the employeeContext could cause an alert and log out.</li>
                                <li>Employee Firebase activation starts with a useEffect watching the email for the selected employee and running fetchSignInMethodsForEmail comparing the length for greater than zero.This sets the state to prevent activated employees from being deleted. The activation component required props to be destructured to limit the conditions array.</li>
                                <li>Because creating Firebase users also logs you in, to prevent errors or user confusion they are logged out upon 'activation'. This has a side benefit of bringing the user directly to the log in to use the created employee.</li>
                            </ul>
                            : null
                        }
                        {props.tableSetupHelp
                            ? <ul>
                                <li>Coming Soon</li>
                            </ul>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackDashHelp;