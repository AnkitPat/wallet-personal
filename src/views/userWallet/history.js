import format from 'date-fns/format'
import moment from 'moment'
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWalletHistories } from '../../redux/actions/wallet'

const WalletHistory = (
    {

    }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchWalletHistories())
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
            selector: 'currency',
            name: 'Currency',
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
            name: 'Purchased Date',
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

    const paymentHistory = useSelector(state => state.wallet.history)

    return (
        <div>
            <div className="mt-4">
                <DataTable
                    title="Purchase History"
                    columns={columns}
                    data={paymentHistory || []}
                />
            </div>
        </div>
    )
}

export default WalletHistory
