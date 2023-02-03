import { useState } from 'react';
import BeerData from './BeerData';
import WineData from './WineData';
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
    const [ ciderTab, setCiderTab ] = useState(false);    
    const [ hardSeltzerTab, setHardSeltzerTab ] = useState(false);
    const [ beerBottleTab, setBeerBottleTab ] = useState(false);
    const [ beerCanTab, setBeerCanTab ] = useState(false);
    const [ beerDraftTab, setBeerDraftTab ] = useState(false);
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
        setCiderTab(false);
        setHardSeltzerTab(false);
        setBeerBottleTab(false);
        setBeerCanTab(false);
        setBeerDraftTab(false);
        setRedWineTab(false);
        setWhiteWineTab(false);
        setBubblyTab(false);
        setCocktailsTab(false);
        setShotsTab(false);
        setGinTab(false);
        setRumTab(false);
        setTequilaTab(false);
        setVodkaTab(false);
        setWhiskeyTab(false);
    }
    // MAIN CATEGORIES-----------------------------------------------
    const handleBeer = () => {        
        setBeerTab(true);
        setWineTab(false);
        setMixedTab(false);
        setLiquorTab(false);
        setCiderTab(false);
        setHardSeltzerTab(false);
    }

    const handleWine = () => {
        setBeerTab(false);
        setWineTab(true);
        setMixedTab(false);
        setLiquorTab(false);
        setCiderTab(false);
        setHardSeltzerTab(false);
    }

    const handleMixed = () => {
        setBeerTab(false);
        setWineTab(false);
        setMixedTab(true);
        setLiquorTab(false);
        setCiderTab(false);
        setHardSeltzerTab(false);
    }

    const handleLiquor = () => {
        setBeerTab(false);
        setWineTab(false);
        setMixedTab(false);
        setLiquorTab(true);
        setCiderTab(false);
        setHardSeltzerTab(false);
    }

    // SUB TABS--------------------------------------------------------
    const handleCider = () => {
        setBeerTab(false);
        setWineTab(false);
        setMixedTab(false);
        setLiquorTab(false);
        setCiderTab(true);
        setHardSeltzerTab(false);
    }

    const handleHardSeltzer = () => {
        setBeerTab(false);
        setWineTab(false);
        setMixedTab(false);
        setLiquorTab(false);
        setCiderTab(false);
        setHardSeltzerTab(true);
    }

    // BEERS
    const handleBeerBottle = () => {
        setBeerBottleTab(true);
        setBeerCanTab(false);
        setBeerDraftTab(false);
        props.setActiveDataDoc('beer bottle');
        props.setDocQuery(['drinks', 'alcoholic', 'beer', 'type', 'bottle'])
    }

    const handleBeerCan = () => {
        setBeerBottleTab(false);
        setBeerCanTab(true);
        setBeerDraftTab(false);
        props.setActiveDataDoc('beer can');
        props.setDocQuery(['drinks', 'alcoholic', 'beer', 'type', 'can'])
    }

    const handleBeerDraft = () => {
        setBeerBottleTab(false);
        setBeerCanTab(false);
        setBeerDraftTab(true);
        props.setActiveDataDoc('beer draft');
        props.setDocQuery(['drinks', 'alcoholic', 'beer', 'type', 'draft'])
    }

    // WINES
    const handleRedWine = () => {
        setWhiteWineTab(false);
        setBubblyTab(false);
        setRedWineTab(true);
        props.setActiveDataDoc('red wine');
        props.setDocQuery(['drinks', 'alcoholic', 'wine', 'type', 'red wine'])
    }

    const handleWhiteWine = () => {
        setRedWineTab(false);
        setBubblyTab(false);
        setWhiteWineTab(true);
        props.setActiveDataDoc('white wine');
        props.setDocQuery(['drinks', 'alcoholic', 'wine', 'type', 'white wine'])
    }

    const handleBubbly = () => {
        setRedWineTab(false);
        setWhiteWineTab(false);
        setBubblyTab(true);
        props.setActiveDataDoc('bubbly');
        props.setDocQuery(['drinks', 'alcoholic', 'wine', 'type', 'bubbly'])
    }

    // MIXED
    const handleCocktails = () => {
        setShotsTab(false);
        setCocktailsTab(true);
    }

    const handleShots = () => {
        setCocktailsTab(false);
        setShotsTab(true);
    }

    // LIQUOR
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
            {beerTab || wineTab || mixedTab || liquorTab || ciderTab || hardSeltzerTab
                ? null
                :<>
                    <button onClick={handleBeer}>Beer</button>
                    <button onClick={handleWine}>Wine</button>
                    <button onClick={handleMixed}>Mixed Drinks</button>
                    <button onClick={handleLiquor}>Liquor</button>
                    <button onClick={handleCider}>Cider</button>
                    <button onClick={handleHardSeltzer}>Hard Seltzer, etc.</button>
                </>
            }
            
            {beerTab
                ? <>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleBeerBottle}>Bottle</button>
                    <button onClick={handleBeerCan}>Can</button>
                    <button onClick={handleBeerDraft}>Draft</button>
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

            {beerBottleTab || beerCanTab || beerDraftTab
                ? <BeerData
                    activeTab={props.activeTab}
                    docQuery={props.docQuery} 
                    />
                : null
            }

            {redWineTab || whiteWineTab || bubblyTab
                ? <WineData
                    activeTab={props.activeTab}
                    docQuery={props.docQuery}
                    />
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