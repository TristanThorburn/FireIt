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
            <header className='backTitleAndInfo'>
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

            <p>Under Construction</p>
            <Link to='/backend-dash'>
                <button className='newItemButton deleteItemButton'>Back to Dashboard</button>
            </Link>
        </section>
    )
}

export default ScheduleData;