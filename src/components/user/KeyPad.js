const KeyPad = (props) => {
    const userCombo = [];
    const pinCombo = [];

    const handleClick = (e) => {
        if (userCombo.length <=3){
            userCombo.push(e.target.textContent)
        } else if(userCombo.length === 4 && pinCombo.length <=3){
            pinCombo.push(e.target.textContent)
        }
        if(userCombo.length === 4 && pinCombo.length === 4){
            props.user(userCombo.join().replace(/,/g, ''))
            props.pin(pinCombo.join().replace(/,/g, ''))
            props.button(true)
        }
    }

    return(
        <table>
            <thead>
                <tr>
                    <th colSpan={3}>Fire It</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td onClick={handleClick}>1</td>
                    <td onClick={handleClick}>2</td>
                    <td onClick={handleClick}>3</td>
                </tr>
                <tr>
                    <td onClick={handleClick}>4</td>
                    <td onClick={handleClick}>5</td>
                    <td onClick={handleClick}>6</td>
                </tr>
                <tr>
                    <td onClick={handleClick}>7</td>
                    <td onClick={handleClick}>8</td>
                    <td onClick={handleClick}>9</td>
                </tr>
                <tr>
                    <td className='nonClickTable'></td>
                    <td onClick={handleClick}>0</td>
                    <td className='nonClickTable'></td>
                </tr>
            </tbody>
        </table>
    )

}

export default KeyPad;