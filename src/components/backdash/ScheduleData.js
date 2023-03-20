import { Link } from 'react-router-dom';
import { useState } from 'react';
import BackDashHelp from '../help/BackDashHelp';

const ScheduleData = () => {
    const [ scheduleHelp, setScheduleHelp ] = useState(false)

    const handleScheduleHelp = () => {
        setScheduleHelp(true)
    }

    return(
        <section className='scheduleData'>
            <header className='backDashHeader'>
                <h2>Scheduler</h2>
                <div className='infoButton'>
                    <button onClick={handleScheduleHelp}>🔥</button>
                    <p onClick={handleScheduleHelp}>INFO</p>
                </div>
            </header>

            {scheduleHelp
                ? <BackDashHelp
                    scheduleHelp={scheduleHelp}
                    setScheduleHelp={setScheduleHelp}
                    />
                : null
            }

            <p>Under Construction</p>
            <Link to='/backend-dash'>Return to Backend Dashboard</Link>
        </section>
    )
}

export default ScheduleData;