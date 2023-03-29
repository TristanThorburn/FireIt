import { Link } from 'react-router-dom';
import { useState } from 'react';
import BackDashHelp from '../help/BackDashHelp';

const PaymentData = () => {
    const [ paymentDataHelp, setPaymentDataHelp ] = useState(false)

    const handlePaymentDataHelp = () => {
        setPaymentDataHelp(true)
    }

    return(
        <section className='paymentData'>
            <header className='backTitleAndInfo'>
                <h2>Payment Data</h2>
                    <button onClickCapture={handlePaymentDataHelp} className='infoButton'>
                        🔥
                        <p>INFO</p>
                    </button>
                    
            </header>

            {paymentDataHelp
                ? <BackDashHelp
                    paymentDataHelp={paymentDataHelp}
                    setPaymentDataHelp={setPaymentDataHelp}
                    />
                : null
            }

            <p>Under Construction</p>
            <Link to='/backend-dash'>
                <button className='newItemButton deleteItemButton'>Back to Dashboard</button>
            </Link>
        </section>
    )
}

export default PaymentData;