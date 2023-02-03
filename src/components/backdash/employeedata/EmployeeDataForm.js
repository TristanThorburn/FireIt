import { useRef, useState, useEffect } from 'react';
import { employeeCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { doc, getDoc, } from 'firebase/firestore';

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
    const emailRef = useRef('');
    const firstDayRef = useRef('');
    const lastDayRef = useRef('');
    const notesRef = useRef('');

    const handleTest = (e) => {
        e.preventDefault()
        console.log(employeeData.dob.toDate())
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

    return(
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
                    placeholder={employeeData?.SIN}
                    />
            </div>
        {/* DOB */}
            <div>
                <label htmlFor='dob'>Date of Birth</label>
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
                    ref={emailRef}
                    placeholder={employeeData?.email}
                    />
            </div>
        {/* First Day */}
            <div>
                <label htmlFor='firstDay'>Start Date</label>
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
            
            <button onClick={handleTest}>Test</button>
        </form>
        
    )
}

export default EmployeeDataForm;