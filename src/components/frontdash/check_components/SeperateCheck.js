// import { useState } from "react";
// import CheckSeat from "./CheckSeat";

const SeparateCheck = (props) => {
    // const [ displaySeperatedSeat, setDisplaySeperatedSeat ] = useState(false)

    const handleTest = () => {
        const receiptIdentity = document.querySelector('.seperatedCheck')
        console.log('receiptidendity.id', receiptIdentity, props.receiptNum +1)
    }

    // Put the selected seat on the selected check
    // useEffect(() => {
    //     if(props.appendReceipt){
    //         const receiptIdentity = document.querySelectorAll('.seperatedCheck')
    //         receiptIdentity.forEach(receipt => {
    //             if(props.appendReceipt.id === receiptIdentity.dataset.receipt){
    //                 console.log(receipt.id, 'match')
    //                 setDisplaySeperatedSeat(true)
    //             }
    //         })
    //     }
    // }, [props.appendReceipt])

    return(
        <article className='seperatedCheck' id={props.receiptNum + 1}>
<button onClick={handleTest} className='testButton'>TEST</button>
            <h3>DEMO Receipt {props.receiptNum + 1}</h3>
            {/* <table
                className='checkSeatInfo'
                >
                <thead>
                    <tr>
                        <th
                            colSpan={2}
                            >Seat: #
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Item</td>
                        <td className='receiptItemCost'>Cost</td>
                    </tr>    
                </tbody>
            </table> */}
            {/* {displaySeperatedSeat
                && props.seperatedSeatData
                ? <CheckSeat
                    seperatedSeatData={props.seperatedSeatData}
                    />
                : null
            } */}
        </article>
    )
}

export default SeparateCheck;