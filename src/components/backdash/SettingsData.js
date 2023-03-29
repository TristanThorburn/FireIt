import { Link } from 'react-router-dom';
import { useState } from 'react';
import BackDashHelp from '../help/BackDashHelp';

const SettingsData = () => {
    const [ settingsHelp, setSettingsHelp ] = useState(false)

    const handleSettingsHelp = () => {
        setSettingsHelp(true)
    }

    return(
        <section className='settingsData'>
            <header className='backTitleAndInfo'>
                <h2>Settings Data</h2>
                <button onClickCapture={handleSettingsHelp} className='infoButton'>
                    🔥
                    <p>INFO</p>
                </button>
            </header>

            {settingsHelp
                ? <BackDashHelp
                    settingsHelp={settingsHelp}
                    setSettingsHelp={setSettingsHelp}
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

export default SettingsData;