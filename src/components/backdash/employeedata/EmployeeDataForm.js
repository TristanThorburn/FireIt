import { useRef, useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, deleteDoc, addDoc, updateDoc, getDocs } from 'firebase/firestore';
import { employeeCollectionRef } from '../../../library/firestoreCollections';
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
    const  testUser = '5555'

    const handleTest = (e) => {
        e.preventDefault()
        getDocs(employeeCollectionRef).then(snap => {
            let usersList = []
            snap.forEach(doc => {                
                usersList.push(doc.data().userID)
            })            
            // check if user ID is in the list
            const userExists = usersList.indexOf(testUser) > -1
            console.log(usersList)
            console.log(userExists)
        })
    }

    useEffect(() => {
        if(props.id === ''){
            setEmployeeData({})
        }
        if(props.id !== ''){
            const docRef = doc(db, 'employees', props.id)
            getDoc(docRef).then((doc) => setEmployeeData(doc.data())).catch(error => console.log(error))
        }
    },[props.id])

    useEffect(() => {
        Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = ''))
        Array.from(document.querySelectorAll('textarea')).forEach(
                input => (input.value = ''))
    },[props.id, props.newEmployee])

    const handleAddEmployee = (e) => {
        e.preventDefault()

        if(props.newEmployee === true && firstNameRef.current.value !== ''){
            addDoc(employeeCollectionRef, {
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
            Array.from(document.querySelectorAll('input')).forEach(
                input => (input.value = ''))
            Array.from(document.querySelectorAll('textarea')).forEach(
                    input => (input.value = ''))
        }
    }

    const handleUpdateEmployee = (e) => {
        e.preventDefault()
        const docRef = doc(db, 'employees', props.id)

        if(props.id !== '' && employeeNumberRef.current.value !== ''){
            updateDoc(docRef, {
                employeeNumber:employeeNumberRef.current.value
            })
        }
        if(props.id !== '' && firstNameRef.current.value !== ''){
            updateDoc(docRef, {
                firstName:firstNameRef.current.value
            })
        }
        if(props.id !== '' && lastNameRef.current.value !== ''){
            updateDoc(docRef, {
                lastName:lastNameRef.current.value
            })
        }
        if(props.id !== '' && userIDRef.current.value !== ''){
            updateDoc(docRef, {
                userID:userIDRef.current.value
            })
        }
        if(props.id !== '' && userPWRef.current.value !== ''){
            updateDoc(docRef, {
                userPW:userPWRef.current.value
            })
        }
        if(props.id !== '' && SINRef.current.value !== ''){
            updateDoc(docRef, {
                sin:SINRef.current.value
            })
        }
        if(props.id !== '' && dobRef.current.value !== ''){
            updateDoc(docRef, {
                dob:dobRef.current.value
            })
        }
        if(props.id !== '' && streetRef.current.value !== ''){
            updateDoc(docRef, {
                street:streetRef.current.value
            })
        }
        if(props.id !== '' && cityRef.current.value !== ''){
            updateDoc(docRef, {
                city:cityRef.current.value
            })
        }
        if(props.id !== '' && provinceRef.current.value !== ''){
            updateDoc(docRef, {
                province:provinceRef.current.value
            })
        }
        if(props.id !== '' && postalCodeRef.current.value !== ''){
            updateDoc(docRef, {
                postalCode:postalCodeRef.current.value
            })
        }
        if(props.id !== '' && phoneRef.current.value !== ''){
            updateDoc(docRef, {
                phone:phoneRef.current.value
            })
        }
        // if(props.id !== '' && emailRef.current.value !== ''){
        //     updateDoc(docRef, {
        //         email:emailRef.current.value
        //     })
        // }
        if(props.id !== '' && firstDayRef.current.value !== ''){
            updateDoc(docRef, {
                firstDay:firstDayRef.current.value
            })
        }
        if(props.id !== '' && lastDayRef.current.value !== ''){
            updateDoc(docRef, {
                lastDay:lastDayRef.current.value
            })
        }
        if(props.id !== '' && notesRef.current.value !== ''){
            updateDoc(docRef, {
                notes:notesRef.current.value
            })
        }
        props.setSelectedEmployee('');
        Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = ''))
        Array.from(document.querySelectorAll('textarea')).forEach(
                input => (input.value = ''))
        }

    const handleDelete = (e) => {
        e.preventDefault();
        const docRef = doc(db, 'employees', props.id)
        
        if(props.id !== ''){
            deleteDoc(docRef)
            setEmployeeData('')
        }
    }

    return(
        <>
            <form className='employeeForm'>
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
                    <label htmlFor='userID'>User ID</label>
                    <input
                        id='userID'
                        name='userID'
                        type='number'
                        ref={userIDRef}
                        placeholder={employeeData?.userID}
                        />
                </div>
            {/* User PW */}
                <div>
                    <label htmlFor='userPW'>User PW</label>
                    <input
                        id='userPW'
                        name='userPW'
                        type='number'
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
                <div>
                    <label htmlFor='dob'>Date of Birth</label>
                    <p>{employeeData?.dob}</p>
                    <input
                        id='dob'
                        name='dob'
                        type='date'
                        ref={dobRef}
                        />
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
                <div>
                    <label htmlFor='firstDay'>Start Date</label>
                    <p>{employeeData?.firstDay}</p>
                    <input
                        id='firstDay'
                        name='firstDay'
                        type='date'
                        ref={firstDayRef}
                        />
                </div>
            {/* Last Day */}
                <div>
                    <label htmlFor='lastDay'>End Date</label>
                    <p>{employeeData?.lastDay}</p>
                    <input
                        id='lastDay'
                        name='lastDay'
                        type='date'
                        ref={lastDayRef}
                        />
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

                {!props.newEmployee && props.id !== ''
                    ? <>
                        <button onClick={handleUpdateEmployee}>Update Employee</button>
                        <button onClick={handleDelete}>Delete Employee</button>
                    </>
                    : props.newEmployee 
                        ? <button onClick={handleAddEmployee}>Add Emmployee</button>
                        : null
                }
                <button onClick={handleTest}>Test</button>
            </form>
            <EmployeeFirebase user={employeeData?.email} pw={employeeData?.userPW}/>
        </>
        
    )
}

export default EmployeeDataForm;