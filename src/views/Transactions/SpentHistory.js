import moment from "moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Text } from "recharts"
import { fetchSpents } from "../../redux/actions/wallet"
import DataTable from 'react-data-table-component'
import { ProgressLoader } from '../../layouts/ProgressLoader'

const SpentHistory = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSpents())
    }, [])

    const columns = [
        {
            selector: 'amount',
            name: 'Amount'
        },
        {
            selector: 'token',
            name: 'PTM Token'
        },
        {
            selector: 'exclusiveAmount',
            name: 'Exclusive Amount'
        },
        {
            selector: 'orderStatus.title',
            name: "Status"
        },
        {
            selector: 'updatedAt',
            name: 'Last Updated Date',
            format: row => moment(row.updatedAt).format('DD/MM/YYYY')
        }
    ]

    const spentHistory = useSelector(state => state.wallet.spentHistory)
    const loading = useSelector(state => state.wallet.loading)

    return (
        <div>
            <div className="mt-4">
            <div className="mb-2"><Text className="h1 text-primary">Spent History</Text></div>

                {loading ? <ProgressLoader size='lg'/> : <DataTable
                    className='react-dataTable'
                    noHeader
                    title="Earnings"
                    columns={columns}
                    data={spentHistory || []}
                />}
            </div>
        </div>
    )
}

export default SpentHistory