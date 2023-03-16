import { useTable } from '../../../contexts/TableContext';
import { useAuth } from '../../../contexts/AuthContext';

const SummaryTables = (props) => {
    const { setContextTable } = useTable()
    const { employeeContext } = useAuth()

    const handleTableClick = (e) => {
        setContextTable(e.target.dataset.searchid)
    }

    return(
        <div className='serversTablesList'>
            <h3>{employeeContext.firstName}'s Active Tables</h3>

            <ul>
                {props.serverTableList.map((table, i) => {
                    return(
                        <li key={i}>
                            <button
                                onClick={handleTableClick}
                                data-searchid={table.data.searchId}
                                >
                                {table.data.name}
                            </button>
                        </li>
                    )
                    })
                }
            </ul>
            
        </div>
    )
}

export default SummaryTables;