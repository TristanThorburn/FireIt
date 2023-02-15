import TableCheck from "./menu_tab_components/TableCheck";
import MenuTabNav from "./navs/MenuTabNav";
import { useState } from "react";
import AppsScreen from './menu_tab_components/AppsScreen';
import MainsScreen from './menu_tab_components/MainsScreen';
import DessertsScreen from './menu_tab_components/DessertsScreen';
import NonAlchScreen from './menu_tab_components/NonAlchScreen';
import BeerScreen from './menu_tab_components/BeerScreen';
import CiderSeltzScreen from './menu_tab_components/CiderSeltzScreen';
import MixedDrinksScreen from './menu_tab_components/MixedDrinksScreen';
import LiquorsScreen from './menu_tab_components/LiquorsScreen';
import WinesScreen from './menu_tab_components/WinesScreen';

const MenuTab = () => {
    const [ directory, setDirectory ] = useState(true);
    const [ appsCategory, setAppsCategory ] = useState(false);
    const [ mainsCategory, setMainsCategory ] = useState(false);
    const [ dessertsCategory, setDessertsCategory ] = useState(false);
    const [ nonAlchCategory, setNonAlchCategory ] = useState(false);
    const [ beerCategory, setBeerCategory ] = useState(false);
    const [ cidSprCategory, setCidSprCategory ] = useState(false);
    const [ mixedCategory, setMixedCategory ] = useState(false);
    const [ liquorsCategory, setLiquorsCategory ] = useState(false);
    const [ winesCategory, setWinesCategory ] = useState(false);

    const handleTest = () => {
    }

    const handleGoApps = () => {
        setDirectory(false);
        setAppsCategory(true);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoMain = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(true);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoDesserts = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(true);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoNonAlch = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(true);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoBeer = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(true);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoCidSpr = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(true);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoMixed = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(true);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoLiquor = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(true);
        setWinesCategory(false);
    }

    const handleGoWine = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(true);
    }

    return(
        <div className='menuTab'>
            <article className='activeCheck'>
                <TableCheck />
            </article>
            
            <section className='activeMenuCategory'>
                {directory
                    ? <div className='menuCategories'>
                        <ul>
                            <li onClick={handleGoApps}><button>APPS</button></li>
                            <li onClick={handleGoBeer}><button>BEER</button></li>
                            <li onClick={handleGoMain}><button>MAINS</button></li>
                            <li onClick={handleGoCidSpr}><button>CIDER/SELTZ</button></li>
                            <li onClick={handleGoDesserts}><button>DESSERTS</button></li>
                            <li onClick={handleGoLiquor}><button>LIQUOR</button></li>
                            <li onClick={handleGoNonAlch}><button>NON ALCOHOLIC</button></li>
                            <li onClick={handleGoMixed}><button>MIXED DRINKS</button></li>
                            <li onClick={handleTest}>Test</li>
                            <li onClick={handleGoWine}><button>WINES</button></li>
                        </ul>
                    </div>
                    : null
                }

                {appsCategory
                    ? <AppsScreen />
                    : null
                }

                {mainsCategory
                    ? <MainsScreen />
                    : null
                }

                {dessertsCategory
                    ? <DessertsScreen />
                    : null
                }

                {nonAlchCategory
                    ? <NonAlchScreen />
                    : null
                }

                {beerCategory
                    ? <BeerScreen />
                    : null
                }

                {cidSprCategory
                    ? <CiderSeltzScreen />
                    : null
                }

                {mixedCategory
                    ? <MixedDrinksScreen />
                    : null
                }

                {liquorsCategory
                    ? <LiquorsScreen />
                    : null
                }

                {winesCategory
                    ? <WinesScreen />
                    : null
                }
            </section>
            
            <MenuTabNav 
                toDirectory={setDirectory}
                toApps={setAppsCategory}
                toMains={setMainsCategory}
                toDesserts={setDessertsCategory}
                toNonAlch={setNonAlchCategory}
                toBeer={setBeerCategory}
                toCidSpr={setCidSprCategory}
                toMixed={setMixedCategory}
                toLiquors={setLiquorsCategory}
                toWines={setWinesCategory}
                />
        </div>
    )
}

export default MenuTab;

// Thoughts:
// Choose base components on how logic pulls happen as they ARE from specific library paths that so far
//      in the project pulls all of the data from the library, or should I get doc single for each?
// Components:
//      -App Component
            // -Pop Food Adds
            // Modifiers
//      -Mains Component
            // -Pop Food Adds
            // Modifiers
//      -Desert Component
            // -Pop Food Adds
            // Modifiers
//      -Non Alch Tab
//      -Beer Tab
            // -Bottle
            // -Can
            // -Draft
            // Modifiers
//      -Wine Tab
            // Red
            // White
            // Bubbly
            // Modifiers
//      -Mixed Drinks
            // Cocktails
            // Shots
            // Modifiers
//      -Liquor
            // Gin
            // Rum
            // Tequila
            // Vodka
            // Whiskey
            // Modifiers