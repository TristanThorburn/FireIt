import { db } from "../../../firebase"
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc, deleteDoc, collection, getCountFromServer } from "firebase/firestore"
import { useAuth } from "../../../contexts/AuthContext";
import { useTable } from "../../../contexts/TableContext";
import { useState, useEffect } from "react";

const ModifyCheckItem = (props) => {
    const { checkItemModData, setModifyCheckItem, setDoesSeatExist } = props
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
    const [ confirmReleaseTable, setConfirmRelaseTable ] = useState(false)

    const handleCloseModal = () => {
        props.setModifyCheckItem(false)
    }

    // Delete Promo'd Item after Confirmation
    useEffect(() => {
        if(deletePromoItem === true){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            setConfirmPromoDelete(false)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:checkItemModData.cost, 
                    discount:checkItemModData.discount,
                    originalCost:checkItemModData.originalCost,
                    qsa:checkItemModData.qsa,
                    time:checkItemModData.time,
                })
            })
            setDeletePromoItem(false)
            setInfoMessage(`${checkItemModData.name} deleted`)
            setTimeout(() => {
                setModifyCheckItem(false)
                setInfoMessage('')
            }, 1000)
        }
        if(deleteQsaItem === true){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            setConfirmQsaDelete(false)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:checkItemModData.cost, 
                    discount:checkItemModData.discount,
                    originalCost:checkItemModData.originalCost,
                    qsa:checkItemModData.qsa,
                    time:checkItemModData.time,
                })
            })
            setDeleteQsaItem(false)
            setInfoMessage(`${checkItemModData.name} deleted`)
            setTimeout(() => {
                setModifyCheckItem(false)
                setInfoMessage('')
            }, 1000)
        }
        const deleteCleanUp = async () =>{
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            const docSnap = await getDoc(docRef)
            if(docSnap.data() !== undefined && docSnap.data().order.length < 1){
                deleteDoc(docRef)
                setDoesSeatExist(false)
                setConfirmRelaseTable(true)
            }
        }
        deleteCleanUp()
    }, [deletePromoItem, deleteQsaItem, checkItemModData.cost, checkItemModData.discount, checkItemModData.name, checkItemModData.originalCost, checkItemModData.qsa, checkItemModData.time, setDoesSeatExist, setModifyCheckItem, contextTable, employeeContext.employeeNumber, checkItemModData.seat])

    // Promo item based on selected amount
    useEffect(() => {
        // Undo 25%
        if(checkItemModData.discount === '25' && discountAmount === '25'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:checkItemModData.cost,
                    discount:'25',
                    originalCost:checkItemModData.originalCost,
                    qsa:'false',
                    time:checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:checkItemModData.name.replace(/-25%/g, ''), 
                        cost:`${checkItemModData.cost * 4/3}`, 
                        discount:'0',
                        originalCost:checkItemModData.originalCost,
                        qsa:'false',
                        time:checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${checkItemModData.name} discount removed`)
            setTimeout(() => {
                setInfoMessage('')
                setModifyCheckItem(false)
            }, 1000)
        }
        // Apply 25%
        if(checkItemModData.discount === '0' && discountAmount === '25'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:checkItemModData.cost,
                    discount:'0',
                    originalCost:checkItemModData.originalCost,
                    qsa:'false',
                    time:checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:checkItemModData.name + '-25%', 
                        cost:`${checkItemModData.cost * 3/4}`, 
                        discount:'25',
                        originalCost:checkItemModData.originalCost,
                        qsa:'false',
                        time:checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${checkItemModData.name} discounted 25%`)
            setTimeout(() => {
                setInfoMessage('')
                setModifyCheckItem(false)
            }, 1000)
        }
        // Undo 50%
        if(checkItemModData.discount === '50' && discountAmount === '50'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:checkItemModData.cost,
                    discount:'50',
                    originalCost:checkItemModData.originalCost,
                    qsa:'false',
                    time:checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:checkItemModData.name.replace(/-50%/g, ''), 
                        cost:`${checkItemModData.cost * 2}`, 
                        discount:'0',
                        originalCost:checkItemModData.originalCost,
                        qsa:'false',
                        time:checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${checkItemModData.name} discount removed`)
            setTimeout(() => {
                setInfoMessage('')
                setModifyCheckItem(false)
            }, 1000)
        }
        // Apply 50%
        if(checkItemModData.discount === '0' && discountAmount === '50'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:checkItemModData.cost,
                    discount:'0',
                    originalCost:checkItemModData.originalCost,
                    qsa:'false',
                    time:checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:checkItemModData.name + '-50%', 
                        cost:`${checkItemModData.cost /2}`, 
                        discount:'50',
                        originalCost:checkItemModData.originalCost,
                        qsa:'false',
                        time:checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${checkItemModData.name} discounted 50%`)
            setTimeout(() => {
                setInfoMessage('')
                setModifyCheckItem(false)
            }, 1000)
        }
        // Undo 100%
        if(checkItemModData.discount === '100' && discountAmount === '100'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:'0',
                    discount:'100',
                    originalCost:checkItemModData.originalCost,
                    qsa:'false',
                    time:checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:checkItemModData.name.replace(/-100%/g, ''), 
                        cost:checkItemModData.originalCost,
                        discount:'0',
                        originalCost:checkItemModData.originalCost,
                        qsa:'false',
                        time:checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${checkItemModData.name} discount removed`)
            setTimeout(() => {
                setInfoMessage('')
                setModifyCheckItem(false)
            }, 1000)
        }
        // Apply 100%
        if(checkItemModData.discount === '0' && discountAmount === '100'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:checkItemModData.cost,
                    discount:'0',
                    originalCost:checkItemModData.originalCost,
                    qsa:'false',
                    time:checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:checkItemModData.name + '-100%', 
                        cost:'0', 
                        discount:'100',
                        originalCost:checkItemModData.originalCost,
                        qsa:'false',
                        time:checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setDiscountAmount('')
            setInfoMessage(`${checkItemModData.name} discounted 100%`)
            setTimeout(() => {
                setInfoMessage('')
                setModifyCheckItem(false)
            }, 1000)
        }
    }, [discountAmount, checkItemModData.cost, checkItemModData.discount, checkItemModData.name, checkItemModData.originalCost, checkItemModData.time, setModifyCheckItem, contextTable, employeeContext.employeeNumber, checkItemModData.seat])

    // QSA item
    useEffect(() => {
        // Undo QSA
        if(qsaItem === true && checkItemModData.qsa === 'true'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:'0',
                    discount:'100',
                    originalCost:checkItemModData.originalCost,
                    qsa:'true',
                    time:checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:checkItemModData.name.replace(/-QSA/g, ''), 
                        cost:checkItemModData.originalCost,
                        discount:'0',
                        originalCost:checkItemModData.originalCost,
                        qsa:'false',
                        time:checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setQsaItem(false)
            setInfoMessage(`${checkItemModData.name} QSA Removed`)
            setTimeout(() => {
                setInfoMessage('')
                setModifyCheckItem(false)
            }, 1000)
        }
        // Apply QSA
        if(qsaItem === true && checkItemModData.qsa === 'false'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({
                    item:checkItemModData.name, 
                    cost:checkItemModData.cost,
                    discount:'0',
                    originalCost:checkItemModData.originalCost,
                    qsa:'false',
                    time:checkItemModData.time,
                }),
               }).then(
                updateDoc(docRef, {
                    order:arrayUnion({
                        item:checkItemModData.name + '-QSA', 
                        cost:'0', 
                        discount:'100',
                        originalCost:checkItemModData.originalCost,
                        qsa:'true',
                        time:checkItemModData.time,
                    })
                })
               )
            setPromoOptions(false)
            setQsaItem(false)
            setInfoMessage(`${checkItemModData.name} QSA Applied`)
            setTimeout(() => {
                setInfoMessage('')
                setModifyCheckItem(false)
            }, 1000)
        }
    },[qsaItem, setModifyCheckItem, checkItemModData.cost, checkItemModData.name, checkItemModData.originalCost, checkItemModData.qsa, checkItemModData.time, checkItemModData.seat, contextTable, employeeContext.employeeNumber])

    // Release table ownership on last item delete
    useEffect(() => {
        if(confirmReleaseTable) {
            const getSeatCount = async () => {
                const docCollection = 
                        collection(db, 'orders', employeeContext.employeeNumber, contextTable)
                const collectionSnap = await getCountFromServer(docCollection)
                if(collectionSnap.data().count === 0){
                    const resetTable =
                        doc(db, 'tables', contextTable)
                    updateDoc(resetTable, {
                        serverOwner:'none'
                    })
                }
                setConfirmRelaseTable(false)
            }
            getSeatCount()
        }
    }, [confirmReleaseTable, employeeContext.employeeNumber, contextTable])

    const handleDeleteItem = async () => {
        if(props.checkItemModData.qsa === 'true' && props.checkItemModData.discount !=='0'){
            setConfirmQsaDelete(true)
        }
        if(props.checkItemModData.discount !== '0'){
            setConfirmPromoDelete(true)
        }
        if(props.checkItemModData.discount === '0'){
            const docRef = 
                doc(db, 'orders', employeeContext.employeeNumber, contextTable, checkItemModData.seat)
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
            setConfirmRelaseTable(true)
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