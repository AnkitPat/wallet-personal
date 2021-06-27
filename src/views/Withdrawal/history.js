import format from 'date-fns/format'
import moment from 'moment'
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWithdrawalHistories } from '../../redux/actions/withdrawal'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Text } from 'recharts'
import { ProgressLoader } from '../../layouts/ProgressLoader'

const WithdrawalHistory = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchWithdrawalHistories())
    }, [])

    // eslint-disable-next-line no-unused-vars
    function dateFormatter(cell, row, rowIndex, formatExtraData) {
        return format(new Date(row.updatedAt), 'MM/dd/yyyy')
    }

    const columns = [
        {
            selector: 'amount',
            name: 'Amount',
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'token',
            name: 'PTM Token',
            style: {
                width: '20%',
                textAlign: 'center'
            },
            headerStyle: {
                width: '20%',
                textAlign: 'center'

            }
        },
        {
            selector: 'exclusiveAmount',
            name: 'Exclusive Amount',
            style: {
                width: '20%',
                textAlign: 'center'
            },
            headerStyle: {
                width: '20%',
                textAlign: 'center'

            }
        },
        {
            selector: 'orderStatus.title',
            name: 'Status',
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
            format: row => moment(row.updatedAt).format('DD/MM/YYYY'),
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

    const paymentHistory = useSelector(state => state.withdrawal.withdrawals)
    const loading = useSelector(state => state.withdrawal.pageLoading)
    return (
        <div>
            <div className="mt-4">
            <div className="mb-2"><Text className="h1 text-primary">Withdrawal History</Text></div>

                {loading ? <ProgressLoader size='lg'/> : <DataTable
                    className='react-dataTable'
                    noHeader
                    title="Purchase History"
                    columns={columns}
                    data={paymentHistory || []}
                />}
            </div>
        </div>
    )
}

export default WithdrawalHistory
