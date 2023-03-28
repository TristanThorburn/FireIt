import { useRef, useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import EmployeeFirebase from './EmployeeFirebase';

const EmployeeDataForm = (props) => {
    const [ employeeData, setEmployeeData ] = useState()
    const employeeNumberRef = useRef('');
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const userIDRef = useRef('');
    const userPWRef = useRef('');
    const SINRef = useRef('');
    const dobRef = useRef('');
    const streetRef = useRef('');
    const cityRef = useRef('');
    const provinceRef = useRef('');
    const postalCodeRef = useRef('');
    const phoneRef = useRef('');
    // const emailRef = useRef('')
    const firstDayRef = useRef('');
    const lastDayRef = useRef('');
    const notesRef = useRef('');
    const [ addEmployee, setAddEmployee ] = useState(false);
    const [ updateEmployee, setUpdateEmployee ] = useState(false);
    const [ firebaseAuthWarning, setFirebaseAuthWarning ] = useState(false);

    // Get data for selected employee.
    useEffect(() => {
        if(props.id === ''){
            setEmployeeData('')
        }
        if(props.id !== ''){
            const docRef = doc(db, 'employees', props.id)
            getDoc(docRef).then((doc) => setEmployeeData(doc.data())).catch(error => console.log(error))
        }
    },[props.id])

    // Clear form info on submit
    useEffect(() => {
        document.getElementById('employeeForm').reset(); 
    },[props.id, props.newEmployee])
    
    // ADD employee to database if checks for non duplicate # and ID have passed
    useEffect(() => {        
        if(addEmployee){
            const newEmployeeRef = doc(
                db, 'employees', `${employeeNumberRef.current.value}`)
            setDoc(newEmployeeRef, {
                employeeNumber:employeeNumberRef.current.value,
                firstName:firstNameRef.current.value,
                lastName:lastNameRef.current.value,
                userID:userIDRef.current.value,
                userPW:userPWRef.current.value,
                sin:SINRef.current.value,
                dob:dobRef.current.value,
                street:streetRef.current.value,
                city:cityRef.current.value,
                province:provinceRef.current.value,
                postalCode:postalCodeRef.current.value,
                phone:phoneRef.current.value,
                email:userIDRef.current.value + '@fireit.ca',
                firstDay:firstDayRef.current.value,
                lastDay:lastDayRef.current.value,
                notes:notesRef.current.value,
            });
            props.setNewEmployee(false);
            setAddEmployee(false)
            document.getElementById('employeeForm').reset(); 
        }
    },[addEmployee, props])

    // UPDATE employee if checks for non duplicate # and ID have passed
    useEffect(() => {
        if(updateEmployee){
            const docRef = doc(db, 'employees', props.id)

            if(employeeNumberRef.current.value !== ''){
                updateDoc(docRef, {
                    employeeNumber:employeeNumberRef.current.value
                })
            }
            if(firstNameRef.current.value !== ''){
                updateDoc(docRef, {
                    firstName:firstNameRef.current.value
                })
            }
            if(lastNameRef.current.value !== ''){
                updateDoc(docRef, {
                    lastName:lastNameRef.current.value
                })
            }
            if(userIDRef.current.value !== '' && firebaseAuthWarning === false){
                updateDoc(docRef, {
                    userID:userIDRef.current.value,
                    email:userIDRef.current.value + '@fireit.ca'
                })
            }
            if(userIDRef.current.value !== '' && firebaseAuthWarning === true){
                props.setFireItAlert('EmployeeDataForm change auth user')
            }
            if(userPWRef.current.value !== '' && firebaseAuthWarning === false){
                updateDoc(docRef, {
                    userPW:userPWRef.current.value
                })
            }
            if(userPWRef.current.value !== '' && firebaseAuthWarning === true){
                props.setFireItAlert('EmployeeDataForm change auth user')
            }
            if(SINRef.current.value !== ''){
                updateDoc(docRef, {
                    sin:SINRef.current.value
                })
            }
            if(dobRef.current.value !== ''){
                updateDoc(docRef, {
                    dob:dobRef.current.value
                })
            }
            if(streetRef.current.value !== ''){
                updateDoc(docRef, {
                    street:streetRef.current.value
                })
            }
            if(cityRef.current.value !== ''){
                updateDoc(docRef, {
                    city:cityRef.current.value
                })
            }
            if(provinceRef.current.value !== ''){
                updateDoc(docRef, {
                    province:provinceRef.current.value
                })
            }
            if(postalCodeRef.current.value !== ''){
                updateDoc(docRef, {
                    postalCode:postalCodeRef.current.value
                })
            }
            if(phoneRef.current.value !== ''){
                updateDoc(docRef, {
                    phone:phoneRef.current.value
                })
            }
            // if(emailRef.current.value !== ''){
            //     updateDoc(docRef, {
            //         email:emailRef.current.value
            //     })
            // }
            if(firstDayRef.current.value !== ''){
                updateDoc(docRef, {
                    firstDay:firstDayRef.current.value
                })
            }
            if(lastDayRef.current.value !== ''){
                updateDoc(docRef, {
                    lastDay:lastDayRef.current.value
                })
            }
            if(notesRef.current.value !== ''){
                updateDoc(docRef, {
                    notes:notesRef.current.value
                })
            }
            props.setSelectedEmployee('');
            setUpdateEmployee(false)
            document.getElementById('employeeForm').reset(); 
        }
    }, [updateEmployee, props, firebaseAuthWarning])

    // Clear employee data when new employee is selected
    useEffect(() => {
        if(props.newEmployee === true){
            setEmployeeData('')
        }
    }, [props.newEmployee])

    const handleAddEmployee = (e) => {
        e.preventDefault()

        if( firstNameRef.current.value === '' || employeeNumberRef.current.value === ''){
            props.setFireItAlert('EmployeeDataForm missing name number')
        } else {
            let numberList = []
            let idList = []
            const employeeContainer = document.querySelector('.employeeDataContainer')
            const employeeNumbers = employeeContainer.querySelectorAll('[data-empnumber]')
            const employeeIds = employeeContainer.querySelectorAll('[data-empuser]')
            employeeNumbers.forEach(number => {
                numberList.push(number.dataset.empnumber)
            })
            employeeIds.forEach(id => {
                if(id.dataset.empuser !== ''){
                    idList.push(id.dataset.empuser)
                }
            })
            const numberTest = numberList.filter(number => number === employeeNumberRef.current.value)
            const idTest = idList.filter(id => id === userIDRef.current.value)
            // setTryAddEmployee(true)
            if( numberTest.length === 0 && idTest.length === 0){
                setAddEmployee(true)
            } else {
                props.setFireItAlert('EmployeeDataForm duplicate id')
            }
        }
    }

    const handleUpdateEmployee = (e) => {
        e.preventDefault()

        if(props.id === '1'){
            props.setFireItAlert('EmployeeDataForm update demo')
        }

        if(props.id !== '1'){
            let numberList = []
            let idList = []
            const employeeContainer = document.querySelector('.employeeDataContainer')
            const employeeNumbers = employeeContainer.querySelectorAll('[data-empnumber]')
            const employeeIds = employeeContainer.querySelectorAll('[data-empuser]')
            employeeNumbers.forEach(number => {
                if(number.dataset.empumber !== ''){
                    numberList.push(number.dataset.empnumber)
                }
            })
            employeeIds.forEach(id => {
                if(id.dataset.empuser !== ''){
                    idList.push(id.dataset.empuser)
                }
            })
            const numberTest = numberList.filter(number => number === employeeNumberRef.current.value)
            const idTest = idList.filter(id => id === userIDRef.current.value)
            if( numberTest.length === 0 && idTest.length === 0){
                setUpdateEmployee(true)
            } else {
                props.setFireItAlert('EmployeeDataForm duplicate id')
            }
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const docRef = doc(db, 'employees', props.id)

        if(props.id === '1'){
            props.setFireItAlert('EmployeeDataForm delete demo')
        }

        if(props.id !== '1' && firebaseAuthWarning === true){
            props.setFireItAlert('EmployeeDataForm delete authed')
        }
        
        else if(props.id !== '1' && props.id !== '' && firebaseAuthWarning === false){
            deleteDoc(docRef)
            setEmployeeData('')
            props.setSelectedEmployee('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <section>
            <form className='employeeForm' id='employeeForm' onSubmit={handleSubmit}>
            {/* Employee # */}
                <div>
                    <label htmlFor='employeeNumber'>Employee #</label>
                    <input
                        id='employeeNumber'
                        name='employeeNumber'
                        type='number'
                        ref={employeeNumberRef}
                        placeholder={employeeData?.employeeNumber}
                        />
                </div>
            {/* First Name */}
                <div>
                    <label htmlFor='firstName'>First Name</label>
                    <input  
                        id='firstName'
                        name='firstName'
                        type='text'
                        ref={firstNameRef}
                        placeholder={employeeData?.firstName}
                        />
                </div>
            {/* Last Name */}
                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        id='lastName'
                        name='lastName'
                        type='text'
                        ref={lastNameRef}
                        placeholder={employeeData?.lastName}
                        />
                </div>
            {/* User ID */}
                <div>
                    <label htmlFor='userID'>User ID (4 Digit)</label>
                    <input
                        id='userID'
                        name='userID'
                        type='text'
                        maxLength='4'
                        ref={userIDRef}
                        placeholder={employeeData?.userID}
                        />
                </div>
            {/* User PW */}
                <div>
                    <label htmlFor='userPW'>User Password (4 Digit )</label>
                    <input
                        id='userPW'
                        name='userPW'
                        type='text'
                        maxLength='4'
                        ref={userPWRef}
                        placeholder={employeeData?.userPW}
                        />
                </div>
            {/* SIN */}
                <div>
                    <label htmlFor='SIN'>SIN</label>
                    <input
                        id='SIN'
                        name='SIN'
                        type='text'
                        ref={SINRef}
                        placeholder={employeeData?.sin}
                        />
                </div>
            {/* DOB */}
                <div className='employeeFormCalendar'>
                    <div>
                        <label htmlFor='dob'>Date of Birth</label>
                        <input
                            id='dob'
                            name='dob'
                            type='date'
                            ref={dobRef}
                            />
                    </div>
                    <p>Saved: {employeeData?.dob}</p>
                </div>
            {/* Street */}
                <div>
                    <label htmlFor='street'>Street</label>
                    <input
                        id='street'
                        name='street'
                        type='text'
                        ref={streetRef}
                        placeholder={employeeData?.street}
                        />
                </div>
            {/* City */}
                <div>
                    <label htmlFor='city'>City</label>
                    <input
                        id='city'
                        name='city'
                        type='text'
                        ref={cityRef}
                        placeholder={employeeData?.city}
                        />
                </div>
            {/* Province */}
                <div>
                    <label htmlFor='province'>Province</label>
                    <input
                        id='province'
                        name='province'
                        type='text'
                        ref={provinceRef}
                        placeholder={employeeData?.province}
                        />
                </div>
            {/* Postal Code */}
                <div>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input
                        id='postalCode'
                        name='postalCode'
                        type='text'
                        ref={postalCodeRef}
                        placeholder={employeeData?.postalCode}
                        />
                </div>
            {/* Phone Number */}
                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        id='phone'
                        name='phone'
                        type='text'
                        ref={phoneRef}
                        placeholder={employeeData?.phone}
                        />
                </div>
            {/* Email */}
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        type='text'
                        // ref={emailRef}
                        disabled
                        placeholder={employeeData?.email}
                        />
                </div>
            {/* First Day */}
                <div className='employeeFormCalendar'>
                    <div>
                        <label htmlFor='firstDay'>Start Date</label>
                        <input
                            id='firstDay'
                            name='firstDay'
                            type='date'
                            ref={firstDayRef}
                            />
                    </div>
                    <p>Saved: {employeeData?.firstDay}</p>
                </div>
            {/* Last Day */}
                <div className='employeeFormCalendar'>
                    <div>
                        <label htmlFor='lastDay'>End Date</label>
                        <input
                            id='lastDay'
                            name='lastDay'
                            type='date'
                            ref={lastDayRef}
                            />
                    </div>
                    <p>Saved: {employeeData?.lastDay}</p>
                    
                </div>
            {/* Notes */}
                <div>
                    <label htmlFor='notes'>Notes</label>
                    <textarea
                        id='notes'
                        name='notes'
                        ref={notesRef}
                        placeholder={employeeData?.notes}
                        >
                    </textarea>
                </div>

                <div className='employeeButtonContainer'>
                    {!props.newEmployee && props.id !== ''
                        ? <div className='employeeSubmit'>
                            <button
                                className='newItemButton'
                                onClick={handleUpdateEmployee}
                                >Update Employee
                            </button>
                            <button
                                className='newItemButton deleteItemButton'
                                onClick={handleDelete}
                                >Delete Employee
                            </button>
                        </div>
                        : props.newEmployee 
                            ? <button
                                onClick={handleAddEmployee}
                                className='newItemButton'
                                >Add Emmployee</button>
                            : null
                    }
                </div>
            </form>

            {employeeData?.userID === undefined || employeeData?.userPW === undefined
                ? <h3>Add / Update employee with 4 digit User ID & PW to begin activation.</h3>
                : employeeData?.userID.length === 4 && employeeData?.userPW.length === 4
                    ? <EmployeeFirebase 
                        email={employeeData?.email}
                        pw={employeeData?.userPW}
                        setFirebaseAuthWarning={setFirebaseAuthWarning}
                        />
                    : <h3>Add / Update employee with 4 digit User ID & PW to begin activation.</h3>
            }
        </section>
        
    )
}

export default EmployeeDataForm;