import { useState } from 'react';
import BeerData from './beer/BeerData';
import RedWineData from './wine/RedWineData';
import WhiteWineData from './wine/WhiteWineData';
import BubblyData from './wine/BubblyData';
import CocktailsData from './mixed/CocktailsData';
import ShotsData from './mixed/ShotsData';
import GinData from './liquor/GinData';
import RumData from './liquor/RumData';
import TequilaData from './liquor/TequilaData';
import VodkaData from './liquor/VodkaData';
import WhiskeyData from './liquor/WhiskeyData';

const AlchData = (props) => {
    const [ beerTab, setBeerTab ] = useState(false);
    const [ wineTab, setWineTab ] = useState(false);
    const [ mixedTab, setMixedTab ] = useState(false);
    const [ liquorTab, setLiquorTab ] = useState(false);
    const [ redWineTab, setRedWineTab ] = useState(false);
    const [ whiteWineTab, setWhiteWineTab ] = useState(false);
    const [ bubblyTab, setBubblyTab ] = useState(false);
    const [ cocktailsTab, setCocktailsTab ] = useState(false);
    const [ shotsTab, setShotsTab ] = useState(false);
    const [ ginTab, setGinTab, ] = useState(false);
    const [ rumTab, setRumTab ] = useState(false);
    const [ tequilaTab, setTequilaTab ] = useState(false);
    const [ vodkaTab, setVodkaTab ] = useState(false);
    const [ whiskeyTab, setWhiskeyTab ] = useState(false);

    // props.setActiveDataDoc('hot drinks');
    // props.setDocQuery(['drinks', 'non alcoholic', 'hot drinks'])
    const handleBack = () => {
        setBeerTab(false);
        setWineTab(false);
        setMixedTab(false);
        setLiquorTab(false);
        setWhiteWineTab(false);
        setBubblyTab(false);
        setRedWineTab(false);
        setShotsTab(false);
        setCocktailsTab(false);
        setGinTab(false);
        setRumTab(false);
        setTequilaTab(false);
        setVodkaTab(false);
        setWhiskeyTab(false);
    }

    const handleBeer = () => {
        setWineTab(false);
        setMixedTab(false);
        setLiquorTab(false);
        setBeerTab(true);
    }

    const handleWine = () => {
        setMixedTab(false);
        setLiquorTab(false);
        setBeerTab(false);
        setWineTab(true);
    }

    const handleMixed = () => {
        setLiquorTab(false);
        setBeerTab(false);
        setWineTab(false);
        setMixedTab(true);
    }

    const handleLiquor = () => {
        setBeerTab(false);
        setWineTab(false);
        setMixedTab(false);
        setLiquorTab(true);
    }

    const handleRedWine = () => {
        setWhiteWineTab(false);
        setBubblyTab(false);
        setRedWineTab(true);
    }

    const handleWhiteWine = () => {
        setRedWineTab(false);
        setBubblyTab(false);
        setWhiteWineTab(true);
    }

    const handleBubbly = () => {
        setRedWineTab(false);
        setWhiteWineTab(false);
        setBubblyTab(true);
    }

    const handleCocktails = () => {
        setShotsTab(false);
        setCocktailsTab(true);
    }

    const handleShots = () => {
        setCocktailsTab(false);
        setShotsTab(true);
    }

    const handleGin = () => {        
        setGinTab(true);
        setRumTab(false);
        setTequilaTab(false);
        setVodkaTab(false);
        setWhiskeyTab(false);
    }

    const handleRum = () => {
        setGinTab(false);
        setRumTab(true);
        setTequilaTab(false);
        setVodkaTab(false);
        setWhiskeyTab(false);
    }

    const handleTequila = () => {
        setGinTab(false);
        setRumTab(false);
        setTequilaTab(true);
        setVodkaTab(false);
        setWhiskeyTab(false);
    }

    const handleVodka = () => {
        setGinTab(false);
        setRumTab(false);
        setTequilaTab(false);
        setVodkaTab(true);
        setWhiskeyTab(false);
    }

    const handleWhiskey = () => {
        setGinTab(false);
        setRumTab(false);
        setTequilaTab(false);
        setVodkaTab(false);
        setWhiskeyTab(true);
    }

    return(
        <div>
            {beerTab || wineTab || mixedTab || liquorTab
                ? null
                :<>
                    <button onClick={handleBeer}>Beer</button>
                    <button onClick={handleWine}>Wine</button>
                    <button onClick={handleMixed}>Mixed Drinks</button>
                    <button onClick={handleLiquor}>Liquor</button>
                </>
            }
            
            {beerTab
                ? <>
                    <button onClick={handleBack}>Back</button>
                    <BeerData />
                    </>
                : null
            }
            {wineTab
                ?<>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleRedWine}>Red Wine</button>
                    <button onClick={handleWhiteWine}>White Wine</button>
                    <button onClick={handleBubbly}>Bubbly</button>
                </>
                : null
            }
            {mixedTab
                ?<>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleCocktails}>Cocktails</button>
                    <button onClick={handleShots}>Shots</button>
                </>
                : null
            }
            {liquorTab
                ?<>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleGin}>Gin</button>
                    <button onClick={handleRum}>Rum</button>
                    <button onClick={handleTequila}>Tequila</button>
                    <button onClick={handleVodka}>Vodka</button>
                    <button onClick={handleWhiskey}>Whiskey</button>
                </>
                : null
            }

            {redWineTab
                ? <RedWineData />
                : whiteWineTab
                    ? <WhiteWineData />
                    :bubblyTab
                        ? <BubblyData />
                        : null
            }

            {cocktailsTab
                ? <CocktailsData />
                : shotsTab
                    ? <ShotsData />
                    : null
            }

            {ginTab
                ? <GinData />
                : rumTab
                    ? <RumData />
                    : tequilaTab
                        ? <TequilaData />
                        : vodkaTab
                            ? <VodkaData />
                            : whiskeyTab
                                ? <WhiskeyData />
                                : null
            }
        </div>
    )
}

export default AlchData;