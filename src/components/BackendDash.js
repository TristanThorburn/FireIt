import { Link } from 'react-router-dom';
import employee from '../assets/employee.png'
import menu from '../assets/menu.png'
import payments from '../assets/payments.png'
import back from '../assets/back.png'

const BackendDash = () => {
    return(
        <div className='backendDash'>
            <h2>Backend Dashboard</h2>
            <div className='buttonContainer'>
                <ul>
                <li><Link to='/'><img src={back} alt="" /></Link>Return To Server View</li>
                <li><Link to='/menu-data'><img src={menu} alt="" /></Link>Menu Entry Setup</li>
                <li><Link to='/employee-data'><img src={employee} alt="" /></Link>Employee Setup</li>
                <li><Link to='/payment-data'><img src={payments} alt="" /></Link>Payment Data</li>
                </ul>
            </div>
        </div>
    )
}

export default BackendDash;