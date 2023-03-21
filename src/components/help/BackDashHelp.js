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
        else {
            props.setLoginHelp(false)
        }
    }

    return(
        <div className='popUpModal'>
            <div className='backDashHelpContainer'>

                <button onClick={handleCloseModal} className='closePad'>Exit Help</button>

                <div className='backUserGuideContainer'>
                    <div>
                        <h3>How to use &nbsp;
                            {props.menuEntryHelp
                                ? 'Menu Entry Setup'
                                : 'Fire It Login'
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
                        </h3>
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
                            : <ul>
                                <li>Click the 4 digit combo of a firebase authorized user set up in the Employee Data section, or use the demo user listed.</li>
                                <li>The ⛔ button will reset the punch in combo</li>
                                <li>The confirm 🔥 will appear after reaching the 4 digit requirement.</li>
                                <li>Click on the X on the top of they keypad to return to the previous step of log in.</li>
                            </ul>
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

                    <div>
                        <h3>Code insights for &nbsp;
                            {props.menuEntryHelp
                                ? 'Menu Entry Setup'
                                : 'Fire It Login'
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
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackDashHelp;