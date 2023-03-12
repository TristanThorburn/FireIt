const FireItAlert = (props) => {
    const handleCloseModal = () => {
        props.setFireItAlert('')
    }

    return(
        <div className='popUpModal'>
            <div className='fireItAlert'>
                <button onClick={handleCloseModal} className='closePad'>X</button>
                <div className='infoButton'>
                    <button>🔥</button>
                    <p>FireIt Alert:</p>
                </div>
                <article>
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
                    {props.fireItAlert === 'EmployeeDataForm duplicate id'
                        ? <div className='padError'>You cannot create or update an employee using an Employee # or User ID that is already in use.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'TableMap no table'
                        ? <div className='padError'>Please select the table you wish to edit.
                        </div>
                        : null
                    }
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
                        ? <div className='padError'>Receipt not found. Use ADD SEPERATE to make sure the number of split receipts matches your search.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'CheckTab data error' || 'MenuTab data error'
                        ? <div className='padError'>Sorry, no data was found, please try again.
                        </div>
                        : null
                    }
                </article>
            </div>
        </div>
    )
}

export default FireItAlert;