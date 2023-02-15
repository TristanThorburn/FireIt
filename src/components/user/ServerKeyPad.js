const ServerKeyPad = () => {

    return(
        <div className='keypad'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>User?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td onClick={handleClick}><button>1</button></td>
                            <td onClick={handleClick}><button>2</button></td>
                            <td onClick={handleClick}><button>3</button></td>
                        </tr>
                        <tr>
                            <td onClick={handleClick}><button>4</button></td>
                            <td onClick={handleClick}><button>5</button></td>
                            <td onClick={handleClick}><button>6</button></td>
                        </tr>
                        <tr>
                            <td onClick={handleClick}><button>7</button></td>
                            <td onClick={handleClick}><button>8</button></td>
                            <td onClick={handleClick}><button>9</button></td>
                        </tr>
                        <tr>
                            <td onClick={handleClear}><button>⛔</button></td>
                            <td onClick={handleClick}><button>0</button></td>
                            <td onClick={handleUser} hidden={!submitable}><button>🔥</button></td>
                        </tr>
                    </tbody>
                </table>

                <div className='padError'>{error}</div>
            </div>
    )

}

export default ServerKeyPad;