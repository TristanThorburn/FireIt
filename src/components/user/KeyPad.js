const KeyPad = () => {
    const userNumber = [];
    const userPassword = [];

    const handleClick = (e) => {
        if (userNumber.length <=3){
            userNumber.push(e.target.textContent)
        }
        // if (userNumber.length = 3 && userPassword.length <=3){
        //     userPassword.push(e.target.textContent)
        // }
        console.log("UserNumber", userNumber, userNumber.length);
    }

    return(
        <div className='keypad'>
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
    </div>
    )
}

export default KeyPad;