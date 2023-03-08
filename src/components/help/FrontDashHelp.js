import { useState } from "react";
import FrontCodeDetails from "./FrontCodeDetails";
import FrontUserGuide from "./FrontUserGuide";

const FrontDashHelp = (props) => {
    const [ codeDetails, setCodeDetails ] = useState(false)

    const handleCloseModal = () => {
        props.setHelpModal(false)
    }

    const handleUserGuide = () => {
        setCodeDetails(false)
    }

    const handleCodeDetails = () => {
        setCodeDetails(true)
    }

    return(
        <div className='popUpModal'>
            <div className='frontDashHelpContainer'>

                <button onClick={handleCloseModal} className='closePad'>Exit Help</button>

                <div className='frontDashHelpNav'>
                    <button onClick={handleUserGuide}>User Guide</button>
                    <button onClick={handleCodeDetails}>Code Insights</button>
                </div>
                
                {codeDetails
                    ? <FrontCodeDetails
                        tableTabActive={props.tableTabActive}
                        menuTabActive={props.menuTabActive}
                        checkTabActive={props.checkTabActive}
                        paymentTabActive={props.paymentTabActive}
                        summaryTabActive={props.summaryTabActive}
                        />
                    : <FrontUserGuide
                        tableTabActive={props.tableTabActive}
                        menuTabActive={props.menuTabActive}
                        checkTabActive={props.checkTabActive}
                        paymentTabActive={props.paymentTabActive}
                        summaryTabActive={props.summaryTabActive}
                        />
                }
                </div>
        </div>
    )
}

export default FrontDashHelp;