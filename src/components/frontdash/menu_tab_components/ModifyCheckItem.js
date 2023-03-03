import { db } from "../../../firebase"
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"
import { useAuth } from "../../../contexts/AuthContext";
import { useTable } from "../../../contexts/TableContext";
import { useState, useEffect } from "react";

const ModifyCheckItem = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ infoMessage, setInfoMessage ] = useState('')
    const [ promoOptions, setPromoOptions ] =  useState(false)
    const [ confirmDelete, setConfirmDelete ] = useState(false)
    const [ deletePromoItem, setDeletePromoItem ] = useState(false)
    const [ discountAmount, setDiscountAmount ] = useState('')
    const docRef = doc(db, 'checks', employeeContext.employeeNumber, contextTable, props.checkItemModData.seat)

    // const handleTest = () => {
    //     console.log(props.checkItemModData)
    // }

    const handleCloseModal = () => {
        props.setModifyCheckItem(false)
    }

    // Delete Promo'd Item after Confirmation
    useEffect(() => {
        if(deletePromoItem === true){
            setConfirmDelete(false)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost, 
                    discount:props.checkItemModData.discount})
            })
            setInfoMessage(`${props.checkItemModData.name} deleted`)
            setTimeout(() => {
                props.setModifyCheckItem(false)
                setInfoMessage('')
            }, 1000)
        }
    }, [deletePromoItem, docRef, props])

    // Promo item based on selected amount
    useEffect(() => {
        // Undo 25%
        if(props.checkItemModData.discount === '25' && discountAmount === '25'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost,
                    discount:'25',
                    originalCost:props.checkItemModData.originalCost,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name.replace(/-25%/g, ''), 
                        cost:`${props.checkItemModData.cost * 4/3}`, 
                        discount:'0',
                        originalCost:props.checkItemModData.originalCost,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${props.checkItemModData.name} discount removed`)
            setTimeout(() => {
                setInfoMessage('')
                props.setModifyCheckItem(false)
            }, 1000)
        }
        // Apply 25%
        if(props.checkItemModData.discount === '0' && discountAmount === '25'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost,
                    discount:'0',
                    originalCost:props.checkItemModData.originalCost,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name + '-25%', 
                        cost:`${props.checkItemModData.cost * 3/4}`, 
                        discount:'25',
                        originalCost:props.checkItemModData.originalCost,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${props.checkItemModData.name} discounted 25%`)
            setTimeout(() => {
                setInfoMessage('')
                props.setModifyCheckItem(false)
            }, 1000)
        }
        // Undo 50%
        if(props.checkItemModData.discount === '50' && discountAmount === '50'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost,
                    discount:'50',
                    originalCost:props.checkItemModData.originalCost,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name.replace(/-50%/g, ''), 
                        cost:`${props.checkItemModData.cost * 2}`, 
                        discount:'0',
                        originalCost:props.checkItemModData.originalCost,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${props.checkItemModData.name} discount removed`)
            setTimeout(() => {
                setInfoMessage('')
                props.setModifyCheckItem(false)
            }, 1000)
        }
        // Apply 50%
        if(props.checkItemModData.discount === '0' && discountAmount === '50'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost,
                    discount:'0',
                    originalCost:props.checkItemModData.originalCost,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name + '-50%', 
                        cost:`${props.checkItemModData.cost /2}`, 
                        discount:'50',
                        originalCost:props.checkItemModData.originalCost,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${props.checkItemModData.name} discounted 50%`)
            setTimeout(() => {
                setInfoMessage('')
                props.setModifyCheckItem(false)
            }, 1000)
        }
        // Undo 100%
        if(props.checkItemModData.discount === '100' && discountAmount === '100'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:'0',
                    discount:'100',
                    originalCost:props.checkItemModData.originalCost,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name.replace(/-100%/g, ''), 
                        cost:props.checkItemModData.originalCost,
                        discount:'0',
                        originalCost:props.checkItemModData.originalCost,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${props.checkItemModData.name} discount removed`)
            setTimeout(() => {
                setInfoMessage('')
                props.setModifyCheckItem(false)
            }, 1000)
        }
        // Apply 100%
        if(props.checkItemModData.discount === '0' && discountAmount === '100'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost,
                    discount:'0',
                    originalCost:props.checkItemModData.originalCost,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name + '-100%', 
                        cost:'0', 
                        discount:'100',
                        originalCost:props.checkItemModData.originalCost,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${props.checkItemModData.name} discounted 100%`)
            setTimeout(() => {
                setInfoMessage('')
                props.setModifyCheckItem(false)
            }, 1000)
        }
    }, [discountAmount, docRef, props.checkItemModData.cost, props.checkItemModData.discount, props.checkItemModData.name, props.checkItemModData.originalCost, props])

    const handleDeleteItem = () => {
        if(props.checkItemModData.discount !== '0'){
            setConfirmDelete(true)
        }
        if(props.checkItemModData.discount === '0'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost, 
                    discount:'0',
                    originalCost:props.checkItemModData.originalCost
                })
            })
            setInfoMessage(`${props.checkItemModData.name} deleted`)
            setTimeout(() => {
                props.setModifyCheckItem(false)
                setInfoMessage('')
            }, 1000)
        }
    }

    const handlePromoItem = () => {
        setPromoOptions(true)
    }

    const handleCancelPromo = () => {
        setPromoOptions(false)
    }

    const handle25Discount = () => {
        setDiscountAmount('25')
    }

    const handle50Discount = () => {
       setDiscountAmount('50')
    }

    const handle100Discount = () => {
        setDiscountAmount('100')
    }

    const handleDeletePromoItem = () => {
        setDeletePromoItem(true)
    }

    const handleCancelDeletePromoItem = () => {
        setConfirmDelete(false)
    }

    return(
        <div className='checkModifyModal'>
            <div className='checkModifyContainer'>
                <button onClick={handleCloseModal} className='closePad'>X</button>

                <h3>Modify: {props.checkItemModData.name}</h3>
                {promoOptions
                    ?  <ul>
                        <li>
                            <button onClick={handle25Discount}>25% OFF</button>
                        </li>
                        <li>
                            <button onClick={handle50Discount}>50% OFF</button>
                        </li>
                        <li>
                            <button onClick={handle100Discount}>100% OFF</button>
                        </li>
                        <li>
                            <button onClick={handleCancelPromo}>CANCEL</button>
                        </li>
                    </ul>
                    :confirmDelete
                        ? <div className='confirmPromoDeleteContainer'>
                            <h4>This item has a discount, 100% Promo or QSA recommended. Are you sure  you want to delete?</h4>
                            <button onClick={handleDeletePromoItem}>DELETE</button>
                            <button onClick={handleCancelDeletePromoItem}>CANCEL</button>
                        </div>
                        : <ul>
                            <li>
                                <button onClick={handleDeleteItem}>DELETE</button>
                            </li>
                            <li>
                                <button onClick={handlePromoItem}>PROMO</button>
                            </li>
                        </ul>
                }

                {infoMessage
                    ? <div className='padSuccess'>{infoMessage}</div>
                    : null
                }
            </div>
        </div>
    )
}

export default ModifyCheckItem