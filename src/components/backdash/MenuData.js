import { Link } from 'react-router-dom';
import { useState } from 'react';
import back from '../../assets/back.png';
import wine from '../../assets/wine.png';
import apps from '../../assets/apps.png';
import nonalch from '../../assets/nonalch.png';
import mains from '../../assets/mains.png';
import allmenu from '../../assets/allmenu.png';
import AppsData from './menudata/AppsData';

const MenuData = () => {
    const [ appTab, setAppsTab ] = useState(false)

    const handleApps = () => {
        setAppsTab(true)
    }

    return(
        <div className='menuData'>
            <h2>Menu Entry Setup</h2>

            <div className='buttonContainer'>
                <ul>
                    <li><Link to='/backend-dash'><img src={back} alt="" /></Link>Backend Dashboard</li>
                    <li onClick={handleApps}><img src={apps} alt="" />Apps</li>
                    <li><img src={mains} alt="" />Mains</li>
                    <li><img src={nonalch} alt="" />Non Alcholic</li>
                    <li><img src={wine} alt="" />Liquor/Wine/Beer</li>
                    <li><img src={allmenu} alt="" />All Items</li>
                </ul>
            </div>

            {appTab
                ? <AppsData />
                : null
            }

        </div>
    )
}

export default MenuData;