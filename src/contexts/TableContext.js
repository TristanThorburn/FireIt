import React, { useContext, useState } from 'react';

const tableContext = React.createContext()

export const useTable = () => {
    return useContext(tableContext)
}

const TableProvider = ({children}) => {
    const [ contextTable, setContextTable ] = useState('')

    const useContextTable = {
        setContextTable,
        contextTable,
    }

    return(
        <div>
            <tableContext.Provider value={useContextTable}>
                {children}
            </tableContext.Provider>
        </div>
    )
}

export default TableProvider;