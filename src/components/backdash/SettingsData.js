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

            <div className='backDashHelpButtonDiv'>
                <h2>Settings</h2>

                <button onClick={handleSettingsHelp}>🔥</button>

                <h3 onClick={handleSettingsHelp}>INFO</h3>
            </div>

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