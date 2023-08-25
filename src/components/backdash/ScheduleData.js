import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { employeeCollectionRef } from '../../library/firestoreCollections';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import BackDashHelp from '../help/BackDashHelp';

const ScheduleData = () => {
    const [ scheduleHelp, setScheduleHelp ] = useState(false)
    const [ employeeData, setEmployeeData ] = useState([])

    // get employeee data to populate employee list for schedule
    useEffect(() => {
        const q = query(employeeCollectionRef, orderBy('orderBy', 'asc'))
        const unsubscribe = onSnapshot(q, snapshot => {
            setEmployeeData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    }, [])

    // Update the Week
    useEffect(() => {
        const getWeek = () => {
            const dayOne = new Date();
            dayOne.setDate(dayOne.getDate() + 0)

            const dayTwo = new Date(dayOne)
            dayTwo.setDate(dayTwo.getDate() + 1)

            const dayThree = new Date(dayOne)
            dayThree.setDate(dayThree.getDate() + 2)

            const dayFour = new Date(dayOne)
            dayFour.setDate(dayFour.getDate() + 3)

            const dayFive = new Date(dayOne)
            dayFive.setDate(dayFive.getDate() + 4)

            const daySix = new Date(dayOne)
            daySix.setDate(daySix.getDate() + 5)

            const daySeven = new Date(dayOne)
            daySeven.setDate(daySeven.getDate() + 6)

            console.log(dayOne.toDateString(), dayTwo.toDateString(), dayThree.toDateString(), dayFour.toDateString(), dayFive.toDateString(), daySix.toDateString(), daySeven.toDateString())
        }
        getWeek();
    }, [])


    const handleScheduleHelp = () => {
        setScheduleHelp(true)
    }

    return(
        <main className='scheduleData'>
            <header className='backTitleAndInfo'>
                <Link to='/backend-dash'>
                    <button className='newItemButton deleteItemButton'>Back to Dashboard</button>
                </Link>
                <h2>Scheduler</h2>
                <button onClickCapture={handleScheduleHelp} className='infoButton'>
                    🔥
                    <p>INFO</p>
                </button>
            </header>

            {scheduleHelp
                ? <BackDashHelp
                    scheduleHelp={scheduleHelp}
                    setScheduleHelp={setScheduleHelp}
                    />
                : null
            }

            <section>
                <table>
                    <thead>
                        <tr
                            colSpan={9}
                            >
                            <td>week of:</td>
                            <td 
                                colSpan={8}
                                >currentWeek</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>employee</td>
                            <td>monday</td>
                            <td>tuesday</td>
                            <td>wednesday</td>
                            <td>thursday</td>
                            <td>friday</td>
                            <td>saturday</td>
                            <td>sunday</td>
                            <td>shifts/hours</td>
                        </tr>
                    {employeeData.map(employee =>
                        <tr
                            key={employee.id}
                            >
                            <td>{employee.data.firstName}&nbsp;{employee.data.lastName}</td>
                            <td className='scheduleShift'></td>
                            <td className='scheduleShift'></td>
                            <td className='scheduleShift'></td>
                            <td className='scheduleShift'></td>
                            <td className='scheduleShift'></td>
                            <td className='scheduleShift'></td>
                            <td className='scheduleShift'></td>
                            <td className='scheduleHours'></td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default ScheduleData;