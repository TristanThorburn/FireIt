import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { employeeCollectionRef } from '../../library/firestoreCollections';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import BackDashHelp from '../help/BackDashHelp';
import ShiftModal from './scheduledata/ShiftModal';

const ScheduleData = () => {
    const [ scheduleHelp, setScheduleHelp ] = useState(false)
    const [ employeeData, setEmployeeData ] = useState([])
    const [ dateAdjustment, setDateAdjustment ] = useState(0)
    const [ showDates, setShowDates ] = useState()
    const [ shiftDay, setShiftDay ] = useState('')
    const [ adjustingShift, setAdjustingShift ] = useState(false)

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
            const displayDates = {}

            displayDates.today = new Date();
            displayDates.today.setDate(displayDates.today.getDate() + 0)

            displayDates.dayOne = new Date();
            displayDates.dayOne.setDate(displayDates.dayOne.getDate() + 0 + dateAdjustment)

            displayDates.dayTwo = new Date(displayDates.dayOne)
            displayDates.dayTwo.setDate(displayDates.dayTwo.getDate() + 1)

            displayDates.dayThree = new Date(displayDates.dayOne)
            displayDates.dayThree.setDate(displayDates.dayThree.getDate() + 2)

            displayDates.dayFour = new Date(displayDates.dayOne)
            displayDates.dayFour.setDate(displayDates.dayFour.getDate() + 3)

            displayDates.dayFive = new Date(displayDates.dayOne)
            displayDates.dayFive.setDate(displayDates.dayFive.getDate() + 4)

            displayDates.daySix = new Date(displayDates.dayOne)
            displayDates.daySix.setDate(displayDates.daySix.getDate() + 5)

            displayDates.daySeven = new Date(displayDates.dayOne)
            displayDates.daySeven.setDate(displayDates.daySeven.getDate() + 6)

            setShowDates(displayDates)
        }
        getWeek();
    }, [dateAdjustment])

    const handleScheduleHelp = () => {
        setScheduleHelp(true)
    }

    const handleAdjustShift = (e) => {
        setShiftDay(e.currentTarget.dataset.shiftdate)
        setAdjustingShift(true)
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

            {adjustingShift
                ?<ShiftModal
                    shiftDay={shiftDay}
                    setAdjustingShift={setAdjustingShift}
                    />
                :null
            }

            <section className='schedule'>
                <h3>Under Construction</h3>
                <table>
                    <thead>
                        <tr>
                            <td 
                                onClick={() => setDateAdjustment(0)}
                                >
                                    <button
                                        className='newItemButton todaySave'
                                        >To Today</button>
                            </td>
                            <td 
                                onClick={() => setDateAdjustment(dateAdjustment - 7)}
                                className='prevDay'
                                ><button
                                    className='dayAdjust'
                                    >&#60;</button>
                            </td>
                            <td className='date'>{showDates?.dayOne.toDateString()}</td>
                            <td className='date'>{showDates?.dayTwo.toDateString()}</td>
                            <td className='date'>{showDates?.dayThree.toDateString()}</td>
                            <td className='date'>{showDates?.dayFour.toDateString()}</td>
                            <td className='date'>{showDates?.dayFive.toDateString()}</td>
                            <td className='date'>{showDates?.daySix.toDateString()}</td>
                            <td className='date'>{showDates?.daySeven.toDateString()}</td>
                            <td 
                                onClick={() => setDateAdjustment(dateAdjustment + 7)}
                                ><button
                                    className='dayAdjust'
                                    >&#62;</button>
                            </td>
                            <td
                                className='save'
                                >
                                    <button
                                        className='newItemButton todaySave'
                                        >Save</button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {employeeData.map(employee =>
                        <tr
                            key={employee.id}
                            className='employeeRow'
                            >
                                {/* NAME */}
                            <td
                                colSpan={2}
                                className='shiftData'
                                >{employee.data.firstName}&nbsp;{employee.data.lastName}
                            </td>
                                {/* MONDAY */}
                            <td className='scheduleShift'
                                onClick={handleAdjustShift}
                                data-shiftdate={showDates?.dayOne.toDateString()}
                                >
                            </td>
                                {/* TUESDAY */}
                            <td className='scheduleShift'
                                onClick={handleAdjustShift}
                                data-shiftdate={showDates?.dayTwo.toDateString()}
                                >
                            </td>
                                {/* WEDNESDAY */}
                            <td className='scheduleShift'
                                onClick={handleAdjustShift}
                                data-shiftdate={showDates?.dayThree.toDateString()}
                                >
                            </td>
                                {/* THURSDAY */}
                            <td className='scheduleShift'
                                onClick={handleAdjustShift}
                                data-shiftdate={showDates?.dayFour.toDateString()}
                                >
                            </td>
                                {/* FRIDAY */}
                            <td className='scheduleShift'
                                onClick={handleAdjustShift}
                                data-shiftdate={showDates?.dayFive.toDateString()}
                                >
                            </td>
                                {/* SATURDAY */}
                            <td className='scheduleShift'
                                onClick={handleAdjustShift}
                                data-shiftdate={showDates?.daySix.toDateString()}
                                >
                            </td>
                                {/* SUNDAY */}
                            <td className='scheduleShift'
                                onClick={handleAdjustShift}
                                data-shiftdate={showDates?.daySeven.toDateString()}
                                >
                            </td>
                            <td 
                                colSpan={2}
                                className='shiftData'
                                >Shifts/Hours:</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default ScheduleData;