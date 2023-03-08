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
            <header className='backDashHeader'>
                <h2>Settings Data</h2>
                <div className='infoButton'>
                    <button onClick={handleSettingsHelp}>🔥</button>
                    <p onClick={handleSettingsHelp}>INFO</p>
                </div>
            </header>

            {settingsHelp
                ? <BackDashHelp
                    settingsHelp={settingsHelp}
                    setSettingsHelp={setSettingsHelp}
                    />
                : null
            }

            <p>Under Construction</p>
            <Link to='/backend-dash'>Return to Backend Dashboard</Link>
        </section>
    )
}

export default SettingsData;