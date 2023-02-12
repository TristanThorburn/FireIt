import { Link } from 'react-router-dom';
import TableMap from '../summary/table/TableMap';
import { useState } from 'react';

const TableMapData = () => {
    const [ mapUpdateable, setMapUpdateable ] = useState(false)

    const enableUpdate = () => {
        setMapUpdateable(true)
    }

    const disableUpdate = () => {
        setMapUpdateable(false)
    }

    return(
        <div className='tableBackDash'>            
            <Link to='/backend-dash'>Return to Backend Dashboard</Link>

            <h2>Tables and Map Setup</h2>

            {mapUpdateable
                ? <div className='tableMapDirections'>
                    <button onClick={disableUpdate}>Disable Updates</button>
                    <p>Click to move, then click to set new position</p>
                </div>
                : <button onClick={enableUpdate}>Update Map</button>
            }

            <div className='tableTab'>
                <TableMap updateable={mapUpdateable} setMapUpdateable={setMapUpdateable}/>
            </div>            
        </div>
    )
}

export default TableMapData;