const FireItAlert = (props) => {
    const handleCloseModal = () => {
        props.setFireItAlert('')
    }

    return(
        <div className='popUpModal'>
            <div className='fireItAlert'>
                <button onClick={handleCloseModal} className='closePad'>X</button>
                <header className='infoButton'>
                    <button>🔥</button>
                    <p>FireIt Alert:</p>
                </header>
                <article>
                    {props.fireItAlert === 'tableCheck seat delete'
                        ? <div className='padError'>Items that create a new seat cannot be deleted until other items on the created seat are removed first.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'tableCheck edit sent'
                        ? <div className='padError'>Manager authorization is required to edit items that have been sent to the kitchen or bar.
                        </div>
                        : null
                    }
                    {props.fireItAlert === 'EmployeeDataForm duplicate id'
                        ? <div className='padError'>You cannot create or update an employee using an Employee # or User ID that is already in use.
                        </div>
                        : null
                    }
                </article>
            </div>
        </div>
    )
}

export default FireItAlert;