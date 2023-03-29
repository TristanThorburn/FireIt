import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import menu from '../assets/menu.png'
import employee from '../assets/employee.png'
import table from '../assets/table.png'
import payments from '../assets/payments.png'
import settings from '../assets/settings.png'
import schedule from '../assets/schedule.png'

const BackendDash = () => {
    const navigate = useNavigate();

    const handleLeaveAdmin = () => {
        navigate('/login')
    }

    return(
        <div className='backendDash'>
            <header>
                <button className='infoButton exitAdmin' onClickCapture={handleLeaveAdmin}>
                    🔥
                    <p>TO FIRE IT</p>
                </button>
                <h2>Admin / Manager View</h2>
            </header>
            <div className='buttonContainer'>
                <ul>
                <li className='useableBackdash'>
                    <Link to='/menu-data'><img src={menu} alt="" /></Link>
                    Menu Entry Setup
                </li>
                <li className='useableBackdash'>
                    <Link to='/employee-data'><img src={employee} alt="" /></Link>
                    Employee Setup
                </li>
                <li className='useableBackdash'>
                    <Link to='/tablemap-data'><img src={table} alt="" /></Link>
                    Table Map Settings
                </li>
                <li className='unUseableBackdash'>
                    <Link to='/payment-data'><img src={payments} alt="" /></Link>
                    Payment Data
                </li>
                <li className='unUseableBackdash'>
                    <Link to='/schedule'><img src={schedule} alt="" /></Link>
                    Schedule
                </li>
                <li className='unUseableBackdash'>
                    <Link to='/settings'><img src={settings} alt="" /></Link>
                    Settings
                </li>
                </ul>
            </div>
        </div>
    )
}

export default BackendDash;