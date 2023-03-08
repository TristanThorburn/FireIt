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
            <header className='backDashHeader'>
                <h2>Payment Data</h2>
                <div className='infoButton'>
                    <button onClick={handlePaymentDataHelp}>🔥</button>
                    <p onClick={handlePaymentDataHelp}>INFO</p>
                </div>
            </header>

            {paymentDataHelp
                ? <BackDashHelp
                    paymentDataHelp={paymentDataHelp}
                    setPaymentDataHelp={setPaymentDataHelp}
                    />
                : null
            }

            <p>Under Construction</p>
            <Link to='/backend-dash'>Return to Backend Dashboard</Link>
        </section>
    )
}

export default PaymentData;