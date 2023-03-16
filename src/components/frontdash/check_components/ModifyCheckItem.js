import { db } from "../../../firebase"
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc, deleteDoc } from "firebase/firestore"
import { useAuth } from "../../../contexts/AuthContext";
import { useTable } from "../../../contexts/TableContext";
import { useState, useEffect } from "react";

const ModifyCheckItem = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ infoMessage, setInfoMessage ] = useState('')
    const [ promoOptions, setPromoOptions ] =  useState(false)
    const [ confirmPromoDelete, setConfirmPromoDelete ] = useState(false)
    const [ deletePromoItem, setDeletePromoItem ] = useState(false)
    const [ confirmQsaDelete, setConfirmQsaDelete ] = useState(false)
    const [ discountAmount, setDiscountAmount ] = useState('')
    const [ qsaItem, setQsaItem ] = useState(false);
    const [ deleteQsaItem, setDeleteQsaItem ] = useState(false);
    const docRef = doc(db, 'orders', employeeContext.employeeNumber, contextTable, props.checkItemModData.seat)

    const handleCloseModal = () => {
        props.setModifyCheckItem(false)
    }

    // Delete Promo'd Item after Confirmation
    useEffect(() => {
        if(deletePromoItem === true){
            setConfirmPromoDelete(false)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost, 
                    discount:props.checkItemModData.discount,
                    originalCost:props.checkItemModData.originalCost,
                    qsa:props.checkItemModData.qsa,
                    time:props.checkItemModData.time,
                })
            })
            setDeletePromoItem(false)
            setInfoMessage(`${props.checkItemModData.name} deleted`)
            setTimeout(() => {
                props.setModifyCheckItem(false)
                setInfoMessage('')
            }, 1000)
        }
        if(deleteQsaItem === true){
            setConfirmQsaDelete(false)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost, 
                    discount:props.checkItemModData.discount,
                    originalCost:props.checkItemModData.originalCost,
                    qsa:props.checkItemModData.qsa,
                    time:props.checkItemModData.time,
                })
            })
            setDeleteQsaItem(false)
            setInfoMessage(`${props.checkItemModData.name} deleted`)
            setTimeout(() => {
                props.setModifyCheckItem(false)
                setInfoMessage('')
            }, 1000)
        }
        const deleteCleanUp = async () =>{
            const docSnap = await getDoc(docRef)
            if(docSnap.data() !== undefined && docSnap.data().order.length < 1){
                deleteDoc(docRef)
                props.setDoesSeatExist(false)
            }
        }
        deleteCleanUp()
    }, [deletePromoItem, docRef, props ,deleteQsaItem])

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
                    qsa:'false',
                    time:props.checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name.replace(/-25%/g, ''), 
                        cost:`${props.checkItemModData.cost * 4/3}`, 
                        discount:'0',
                        originalCost:props.checkItemModData.originalCost,
                        qsa:'false',
                        time:props.checkItemModData.time,
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
                    qsa:'false',
                    time:props.checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name + '-25%', 
                        cost:`${props.checkItemModData.cost * 3/4}`, 
                        discount:'25',
                        originalCost:props.checkItemModData.originalCost,
                        qsa:'false',
                        time:props.checkItemModData.time,
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
                    qsa:'false',
                    time:props.checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name.replace(/-50%/g, ''), 
                        cost:`${props.checkItemModData.cost * 2}`, 
                        discount:'0',
                        originalCost:props.checkItemModData.originalCost,
                        qsa:'false',
                        time:props.checkItemModData.time,
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
                    qsa:'false',
                    time:props.checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name + '-50%', 
                        cost:`${props.checkItemModData.cost /2}`, 
                        discount:'50',
                        originalCost:props.checkItemModData.originalCost,
                        qsa:'false',
                        time:props.checkItemModData.time,
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
                    qsa:'false',
                    time:props.checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name.replace(/-100%/g, ''), 
                        cost:props.checkItemModData.originalCost,
                        discount:'0',
                        originalCost:props.checkItemModData.originalCost,
                        qsa:'false',
                        time:props.checkItemModData.time,
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
                    qsa:'false',
                    time:props.checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name + '-100%', 
                        cost:'0', 
                        discount:'100',
                        originalCost:props.checkItemModData.originalCost,
                        qsa:'false',
                        time:props.checkItemModData.time,
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

    // QSA item
    useEffect(() => {
        // Undo QSA
        if(qsaItem === true && props.checkItemModData.qsa === 'true'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:'0',
                    discount:'100',
                    originalCost:props.checkItemModData.originalCost,
                    qsa:'true',
                    time:props.checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name.replace(/-QSA/g, ''), 
                        cost:props.checkItemModData.originalCost,
                        discount:'0',
                        originalCost:props.checkItemModData.originalCost,
                        qsa:'false',
                        time:props.checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setQsaItem(false)
            setInfoMessage(`${props.checkItemModData.name} QSA Removed`)
            setTimeout(() => {
                setInfoMessage('')
                props.setModifyCheckItem(false)
            }, 1000)
        }
        // Apply QSA
        if(qsaItem === true && props.checkItemModData.qsa === 'false'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost,
                    discount:'0',
                    originalCost:props.checkItemModData.originalCost,
                    qsa:'false',
                    time:props.checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:props.checkItemModData.name + '-QSA', 
                        cost:'0', 
                        discount:'100',
                        originalCost:props.checkItemModData.originalCost,
                        qsa:'true',
                        time:props.checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setQsaItem(false)
            setInfoMessage(`${props.checkItemModData.name} QSA Applied`)
            setTimeout(() => {
                setInfoMessage('')
                props.setModifyCheckItem(false)
            }, 1000)
        }
    },[qsaItem, props, docRef])

    const handleDeleteItem = async () => {
        if(props.checkItemModData.qsa === 'true' && props.checkItemModData.discount !=='0'){
            setConfirmQsaDelete(true)
        }
        if(props.checkItemModData.discount !== '0'){
            setConfirmPromoDelete(true)
        }
        if(props.checkItemModData.discount === '0'){
            updateDoc(docRef, {
                order:arrayRemove({
                    item:props.checkItemModData.name, 
                    cost:props.checkItemModData.cost, 
                    discount:'0',
                    originalCost:props.checkItemModData.originalCost,
                    qsa:props.checkItemModData.qsa,
                    time:props.checkItemModData.time,
                })
            })
            const docSnap = await getDoc(docRef)
            if(docSnap.data() !== undefined && docSnap.data().order.length < 1){
                deleteDoc(docRef)
                props.setDoesSeatExist(false)
            }
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
        if(confirmPromoDelete === true){
            setDeletePromoItem(true)
        }
        if(confirmQsaDelete === true){
            setDeleteQsaItem(true)
        }
    }

    const handleCancelDeletePromoItem = () => {
        if(confirmPromoDelete === true){
            setConfirmPromoDelete(false)
        }
        if(confirmQsaDelete === true){
            setConfirmQsaDelete(false)
        }
    }

    const handleQSAItem = () => {
        setQsaItem(true)
    }

    return(
        <div className='popUpModal'>
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
                    :confirmQsaDelete
                        ?  <div className='confirmPromoDeleteContainer'>
                            <h4>This item has a QSA to account for waste, are you sure  you want to delete it?</h4>
                            <button onClick={handleDeletePromoItem}>DELETE</button>
                            <button onClick={handleCancelDeletePromoItem}>CANCEL</button>
                        </div>
                        :confirmPromoDelete
                            ? <div className='confirmPromoDeleteContainer'>
                                <h4>This item has a discount, 100% Promo or QSA recommended. Are you sure  you want to delete it?</h4>
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
                                <li>
                                    <button onClick={handleQSAItem}>QSA</button>
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