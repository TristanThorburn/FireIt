import { Link } from 'react-router-dom';
import { useState } from 'react';
import back from '../../assets/back.png';
import wine from '../../assets/wine.png';
import apps from '../../assets/apps.png';
import nonalch from '../../assets/nonalch.png';
import mains from '../../assets/mains.png';
import desserts from '../../assets/desserts.png'
import AppsData from './menudata/food/AppsData';
import MainsData from './menudata/food/MainsData';
import DessertsData from './menudata/food/DessertsData';
import NonAlchData from './menudata/drinks/NonAlchData';

const MenuData = () => {
    const [ appTab, setAppsTab ] = useState(false);
    const [ mainsTab, setMainsTab ] = useState(false);
    const [ dessertsTab, setDessertsTab ] = useState(false);
    const [ nonAlchTab, setNonAlchTab ] = useState(false)
    const [ activeDataDoc, setActiveDataDoc ] = useState('');
    const [ docQuery, setDocQuery ] = useState('')

    const handleApps = () => {
        setMainsTab(false);
        setDessertsTab(false);
        setNonAlchTab(false);
        setAppsTab(true);
        setActiveDataDoc('apps');
        setDocQuery(['food', 'menu', 'apps'])
    }

    const handleMains = () => {
        setAppsTab(false);
        setDessertsTab(false);
        setNonAlchTab(false);
        setMainsTab(true);
        setActiveDataDoc('mains');
        setDocQuery(['food', 'menu', 'mains'])
    }

    const handleDesserts = () => {
        setAppsTab(false);
        setMainsTab(false);
        setNonAlchTab(false);
        setDessertsTab(true);
        setActiveDataDoc('desserts');
        setDocQuery(['food', 'menu', 'desserts'])
    }

    const handleNonAlch = () => {
        setAppsTab(false);
        setMainsTab(false);
        setDessertsTab(false);
        setNonAlchTab(true);
    }

    return(
        <div className='menuData'>
            <h2>Menu Entry Setup</h2>

            <div className='buttonContainer'>
                <ul>
                    <li><Link to='/backend-dash'><img src={back} alt="" /></Link>Backend Dashboard</li>
                    <li onClick={handleApps}><img src={apps} alt="" />Apps</li>
                    <li onClick={handleMains}><img src={mains} alt="" />Mains</li>                    
                    <li onClick={handleDesserts}><img src={desserts} alt="" />Desserts</li>
                    <li onClick={handleNonAlch}><img src={nonalch} alt="" />Non Alcholic</li>
                    <li><img src={wine} alt="" />Liquor/Wine/Beer</li>
                </ul>
            </div>

            {appTab
                ? <AppsData activeTab={activeDataDoc} docQuery={docQuery} />
                : null
            }

            {mainsTab
                ? <MainsData activeTab={activeDataDoc} docQuery={docQuery} />
                : null
            }

            {dessertsTab
                ? <DessertsData activeTab={activeDataDoc} docQuery={docQuery} />
                : null
            }

            {nonAlchTab
                ? <NonAlchData 
                    activeTab={activeDataDoc} 
                    docQuery={docQuery} 
                    setActiveDataDoc={setActiveDataDoc}
                    setDocQuery={setDocQuery} 
                    />
                : null
            }

        </div>
    )
}

export default MenuData;