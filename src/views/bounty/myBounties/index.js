import format from 'date-fns/format'
import moment from 'moment'
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { ProgressLoader } from '../../../layouts/ProgressLoader'
import { claimMyBounty, fetchMyBounties } from '../../../redux/actions/bounty'

const MyBounties = (
    { }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchMyBounties())
    }, [])


    const myBounties = useSelector(state => state.bounty.myBounties)
    const loading = useSelector(state => state.bounty.loading)
    const buttonLoading = useSelector(state => state.bounty.buttonLoading)

    const columns = [
        {
            selector: 'bountyTask.title',
            name: 'Title',
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
            name: 'Submitted Link',
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'bountyTask.updatedAt',
            name: 'Last updated',
            format: row => moment(row.bountyTask.updatedAt).format('DD/MM/YYYY'),
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'bountyTask.updatedAt',
            name: 'Claim Status',
            cell: row => <div>
                { (row.verified && row.claimed) ? <div>Claimed</div> : row.verified ? <Button.Ripple disabled={moment(row.bountyTask.deadline).isBefore(moment())} color='primary' type="submit" onClick={() => dispatch(claimMyBounty(row.id))}>
                    {buttonLoading ? <ProgressLoader /> : 'Claim bounty'}
                </Button.Ripple> : 'Not verified'}
            </div>,
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
            {loading ? <ProgressLoader size='lg' /> : <div className="mt-4">
                <DataTable
                    title="My Bounties"
                    columns={columns}
                    data={myBounties || []}
                />
            </div>}
        </div>
    )
}

export default MyBounties
