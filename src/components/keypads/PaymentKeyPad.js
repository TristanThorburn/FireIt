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
    const [ newPaymentAmount, setNewPaymentAmount ] = useState(0);
    const [ newPaymentMethod, setNewPaymentMethod ] = useState('');
    const [ newPayment, setNewPayment ] = useState('');
    const [ submitPayments, setSubmitPayments ] = useState(false)
    const [totalTipAmount, setTotalTipAmount ] = useState(0)

    // Combine entered info to display on payment details
    useEffect(() => {
        if(newPayment !== ''){
            let totalPayments = []
            // push to payments array, checking if it has payments already
            if(payments.length >= 1){
                payments.forEach(payment => {
                    totalPayments.push(payment)
                })
                totalPayments.push(newPayment)
                setPayments(totalPayments)
                setNewPaymentAmount(0)
                setNewPaymentMethod('')
                setEnterTip(false)
                setSuccess('')
                setNewPayment('')
            }
            if(payments.length === 0){
                setPayments([newPayment])
                setNewPaymentAmount(0)
                setNewPaymentMethod('')
                setEnterTip(false)
                setSuccess('')
                setNewPayment('')
            }
        }
    }, [newPayment, payments])

    // Calculate remaing value of receipt, and total value of entered tips
    useEffect(() => {
        let paymentArray = []
        let tipsArray = []
        const paymentDashboard = document.querySelector('.paymentInfoDisplay')
        const receiptTotal = paymentDashboard.querySelector('[data-receipttotal]')
        const paymentValues = paymentDashboard.querySelectorAll('[data-paymentamount]')
        const tipValues = paymentDashboard.querySelectorAll('[data-tipamount]')
        paymentValues.forEach(payment => {
            paymentArray.push(Number(payment.dataset.paymentamount))
        })
        tipValues.forEach(tip => {
            tipsArray.push(Number(tip.dataset.tipamount))
        })
        const paymentSum = paymentArray.reduce((a, b) => a + b, 0)
        const tipsSum = tipsArray.reduce((a, b) => a + b, 0)
        const totalRemaining = Number(receiptTotal.dataset.receipttotal) - paymentSum
        setTotalTipAmount(tipsSum)
        setRemainingTotal(totalRemaining)
    }, [payments, paymentsChange])

    // Prevent < 0 receipt totals, allow submit when === 0
    useEffect(() => {
        if(remainingTotal > 0){
            setSuccess('')
            setError('')
        }
        if(remainingTotal === 0){
            setTimeout(() => {
                setSubmitPayments(true)
                setSuccess('Submit payments?')
            }, 250)
        }
        if(remainingTotal < 0){
            setError('Payments total more than receipt cost')
        }
    }, [remainingTotal])

    // update display of payment details when one is removed
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
            receiptNumber:props.receiptToSettle.receipt,
        })
        props.setPaymentKeyPadActive(false)
    }

    const handleCash = () => {
        setNewPaymentAmount(Number(padCombo.join().replace(/,/g, '')))
        setNewPaymentMethod('cash')
        padCombo = []
        setSuccess('Enter tip')
        setEnterTip(true)
    }

    const handleInterac = () => {
        setNewPaymentAmount(Number(padCombo.join().replace(/,/g, '')))
        setNewPaymentMethod('interac')
        padCombo = []
        setSuccess('Enter tip')
        setEnterTip(true)
    }

    const handleAmex = () => {
        setNewPaymentAmount(Number(padCombo.join().replace(/,/g, '')))
        setNewPaymentMethod('amex')
        padCombo = []
        setSuccess('Enter tip')
        setEnterTip(true)
    }

    const handleVisa = () => {
        setNewPaymentAmount(Number(padCombo.join().replace(/,/g, '')))
        setNewPaymentMethod('visa')
        padCombo = []
        setSuccess('Enter tip')
        setEnterTip(true)
    }

    const handleMastercard = () => {
        setNewPaymentAmount(Number(padCombo.join().replace(/,/g, '')))
        setNewPaymentMethod('mastercard')
        padCombo = []
        setSuccess('Enter tip')
        setEnterTip(true)
    }

    const handleEnterTip = () => {
        const paymentInfo = {}
        paymentInfo.amount = newPaymentAmount
        paymentInfo.method = newPaymentMethod
        paymentInfo.tip = Number(padCombo.join().replace(/,/g, ''))
        setNewPayment(paymentInfo)
        padCombo = []
    }

    const handleCancelPayment = (e) => {
        const selectedPayment = e.currentTarget
        let paymentsList = payments
        const filterAmount = Number(selectedPayment.dataset.paymentamount)
        const filterMethod = selectedPayment.dataset.paymentmethod
        const filterTip = Number(selectedPayment.dataset.tipamount)
        const indexToRemove = payments.findIndex(
            obj => 
            obj.amount === filterAmount 
            &&
            obj.method === filterMethod
            &&
            obj.tip === filterTip
            )
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
                                    data-tipamount={payment.tip}
                                    >
                                    <p className='paymentType'>{payment.method}</p>
                                    <p className='paymentAmount'>${payment.amount}</p>
                                    <p className='tipAmount'>Tip: ${payment.tip}</p>
                                </li>
                            )
                        })}
                    </ul>

                    <div className='paymentsCalculations'>
                        <h3>Remaining: ${remainingTotal}</h3>
                        <h4>Tips: ${totalTipAmount}</h4>
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

                {submitPayments
                    ? <div className='tipButtonsContainer'>
                        <button 
                            onClick={handleSubmit}
                            >🔥
                        </button>
                    </div>
                    : enterTip
                        ? <div className='tipButtonsContainer'>
                            <button 
                                onClick={handleEnterTip}
                                >💰
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