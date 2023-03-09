const SeparateCheck = (props) => {
    return(
        <article className='seperatedCheck' id={'receipt' + (props.receiptNum + 1)}>
            <h3>Receipt {props.receiptNum + 1}</h3>
        </article>
    )
}

export default SeparateCheck;