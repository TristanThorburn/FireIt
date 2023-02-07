import { Link } from 'react-router-dom';
import EmployeeDataForm from './employeedata/EmployeeDataForm';
import { useState, useEffect } from 'react';
import { employeeCollectionRef } from '../../library/firestoreCollections';
import { onSnapshot, orderBy, query } from 'firebase/firestore';

const EmployeeData = () => {
    const [ employeeData, setEmployeeData ] = useState([]);
    const [ newEmployee, setNewEmployee ] = useState(false);
    const [ selectedEmployee, setSelectedEmployee ] = useState('');

    useEffect(() => {
        const q = query(employeeCollectionRef, orderBy('employeeNumber', 'asc'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setEmployeeData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    },[])

    const handleNewEmployee = () => {
        setSelectedEmployee('')
        setNewEmployee(true)
    }
 
    return(
        <div>
            <Link to='/backend-dash'><button>Back to Dashboard</button></Link>
            <div className='itemList employeeData'>
                <h3>Employees List</h3>
                <button onClick={handleNewEmployee}>New Employee</button>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First</th>
                            <th>Last</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map(employee => 
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
                    />
                : <h3>Select an employee, or create new</h3>
            }
        </div>
    )
}

export default EmployeeData;