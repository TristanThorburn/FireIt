import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { employeeCollectionRef } from '../../library/firestoreCollections';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import EmployeeDataForm from './employeedata/EmployeeDataForm';
import BackDashHelp from '../help/BackDashHelp';
import FireItAlert from '../help/FireItAlert';

const EmployeeData = () => {
    const [ employeeDisplayData, setEmployeeDisplayData ] = useState([]);
    const [ newEmployee, setNewEmployee ] = useState(false);
    const [ selectedEmployee, setSelectedEmployee ] = useState('');
    const [ employeeDataHelp, setEmployeeDataHelp ] = useState(false);
    const [ fireItAlert, setFireItAlert ] = useState('');
    const [ employeeNumbers, setEmployeeNumbers ] = useState([]);
    const [ employeeUserIds, setEmployeeUserIds ] = useState([]);

    // initial data population on screen
    useEffect(() => {
        let employeeNumbers = []
        let employeeUsers = []
        const q = query(employeeCollectionRef, orderBy('employeeNumber', 'asc'))
        const unsubscribe = onSnapshot(q, snapshot => {
            setEmployeeDisplayData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            snapshot.forEach(doc => {
                employeeNumbers.push(doc.data().employeeNumber)               
                employeeUsers.push(doc.data().userID)
            })
        })
        setEmployeeNumbers(employeeNumbers)
        setEmployeeUserIds(employeeUsers)
        return unsubscribe
    },[])

    const handleNewEmployee = () => {
        setSelectedEmployee('')
        setNewEmployee(true)
    }

    const handleEmployeeDataHelp = () => {
        setEmployeeDataHelp(true)
    }
 
    return(
        <section className='employeeData'>
            <header>
                <Link to='/backend-dash'>
                    <button className='newItemButton deleteItemButton'>Back to Dashboard</button>
                </Link>

                <div className='backDashHeader'>
                    <h2>Employee Data</h2>
                    <div className='infoButton'>
                        <button onClick={handleEmployeeDataHelp}>🔥</button>
                        <p onClick={handleEmployeeDataHelp}>INFO</p>
                    </div>
                </div>

                <button className='newItemButton' onClick={handleNewEmployee}>New Employee</button>
            </header>

            {employeeDataHelp
                ? <BackDashHelp
                        employeeDataHelp={employeeDataHelp}
                        setEmployeeDataHelp={setEmployeeDataHelp}
                    />
                : null
            }

            {fireItAlert !== ''
                ? <FireItAlert
                    fireItAlert={fireItAlert}
                    setFireItAlert={setFireItAlert}
                    />
                : null
            }
            
            <div className='employeeDataContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First</th>
                            <th>Last</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeDisplayData.map(employee => 
                        <tr
                            key={employee.id}
                            onClick={() => {
                                setSelectedEmployee(employee.id)
                                setNewEmployee(false)
                            }}
                            >
                                <td>{employee.data.employeeNumber}</td>
                                <td>{employee.data.firstName}</td>
                                <td>{employee.data.lastName}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

            {newEmployee || selectedEmployee
                ? <EmployeeDataForm
                    newEmployee={newEmployee}
                    setNewEmployee={setNewEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    id={selectedEmployee}
                    setFireItAlert={setFireItAlert}
                    employeeNumbers={employeeNumbers}
                    employeeUserIds={employeeUserIds}
                    />
                : <h3>Select an employee, or create new</h3>
            }
        </section>
    )
}

export default EmployeeData;