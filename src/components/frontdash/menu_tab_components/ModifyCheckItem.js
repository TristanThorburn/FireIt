import { db } from "../../../firebase"
import { doc, updateDoc, arrayRemove } from "firebase/firestore"
import { useAuth } from "../../../contexts/AuthContext";
import { useTable } from "../../../contexts/TableContext";
import { useState } from "react";

const ModifyCheckItem = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ infoMessage, setInfoMessage ] = useState('')

    const handleCloseModal = () => {
        props.setModifyCheckItem(false)
    }

    const handleDeleteItem = () => {
        const docRef = doc(db, 'checks', employeeContext.employeeNumber, contextTable, props.checkItemModData.seat)
            updateDoc(docRef, {
                order:arrayRemove({item:props.checkItemModData.name, cost:props.checkItemModData.cost})
            })
            setInfoMessage(`${props.checkItemModData.name} deleted`)
    }

    return(
        <div className='checkModifyModal'>
            <div className='checkModifyContainer'>
                <button onClick={handleCloseModal} className='closePad'>X</button>

                {infoMessage
                    ? <div className='padSuccess'>{infoMessage}</div>
                    : null
                }

                <h3>Modify Check Item</h3>
                <ul>
                    <li>
                        <button onClick={handleDeleteItem}>DELETE</button>
                    </li>
                    <li>
                        <button>PROMO</button>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export default ModifyCheckItem