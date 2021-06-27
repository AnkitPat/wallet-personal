import format from 'date-fns/format'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { approveWithdrawal, fetchAllWithdrawalRequests, fetchWithdrawalHistories } from '../../redux/actions/withdrawal'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Text } from 'recharts'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import {Check, X} from 'react-feather'
import {Badge, UncontrolledTooltip} from 'reactstrap'
import { WithdrawalReject } from './components/WithdrawalReject/WithdrawalReject'

const AllWithdrawals = () => {

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
            width: '300px'
        },
        {
            selector: 'amount',
            name: 'Amount',
            width: '100px'
        },
        {
            selector: 'token',
            name: 'PTM Token',
            width: '150px'
        },
        {
            selector: 'exclusiveAmount',
            name: 'Exclusive Amount',
            width: '150px'
        },
        {
            selector: 'user.credit',
            name: 'Balance',
            width: '150px'
        },
        {
            selector: 'orderStatus.title',
            name: 'Status',
            width: '150px'
        },

        {
            name: 'Actions',
            cell: row => {
                if (row.orderStatusId === 1) return <div>Created</div>
                else if (row.orderStatusId === 2) return <Badge color='success'>Confirmed</Badge>
                else if (row.orderStatusId === 3) return <Badge color='warning'>Failed</Badge>
                else if (row.orderStatusId === 4) return <div>Refunded</div>
                else if (row.orderStatusId === 6) return <Badge color='danger'>Rejected: ({row.rejectReason})</Badge>
                else if (row.orderStatusId === 5) return <div className='column-action d-flex align-items-center'>
                    <span className="cursor-pointer" onClick={() => dispatch(approveWithdrawal(row.id))}>
                        <Check size={17} id={`send-tooltip-${row.id}`}/>
                        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
                            Accept
                        </UncontrolledTooltip>
                    </span>
                    <span className="cursor-pointer" onClick={() => {
                        setSelectedWithdrawal(row)
                        setShowConfirmationPopup(true)
                    }}>
                        <X size={17} className='mx-1' id={`pw-tooltip-${row.id}`}/>
                        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
                            Reject
                        </UncontrolledTooltip>
                    </span>
                </div>
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
