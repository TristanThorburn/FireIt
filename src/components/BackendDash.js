import { Link } from 'react-router-dom';

const BackendDash = () => {
    return(
        <div>
            <h2>Backend Dashboard</h2>
            <h3><Link to='/'>Back to Front End</Link></h3>
            <ul>
                <li>Employee Data</li>
                <li>Menu Data</li>
                <li>Payment Data</li>
            </ul>
        </div>
    )
}

export default BackendDash;