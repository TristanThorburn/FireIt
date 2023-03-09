const CheckSeat = (props) => {
    return(
        <table
            className='checkSeatInfo'
            >
            <thead>
                {props.seperatedSeatData.seatNumber
                    ? <tr>
                        <th
                            colSpan={2}
                            >Seat: {props.seperatedSeatData.seatNumber}
                        </th>
                    </tr>
                    : null
                }
            </thead>
            <tbody>
                {props.seperatedSeatData?.order?.map((order, i) => {
                    return(
                        <tr
                            className='seatItemList'
                            key={i}>
                            <td
                                data-name={order.item}
                                data-cost={order.cost}
                                >{order.item}</td>
                            <td
                                data-name={order.item}
                                data-cost={order.cost}
                                className='receiptItemCost'
                                >{order.cost}</td>
                        </tr>    
                        )
                    })
                }   
            </tbody>
        </table> 
    )
}

export default CheckSeat;