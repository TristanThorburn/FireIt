import { Link } from 'react-router-dom';
import { useState } from 'react';
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
import BackDashHelp from '../help/BackDashHelp';

const MenuData = () => {
    const [ activeTab, setActiveTab ] = useState('');
    const [ docQuery, setDocQuery ] = useState('')
    const [ menuEntryHelp, setMenuEntryHelp ] = useState(false)

    // ACTIVE TAB === which collection ref to look for useeffect display
    // DOC QUERY === data address for selecting specific docs / used in update functions

    const handleApps = () => {
        setActiveTab('apps');
        setDocQuery(['food', 'menu', 'apps'])
    }

    const handleMains = () => {
        setActiveTab('mains');
        setDocQuery(['food', 'menu', 'mains'])
    }

    const handleDesserts = () => {
        setActiveTab('desserts');
        setDocQuery(['food', 'menu', 'desserts'])
    }

    const handleFoodAdds = () => {
        setActiveTab('food addons');
        setDocQuery(['food', 'addons', 'food addons'])
    }

    const handleNonAlch = () => {
        setActiveTab('non alcoholic')
    }

    const handleAlch = () => {
        setActiveTab('alcoholic')
    }

    const handleBarAdds = () => {
        setActiveTab('drink addons');
        setDocQuery(['drinks', 'addons', 'drink addons'])
    }

    const handleMenuMods = () => {
        setActiveTab('menu mods');
        setDocQuery(['menu mods'])
    }

    const handleMenuEntryHelp = () => {
        setMenuEntryHelp(true)
    }

    return(
        <section className='menuData'>
            <header>
                <Link to='/backend-dash'>
                        <button className='newItemButton deleteItemButton'>Back to Dashboard</button>
                </Link>

                <h2>Menu Entry Setup</h2>

                <button className='infoButton' onClickCapture={handleMenuEntryHelp}>
                    🔥
                    <p>INFO</p>
                </button>
            </header>

            {menuEntryHelp
                ? <BackDashHelp
                    menuEntryHelp={menuEntryHelp}
                    setMenuEntryHelp={setMenuEntryHelp}
                    />
                : null
            }

            <div className='buttonContainer'>
                <ul>
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

            {activeTab === 'apps'
                ? <AppsData activeTab={activeTab} docQuery={docQuery} />
                : null
            }

            {activeTab === 'mains'
                ? <MainsData activeTab={activeTab} docQuery={docQuery} />
                : null
            }

            {activeTab === 'desserts'
                ? <DessertsData activeTab={activeTab} docQuery={docQuery} />
                : null
            }

            {activeTab === 'food addons'
                ? <FoodAddonsData activeTab={activeTab} docQuery={docQuery} />
                : null
            }

            {activeTab === 'non alcoholic'
                ? <NonAlchData 
                    docQuery={docQuery} 
                    setDocQuery={setDocQuery} 
                    />
                : null
            }

            {activeTab === 'alcoholic'
                ? <AlchData 
                    docQuery={docQuery} 
                    setDocQuery={setDocQuery} 
                    />
                : null
            }

            {activeTab === 'drink addons'
                ? <DrinkAddonsData activeTab={activeTab} docQuery={docQuery} />
                : null
            }

            {activeTab === 'menu mods'
                ? <MenuModsData activeTab={activeTab} docQuery={docQuery} />
                : null
            }

        </section>
    )
}

export default MenuData;