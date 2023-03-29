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
                        ? <div className='padError'>Manager authorization is required to edit items that have been sent to the kitchen or bar.
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
                        ? <div className='padError'>Deleting firebase authorized users can cause errors if other users still use this ID to log in. Contact creator to delete.
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
{/* TABLE ERRORS */}
                    {props.fireItAlert === 'TableMap no table'
                        ? <div className='padError'>Please select the table you wish to edit.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'TableMap table in use'
                        ? <div className='padError'>This table is in use by employee #{props.showTableOwner}.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'TableMap delete table in use'
                        ? <div className='padError'>This table is currently in use by employee #{props.showTableOwner} and cannot be deleted.
                        </div>
                        : null
                    }
{/* CHECK TAB ERRORS */}
                    {props.fireItAlert === 'CheckTab less than zero'
                        ? <div className='padError'>You cannot have less than zero checks.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab more than ten'
                        ? <div className='padError'>The current limit for number of additional separated checks is 10.
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
{/* PAYMENT ERRORS */}
                    {props.fireItAlert === 'PaymentTab undo settled payment'
                        ? <div className='padError'>
                            <p>Would you like to undo this payment?</p>
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
                </article>
            </div>
        </div>
    )
}

export default FireItAlert;