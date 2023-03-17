import visa from '../../assets/visa.png';
import mastercard from '../../assets/mastercard.png';
import amex from '../../assets/amex.png';
import cash from '../../assets/cash.png';
import interac from '../../assets/interac.png';
import { useEffect, useState } from 'react';

const PaymentKeyPad = (props) => {
    let padCombo = []
    const [ error, setError ] = useState('')
    const [ success, setSuccess ] = useState('')
    const [ payments, setPayments ] = useState([])
    const [ paymentsChange, setPaymentsChange ] = useState([])
    const [ remainingTotal, setRemainingTotal ] = useState(props.receiptToSettle.receiptCost)
    const [ enterTip, setEnterTip ] = useState(false);
    const [ tipAmount, setTipAmount ] = useState(0)

    // Calculate remaing value of receipt
    useEffect(() => {
        let paymentArray = []
        const paymentDashboard = document.querySelector('.paymentInfoDisplay')
        const receiptTotal = paymentDashboard.querySelector('[data-receipttotal]')
        const paymentValues = paymentDashboard.querySelectorAll('[data-paymentamount]')
        paymentValues.forEach(payment => {
            paymentArray.push(Number(payment.dataset.paymentamount))
        })
        const sum = paymentArray.reduce((a, b) => a + b, 0)
        const totalRemaining = Number(receiptTotal.dataset.receipttotal) - sum
        setRemainingTotal(totalRemaining)
    }, [payments, paymentsChange])

    // Prevent < 0, allow submit when = 0
    useEffect(() => {
        if(remainingTotal > 0){
            setEnterTip(false)
            setSuccess('')
            setError('')
        }
        if(remainingTotal === 0){
            setEnterTip(true)
            setSuccess('Enter your tip amount, and submit payments')
        }
        if(remainingTotal < 0){
            setError('Payments total more than receipt cost')
        }
    }, [remainingTotal])

    useEffect(() => {
        if(paymentsChange.length > 0){
            setPayments(paymentsChange)
            setPaymentsChange([])
        }
    }, [paymentsChange])

    const handleCloseModal = () => {
        props.setPaymentKeyPadActive(false)
    }

    const handleClick = (e) => {
        padCombo.push(e.currentTarget.textContent)
    }

    const handleClear = () => {
        padCombo = [];
    }

    const handleSubmit = () => {
        props.setFullPaymentData({
            payments:payments,
            tip:tipAmount,
            receipt:props.receiptToSettle,
        })
        props.setPaymentKeyPadActive(false)
    }

    const handleCash = () => {
        let totalPayments = []
        if(payments.length >= 1){
            payments.forEach(payment => {
                totalPayments.push(payment)
            })
            const newPayment = {
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'cash'
            }
            totalPayments.push(newPayment)
            setPayments(totalPayments)
            padCombo = []
        }
        if(payments.length === 0){
            const newPayment = [{
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'cash'
            }]
            setPayments(newPayment)
            padCombo = []
        }
    }

    const handleInterac = () => {
        let totalPayments = []
        if(payments.length >= 1){
            payments.forEach(payment => {
                totalPayments.push(payment)
            })
            const newPayment = {
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'interac'
            }
            totalPayments.push(newPayment)
            setPayments(totalPayments)
            padCombo = []
        }
        if(payments.length === 0){
            const newPayment = [{
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'interac'
            }]
            setPayments(newPayment)
            padCombo = []
        }
    }

    const handleAmex = () => {
        let totalPayments = []
        if(payments.length >= 1){
            payments.forEach(payment => {
                totalPayments.push(payment)
            })
            const newPayment = {
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'amex'
            }
            totalPayments.push(newPayment)
            setPayments(totalPayments)
            padCombo = []
        }
        if(payments.length === 0){
            const newPayment = [{
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'amex'
            }]
            setPayments(newPayment)
            padCombo = []
        }
    }

    const handleVisa = () => {
        let totalPayments = []
        if(payments.length >= 1){
            payments.forEach(payment => {
                totalPayments.push(payment)
            })
            const newPayment = {
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'visa'
            }
            totalPayments.push(newPayment)
            setPayments(totalPayments)
            padCombo = []
        }
        if(payments.length === 0){
            const newPayment = [{
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'visa'
            }]
            setPayments(newPayment)
            padCombo = []
        }
    }

    const handleMastercard = () => {
        let totalPayments = []
        if(payments.length >= 1){
            payments.forEach(payment => {
                totalPayments.push(payment)
            })
            const newPayment = {
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'mastercard'
            }
            totalPayments.push(newPayment)
            setPayments(totalPayments)
            padCombo = []
        }
        if(payments.length === 0){
            const newPayment = [{
                amount:Number(padCombo.join().replace(/,/g, '')),
                method:'mastercard'
            }]
            setPayments(newPayment)
            padCombo = []
        }
    }

    const handleEnterTip = () => {
        setTipAmount(Number(padCombo.join().replace(/,/g, '')))
    }

    const handleCancelPayment = (e) => {
        const selectedPayment = e.currentTarget
        let paymentsList = payments
        const filterAmount = Number(selectedPayment.dataset.paymentamount)
        const filterMethod = selectedPayment.dataset.paymentmethod
        const indexToRemove = payments.findIndex(
            obj => 
            obj.amount === filterAmount 
            &&
            obj.method === filterMethod
            )
        // setPayments(filteredPayment)
        // payments.splice(indexToRemove, 1)
        // let myArray = payments.filter(index => {
        //     return index !== indexToRemove
        // })
        // setPayments(myArray)
        paymentsList.splice(indexToRemove, 1)
        setPaymentsChange(paymentsList)
    }

    return(
        <article className='popUpModal'>
            <div className='paymentDetails'>
                <button onClick={handleCloseModal} className='closePad'>X</button>
                <div className='paymentInfoDisplay'>
                    <h2
                        data-receipttotal={props.receiptToSettle.receiptCost}
                        >
                        Receipt: {props.receiptToSettle.receipt} &nbsp;
                        Total: ${props.receiptToSettle.receiptCost}
                    </h2>

                    <ul>
                        {payments.map((payment, i) => {
                            return(
                                <li
                                    key={i}
                                    onClickCapture={handleCancelPayment}
                                    className='payment'
                                    data-paymentmethod={payment.method}
                                    data-paymentamount={payment.amount}
                                    >
                                    <p className='paymentType'>{payment.method}</p>
                                    <p className='paymentAmount'>${payment.amount}</p>
                                </li>
                            )
                        })}
                    </ul>

                    <div className='paymentsCalculations'>
                        <h3>Remaining: ${remainingTotal}</h3>
                        <h4>Tip: ${tipAmount}</h4>
                    </div>
                </div>
                
                <div className='paymentsStatus'>
                    {success
                        ? <div className='padSuccess'>{success}</div>
                        : error
                            ? <div className='padError'>{error}</div>
                            : null
                    }
                </div>

                {enterTip
                    ? <div className='tipButtonsContainer'>
                        <button 
                            onClick={handleEnterTip}
                            >💰
                        </button>
                        <button 
                            onClick={handleSubmit}
                            >🔥
                        </button>
                    </div>
                    : <ul className='paymentMethods'>
                        <li>
                            <button
                                onClick={handleCash}
                                >
                                <img src={cash} alt="" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleInterac}
                                >
                                <img src={interac} alt="" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleAmex}
                                >
                                <img src={amex} alt="" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleVisa}
                                >
                                <img src={visa} alt="" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleMastercard}
                                >
                                <img src={mastercard} alt="" />
                            </button>
                        </li>
                    </ul>
                }

                

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
                                <td><button onClick={handleClick}>.</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </article>
    )
}

export default PaymentKeyPad;