import { useState } from 'react';
import BeerData from './BeerData';
import WineData from './WineData';
import MixedData from './MixedData';
import LiquorsData from './LiquorsData';
import CiderData from './CiderData';
import HardSeltzerData from './HardSeltzerData';

const AlchData = (props) => {
    const [ alcoholTab, setAlcoholTab ] = useState('')
    const [ drinkType, setDrinkType ] = useState('')

    const handleBack = () => {
        setAlcoholTab('')
        setDrinkType('')
    }
    // MAIN CATEGORIES-----------------------------------------------
    const handleBeer = () => {        
        setAlcoholTab('beer')
    }

    const handleWine = () => {
        setAlcoholTab('wine')
    }

    const handleMixed = () => {
        setAlcoholTab('mixed')
    }

    const handleLiquor = () => {
        setAlcoholTab('liquor')
    }

    const handleCider = () => {
        setAlcoholTab('cider')
        setDrinkType('cider');
        props.setDocQuery(['drinks', 'alcoholic', 'cider'])
    }

    const handleHardSeltzer = () => {
        setAlcoholTab('seltzer')
        setDrinkType('hard seltzer');
        props.setDocQuery(['drinks', 'alcoholic', 'hard seltzer'])
    }

    // BEERS
    const handleBeerBottle = () => {
        setDrinkType('beer bottle');
        props.setDocQuery(['drinks', 'alcoholic', 'beer', 'type', 'bottle'])
    }

    const handleBeerCan = () => {
        setDrinkType('beer can');
        props.setDocQuery(['drinks', 'alcoholic', 'beer', 'type', 'can'])
    }

    const handleBeerDraft = () => {
        setDrinkType('beer draft');
        props.setDocQuery(['drinks', 'alcoholic', 'beer', 'type', 'draft'])
    }

    // WINES
    const handleRedWine = () => {
        setDrinkType('red wine');
        props.setDocQuery(['drinks', 'alcoholic', 'wine', 'type', 'red wine'])
    }

    const handleWhiteWine = () => {
        setDrinkType('white wine');
        props.setDocQuery(['drinks', 'alcoholic', 'wine', 'type', 'white wine'])
    }

    const handleBubbly = () => {
        setDrinkType('bubbly');
        props.setDocQuery(['drinks', 'alcoholic', 'wine', 'type', 'bubbly'])
    }

    // MIXED
    const handleCocktails = () => {
        setDrinkType('cocktails');
        props.setDocQuery(['drinks', 'alcoholic', 'spirits', 'type', 'cocktails'])
    }

    const handleShots = () => {
        setDrinkType('shots');
        props.setDocQuery(['drinks', 'alcoholic', 'spirits', 'type', 'shots'])
    }

    // LIQUOR
    const handleGin = () => {        
        setDrinkType('gin');
        props.setDocQuery(['drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'gin'])
    }

    const handleRum = () => {
        setDrinkType('rum');
        props.setDocQuery(['drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'rum'])
    }

    const handleTequila = () => {
        setDrinkType('tequila');
        props.setDocQuery(['drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'tequila'])
    }

    const handleVodka = () => {
        setDrinkType('vodka');
        props.setDocQuery(['drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'vodka'])
    }

    const handleWhiskey = () => {
        setDrinkType('whiskey');
        props.setDocQuery(['drinks', 'alcoholic', 'spirits', 'type', 'liquor', 'type', 'whiskey'])
    }

    return(
        <div>
            {alcoholTab === ''
                ?<div className='alcoholNavButtons'>
                    <button onClick={handleBeer}>Beer</button>
                    <button onClick={handleWine}>Wine</button>
                    <button onClick={handleMixed}>Mixed Drinks</button>
                    <button onClick={handleLiquor}>Liquor</button>
                    <button onClick={handleCider}>Cider</button>
                    <button onClick={handleHardSeltzer}>Hard Seltzer, etc.</button>
                </div>
                : null
            }
            
            {alcoholTab === 'beer'
                ? <div className='alcoholNavButtons'>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleBeerBottle}>Bottle</button>
                    <button onClick={handleBeerCan}>Can</button>
                    <button onClick={handleBeerDraft}>Draft</button>
                    </div>
                : null
            }
            {alcoholTab === 'wine'
                ?<div className='alcoholNavButtons'>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleRedWine}>Red Wine</button>
                    <button onClick={handleWhiteWine}>White Wine</button>
                    <button onClick={handleBubbly}>Bubbly</button>
                </div>
                : null
            }
            {alcoholTab === 'mixed'
                ?<div className='alcoholNavButtons'>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleCocktails}>Cocktails</button>
                    <button onClick={handleShots}>Shots</button>
                </div>
                : null
            }
            {alcoholTab === 'liquor'
                ?<div className='alcoholNavButtons'>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleGin}>Gin</button>
                    <button onClick={handleRum}>Rum</button>
                    <button onClick={handleTequila}>Tequila</button>
                    <button onClick={handleVodka}>Vodka</button>
                    <button onClick={handleWhiskey}>Whiskey</button>
                </div>
                : null
            }

            {alcoholTab === 'cider'
                ? <>
                    <div className='alcoholNavButtons'>
                        <button onClick={handleBack}>Back</button>
                    </div>
                    <CiderData
                        activeTab={drinkType}
                        docQuery={props.docQuery} 
                        />
                </>
                : null
            }

            {alcoholTab === 'seltzer'
                ? <>
                    <div className='alcoholNavButtons'>
                        <button onClick={handleBack}>Back</button>
                    </div>
                    <HardSeltzerData
                        activeTab={drinkType}
                        docQuery={props.docQuery} 
                        />
                </>
                : null
            }

            {drinkType === 'beer bottle'
                || drinkType === 'beer can'
                || drinkType === 'beer draft'
                ? <BeerData
                    activeTab={drinkType}
                    docQuery={props.docQuery} 
                    />
                : null
            }

            {drinkType === 'bubbly'
                || drinkType === 'red wine'
                || drinkType === 'white wine'
                ? <WineData
                    activeTab={drinkType}
                    docQuery={props.docQuery}
                    />
                : null
            }

            {drinkType === 'cocktails'
                || drinkType === 'shots'
                ? <MixedData
                    activeTab={drinkType}
                    docQuery={props.docQuery}
                    />
                : null
            }

            {drinkType === 'gin'
                || drinkType === 'rum'
                || drinkType === 'tequila'
                || drinkType === 'vodka'
                || drinkType === 'whiskey'
                ? <LiquorsData
                    activeTab={drinkType}
                    docQuery={props.docQuery}
                    />
                : null
            }
        </div>
    )
}

export default AlchData;