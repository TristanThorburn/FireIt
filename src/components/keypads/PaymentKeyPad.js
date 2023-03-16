import visa from '../../assets/visa.png';
import mastercard from '../../assets/mastercard.png';
import amex from '../../assets/amex.png';
import cash from '../../assets/cash.png';
import interac from '../../assets/interac.png';

const PaymentKeyPad = (props) => {
    // let numberCombo = []

    const handleTest = () => {
        console.log(props.receiptToSettle)
    }

    // const handleCloseModal = () => {
    //     props.setPaymentKeyPadActive(false)
    // }

    const handleClick = (e) => {
        console.log(e)
    }

    const handleClear = () => {
        // numberCombo = []
        console.log('cleared')
    }

    const handleSubmit = () => {
        console.log('submitted')
    }

    return(
        <article className='popUpModal'>
            <div className='paymentDetails'>
                {/* <button onClick={handleCloseModal} className='closePad'>X</button> */}
<button onClick={handleTest} className='testButton'>TEST</button>
                <div className='paymentInfoDisplay'>
                    <h2>
                        Receipt: {props.receiptToSettle.receipt} &nbsp;
                        Total: ${props.receiptToSettle.receiptCost}
                    </h2>
                </div>
                <ul className='paymentMethods'>
                    <li><button><img src={cash} alt="" /></button></li>
                    <li><button><img src={interac} alt="" /></button></li>
                    <li><button><img src={amex} alt="" /></button></li>
                    <li><button><img src={visa} alt="" /></button></li>
                    <li><button><img src={mastercard} alt="" /></button></li>
                </ul>
                <div className='keypad'>
                    <table>
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
                                <td><button onClick={handleSubmit}>🔥</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </article>
    )
}

export default PaymentKeyPad;