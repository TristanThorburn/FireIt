const PopUpData = (props) => {
    
    const handlePopUps = (e) => {
        const { value, checked } = e.target;
        const { popUpsList } = props.popUps;

        if(checked){
            props.setPopUps({
                popUpsList:[...popUpsList, value],
            })
        } else {
            props.setPopUps({
                popUpsList:popUpsList.filter((e) => e !== value),
            })
        }
    }

    return(
        <div>
            {props.popUpsAction === 'add'
                ? 'Adding:'
                :props.popUpsAction === 'remove'
                    ? 'Removing:'
                    : null
            }
            <div>
                <input 
                    id='sides'
                    type='checkbox'
                    name='popUpGroup'
                    value='Sides'
                    onChange={handlePopUps}
                    />
                <label htmlFor='sides'>Sides</label>
            </div>

            <div>
                <input 
                    id='proteins'
                    type='checkbox'
                    name='popUpGroup'
                    value='Proteins'
                    onChange={handlePopUps}
                    />
                <label htmlFor='proteins'>Proteins</label>
            </div>

            <div>
                <input 
                    id='dressings'
                    type='checkbox'
                    name='popUpGroup'
                    value='Dressings'
                    onChange={handlePopUps}
                    />
                <label htmlFor='dressings'>Dressings</label>
            </div>

            <div>
                <input 
                    id='foodAddons'
                    type='checkbox'
                    name='popUpGroup'
                    value='Food Addons'
                    onChange={handlePopUps}
                    />
                <label htmlFor='foodAddons'>Food Addons</label>
            </div>

            <div>
                <input 
                    id='mixes'
                    type='checkbox'
                    name='popUpGroup'
                    value='Mixes'
                    onChange={handlePopUps}
                    />
                <label htmlFor='mixes'>Mixes</label>
            </div>

            <div>
                <input 
                    id='barAddons'
                    type='checkbox'
                    name='popUpGroup'
                    value='Bar Addons'
                    onChange={handlePopUps}
                    />
                <label htmlFor='barAddons'>Bar Addons</label>
            </div>
        </div>

    )
}

export default PopUpData;