const ShiftModal = (props) => {
    const handleDone = () => {
        props.setAdjustingShift(false)
    }
    return(
        <div className='popUpModal'>
            <h4>SHIFT</h4>
            <button onClick={handleDone}>DONE</button>
        </div>
    )
}

export default ShiftModal;