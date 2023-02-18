import { Link } from 'react-router-dom';
import { useState } from 'react';
import back from '../../assets/back.png';
import alcohol from '../../assets/alcohol.png';
import apps from '../../assets/apps.png';
import nonalch from '../../assets/nonalch.png';
import mains from '../../assets/mains.png';
import desserts from '../../assets/desserts.png'
import fries from '../../assets/fries.png';
import citrus from '../../assets/citrus.png';
import mods from '../../assets/mods.png';
import AppsData from './menudata/food/AppsData';
import MainsData from './menudata/food/MainsData';
import DessertsData from './menudata/food/DessertsData';
import NonAlchData from './menudata/drinks/NonAlchData';
import AlchData from './menudata/drinks/AlchData';
import FoodAddonsData from './menudata/food/FoodAddonsData';
import DrinkAddonsData from './menudata/drinks/DrinkAddonsData';
import MenuModsData from './menudata/MenuModsData';

const MenuData = () => {
    const [ appTab, setAppsTab ] = useState(false);
    const [ mainsTab, setMainsTab ] = useState(false);
    const [ dessertsTab, setDessertsTab ] = useState(false);
    const [ foodAddonsTab, setFoodAddonsTab ] = useState(false);
    const [ nonAlchTab, setNonAlchTab ] = useState(false);    
    const [ alchTab, setAlchTab ] = useState(false);    
    const [ drinkAddonsTab, setDrinkAddonsTab ] = useState(false);
    const [ menuModsTab, setMenuModsTab ] = useState(false);
    const [ activeDataDoc, setActiveDataDoc ] = useState('');
    const [ docQuery, setDocQuery ] = useState('')

    // ACTIVE DATA DOC / ACTIVE TAB PROP === which collection ref to look for useeffect display
    // DOC QUERY === data address for selecting specific docs / used in update functions

    const handleApps = () => {
        setAppsTab(true);
        setMainsTab(false);
        setDessertsTab(false);
        setFoodAddonsTab(false);
        setNonAlchTab(false);
        setAlchTab(false);
        setDrinkAddonsTab(false);
        setMenuModsTab(false);
        setActiveDataDoc('apps');
        setDocQuery(['food', 'menu', 'apps'])
    }

    const handleMains = () => {
        setAppsTab(false);
        setMainsTab(true);
        setDessertsTab(false);
        setFoodAddonsTab(false);
        setNonAlchTab(false);
        setAlchTab(false);
        setDrinkAddonsTab(false);
        setMenuModsTab(false);
        setActiveDataDoc('mains');
        setDocQuery(['food', 'menu', 'mains'])
    }

    const handleDesserts = () => {
        setAppsTab(false);
        setMainsTab(false);
        setDessertsTab(true);
        setFoodAddonsTab(false);
        setNonAlchTab(false);
        setAlchTab(false);
        setDrinkAddonsTab(false);
        setMenuModsTab(false);
        setActiveDataDoc('desserts');
        setDocQuery(['food', 'menu', 'desserts'])
    }

    const handleFoodAdds = () => {
        setAppsTab(false);
        setMainsTab(false);
        setDessertsTab(false);
        setFoodAddonsTab(true);
        setNonAlchTab(false);
        setAlchTab(false);
        setDrinkAddonsTab(false);
        setMenuModsTab(false);
        setActiveDataDoc('food addons');
        setDocQuery(['food', 'addons', 'food addons'])
    }

    const handleNonAlch = () => {
        setAppsTab(false);
        setMainsTab(false);
        setDessertsTab(false);
        setFoodAddonsTab(false);
        setNonAlchTab(true);
        setAlchTab(false);
        setDrinkAddonsTab(false);
        setMenuModsTab(false);
    }

    const handleAlch = () => {
        setAppsTab(false);
        setMainsTab(false);
        setDessertsTab(false);
        setFoodAddonsTab(false);
        setNonAlchTab(false);
        setAlchTab(true);
        setDrinkAddonsTab(false);
        setMenuModsTab(false);
    }

    const handleBarAdds = () => {
        setAppsTab(false);
        setMainsTab(false);
        setDessertsTab(false);
        setFoodAddonsTab(false);
        setNonAlchTab(false);
        setAlchTab(false);
        setDrinkAddonsTab(true);
        setMenuModsTab(false);
        setActiveDataDoc('drink addons');
        setDocQuery(['drinks', 'addons', 'drink addons'])
    }

    const handleMenuMods = () => {
        setAppsTab(false);
        setMainsTab(false);
        setDessertsTab(false);
        setFoodAddonsTab(false);
        setNonAlchTab(false);
        setAlchTab(false);
        setDrinkAddonsTab(false);
        setMenuModsTab(true);
        setActiveDataDoc('menu mods');
        setDocQuery(['menu mods'])
    }

    return(
        <section className='menuData'>
            <h2>Menu Entry Setup</h2>

            <div className='buttonContainer'>
                <ul>
                    <li><Link to='/backend-dash'><img src={back} alt='' /></Link>Backend Dashboard</li>
                    <li onClick={handleApps}><img src={apps} alt='' />Apps</li>
                    <li onClick={handleMains}><img src={mains} alt='' />Mains</li>                     
                    <li onClick={handleDesserts}><img src={desserts} alt='' />Desserts</li>
                    <li onClick={handleFoodAdds}><img src={fries} alt='' />Food Addons</li>
                    <li onClick={handleNonAlch}><img src={nonalch} alt='' />Non Alcholic</li>
                    <li onClick={handleAlch}><img src={alcohol} alt='' />Alcoholic</li>
                    <li onClick={handleBarAdds}><img src={citrus} alt='' />Drink Addons</li>
                    <li onClick={handleMenuMods}><img src={mods} alt='' />Modifiers</li>
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

            {foodAddonsTab
                ? <FoodAddonsData activeTab={activeDataDoc} docQuery={docQuery} />
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

            {alchTab
                ? <AlchData 
                    activeTab={activeDataDoc} 
                    docQuery={docQuery} 
                    setActiveDataDoc={setActiveDataDoc}
                    setDocQuery={setDocQuery} 
                    />
                : null
            }

            {drinkAddonsTab
                ? <DrinkAddonsData activeTab={activeDataDoc} docQuery={docQuery} />
                : null
            }

            {menuModsTab
                ? <MenuModsData activeTab={activeDataDoc} docQuery={docQuery} />
                : null
            }

        </section>
    )
}

export default MenuData;