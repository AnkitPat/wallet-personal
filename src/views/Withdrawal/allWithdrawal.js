import format from 'date-fns/format'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { approveWithdrawal, fetchAllWithdrawalRequests, fetchWithdrawalHistories } from '../../redux/actions/withdrawal'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Text } from 'recharts'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import { Check, XCircle } from 'react-feather'
import { Button } from 'reactstrap'
import { WithdrawalReject } from './components/WithdrawalReject/WithdrawalReject'

const AllWithdrawals = (
    { }) => {

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllWithdrawalRequests())
    }, [])

    // eslint-disable-next-line no-unused-vars
    function dateFormatter(cell, row, rowIndex, formatExtraData) {
        return format(new Date(row.updatedAt), 'MM/dd/yyyy')
    }

    const withdrawalw = useSelector(state => state.withdrawal.allWithdrawals)
    const loading = useSelector(state => state.withdrawal.pageLoading)

    const columns = [
        {
            selector: 'user.name',
            name: 'User',
            cell: row => <div className="text-primary">{row.user.name} <br/> <small className="text-secondary">{row.user.email}</small></div>,
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
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
            name: 'Actions',
            cell: row => {
                if (row.orderStatusId === 1) return <div>Created</div>
                else if (row.orderStatusId === 2) return <div>Confirmed</div>
                else if (row.orderStatusId === 3) return <div>Failed</div>
                else if (row.orderStatusId === 4) return <div>Refunded</div>
                else if (row.orderStatusId === 6) return <div>Rejected: ({row.rejectReason})</div>
                else if (row.orderStatusId === 5) return <div>
                    <Button.Ripple color='primary' onClick={() => dispatch(approveWithdrawal(row.id))}>
                        <Check size='15' />
                    </Button.Ripple>
                    <Button.Ripple color='danger' className="ml-2" onClick={() => {
                        setSelectedWithdrawal(row)
                        setShowConfirmationPopup(true)
                     }}>
                        <XCircle size='15' color="white" />
                    </Button.Ripple>
                </div>

            },
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        }
    ]

    return (
        <div>
            <div className="mt-4">
                <div className="mb-2"><Text className="h1 text-primary">All Withdrawals</Text></div>

                {loading ? <ProgressLoader size='lg' /> : <DataTable
                    className='react-dataTable'
                    noHeader
                    title="Purchase History"
                    columns={columns}
                    data={withdrawalw || []}
                />}
                {showConfirmationPopup && <WithdrawalReject  selectedWithdrawal={selectedWithdrawal} showConfirmationPopup={showConfirmationPopup} setShowConfirmationPopup={setShowConfirmationPopup}/>}
            </div>
        </div>
    )
}

export default AllWithdrawals
