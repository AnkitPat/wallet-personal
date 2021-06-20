import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEarnings } from "../../redux/actions/wallet"
import DataTable from 'react-data-table-component'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import { Text } from "recharts"
import moment from "moment"

const Earnings = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchEarnings())
    }, [])


    const columns = [
        {
            selector: 'bountyTask.title',
            name: 'Bounty Title',
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'bountyTask.amount',
            name: 'Amount',
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        
        {
            selector: 'result',
            name: 'Your sumbmission',
            style: {
                width: '30%',
                textAlign: 'center'

            },
            headerStyle: {
                width: '30%',
                textAlign: 'center'

            }
        },
        {
            selector: 'updatedAt',
            name: 'Last Updated Date',
            format: row => moment(row.bountyTask.updatedAt).format('DD/MM/YYYY'),
            style: {
                width: '30%',
                textAlign: 'center'

            },
            headerStyle: {
                width: '30%',
                textAlign: 'center'

            }
        }
    ]

    const earnings = useSelector(state => state.wallet.earnings)
    const loading = useSelector(state => state.wallet.loading)
    return (
        <div>
            <div className="mt-4">
            <div className="mb-2"><Text className="h1 text-primary">Earnings</Text></div>

                {loading ? <ProgressLoader size='lg'/> : <DataTable
                    className='react-dataTable'
                    noHeader
                    title="Earnings"
                    columns={columns}
                    data={earnings || []}
                />}
            </div>
        </div>
    )
}

export default Earnings