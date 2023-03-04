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

            <div className='backDashHelpButtonDiv'>
                <h2>Payments Data</h2>

                <button onClick={handlePaymentDataHelp}>🔥</button>

                <h3 onClick={handlePaymentDataHelp}>INFO</h3>
            </div>

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