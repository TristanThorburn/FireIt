import { useEffect, useState } from "react";
import { query, onSnapshot } from "firebase/firestore";
import { whiteWineCollectionRef, redWineCollectionRef } from "../../../library/firestoreCollections";

const WinesScreen = () => {
    const [ whiteWineData, setWhiteWineData ] = useState();
    const [ redWineData, setRedWineData ] = useState();

    useEffect(() => {
        const getWineWhite = async () => {
            // const WhiteWineSnap = await getDocs(whiteWineCollectionRef)
            // const WhiteWineResults = []
            // WhiteWineSnap.forEach((doc => {
            //     // data:doc.data()
            //     // id:doc.id
            //     WhiteWineResults.push({data:doc.data(), id:doc.id})
            // }));
            // setTestData(WhiteWineResults)
            const q = query(whiteWineCollectionRef);
            const unsubscribe = onSnapshot(q, snapshot => {
                setWhiteWineData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const getWineRed = async () => {
            // const RedWineSnap = await getDocs(redWineCollectionRef)
            // const RedWineResults = []
            // RedWineSnap.forEach((doc => {
            //     RedWineResults.push({data:doc.data(), id:doc.id})
            // }));
            // setTestData2(RedWineResults)
            const q = query(redWineCollectionRef);
            const unsubscribe = onSnapshot(q, snapshot => {
                setRedWineData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        getWineWhite()
        getWineRed()
    },[])

    return(
        <div>
        <h2>WINE</h2>
            <ul>
                <button onClick={console.log(whiteWineData, redWineData)}></button>
                <li>A</li>
                <li>B</li>
                <li>C</li>
            </ul>
        </div>
    )
}

export default WinesScreen;