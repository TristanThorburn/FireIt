const FireItAlert = (props) => {
    const handleCloseModal = () => {
        if(props.showTableOwner !== undefined && props.showTableOwner !== ''){
            props.setShowTableOwner('')
        }
        props.setFireItAlert('')
    }

    const handleConfirmAlert = () => {
        if(props.checkTabActive === true){
            props.setConfirmSeatRemove(true)
            props.setFireItAlert('')
        }
        if(props.paymentTabActive === true){
            props.setUndoSettledPayment(true)
            props.setFireItAlert('')
        }
    }

    const handleCancelAlert = () => {
        if(props.checkTabActive === true){
            props.setConfirmSeatRemove(false)
            props.setFireItAlert('')
        }
        if(props.paymentTabActive === true){
            props.setUndoSettledPayment(false)
            props.setFireItAlert('')
        }
    }

    return(
        <div className='popUpModal'>
            <div className='fireItAlert'>
                <button onClick={handleCloseModal} className='closePad'>X</button>
                <button className='infoButton'>
                    🔥
                    <p>FireIt Alert:</p>
                </button>
                <article>
{/* CHECK MODIFY ERRORS*/}
                    {props.fireItAlert === 'TableCheck seat delete'
                        ? <div className='padError'>Items that create a new seat cannot be deleted until other items on the created seat are removed first.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'TableCheck edit sent'
                        ? <div className='padError'>Manager authorization is required to edit items that have been 'sent' to the kitchen or bar. Click GET MANAGER AUTH, bottom left.
                        </div>
                        : null
                    }
{/* EMPLOYEE DATA ERRORS*/}
                    {props.fireItAlert === 'EmployeeDataForm duplicate id'
                        ? <div className='padError'>You cannot create or update an employee using an Employee # or User ID that is already in use.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'EmployeeDataForm delete demo'
                        ? <div className='padError'>Cannot delete this demo user.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'EmployeeDataForm update demo'
                        ? <div className='padError'>Cannot update this demo user.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'EmployeeDataForm delete authed'
                        ? <div className='padError'>Employee must be deactivated before deleting.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'EmployeeDataForm change auth user'
                        ? <div className='padError'>Cannot change the User ID or User PW for firebase authorized users.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'EmployeeDataForm missing name number'
                        ? <div className='padError'>Adding a new employee requires a numerical employee number and a first name.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'EmployeeDataForm user credentials require numbers'
                        ? <div className='padError'>Employee User ID and Password must be numerical in order to log in.
                        </div>
                        : null
                    }
{/* TABLE ERRORS */}
                    {props.fireItAlert === 'FireIt no table'
                        ? <div className='padError'>No table selected.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'TableMap no table'
                        ? <div className='padError'>Please select the table you wish to edit.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'TableMap table in use'
                        ? <div className='padError'>This table is in use by {props.showTableOwner}.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'TableMap delete table in use'
                        ? <div className='padError'>This table is currently in use by {props.showTableOwner} and cannot be deleted.
                        </div>
                        : null
                    }
{/* CHECK TAB ERRORS */}
                    {props.fireItAlert === 'CheckTab less than zero'
                        ? <div className='padError'>You cannot have less than zero checks.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab more receipts than seats'
                        ? <div className='padError'>There are not enough seats on the check to populate any more receipts.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab receipt undefined'
                        ? <div className='padError'>Receipt not found. Use ADD RECEIPT to make sure the number of split receipts matches your search.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab seat exists'
                        ? <div className='padError'>This seat already exists on a receipt.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab delete sent seat'
                        ? <div className='padError'>
                            <p>Are you sure you want to delete this seat?</p>
                            <div className='fireItAlertConfirmContainer'>
                                <button 
                                    onClick={handleConfirmAlert} 
                                    className='doAction'
                                    >Delete
                                </button>
                                <button 
                                    onClick={handleCancelAlert}
                                    className='dontDoAction'
                                    >Cancel
                                </button>
                            </div>
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab cancel all on one'
                        ? <div className='padError'>Cancel 'All On One' to manually separate seats on to receipts yourself, or to split the check evenly.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab delete all or split'
                        ? <div className='padError'>This is a combined receipt. Use 'Remove Receipt' button to delete 'All On One' or 'Split Even' receipts, and then you can re-separate by seat.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab no seats'
                        ? <div className='padError'>Nothing exists on this check to separate or print.
                        </div>
                        : null
                    }
{/* PAYMENT ERRORS */}
                    {props.fireItAlert === 'PaymentTab undo settled payment'
                        ? <div className='padError'>
                            <p>Remove receipts' saved payment info?</p>
                            <div className='fireItAlertConfirmContainer'>
                                <button 
                                    onClick={handleConfirmAlert} 
                                    className='doAction'
                                    >Remove
                                </button>
                                <button 
                                    onClick={handleCancelAlert}
                                    className='dontDoAction'
                                    >Cancel
                                </button>
                            </div>
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'PaymentTab no settled receipts'
                        ? <div className='padError'>There are no payments saved to any receipts, click on one to begin.
                        </div>
                        : null
                    }
                </article>
            </div>
        </div>
    )
}

export default FireItAlert;