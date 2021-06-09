import format from 'date-fns/format'
import moment from 'moment'
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { ProgressLoader } from '../../../layouts/ProgressLoader'
import { claimMyBounty, fetchSubmission, verifyBounty } from '../../../redux/actions/bounty'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Text } from 'recharts'

const Submissions = (
    { }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSubmission())
    }, [])

    const submissions = useSelector(state => state.bounty.submissions)
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
                width: '10%'
            },
            headerStyle: {
                width: '10%'
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
            selector: 'user.name',
            name: 'Submitted by',
            cell: row => <div>
                {row.user.name}
            </div>,
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
                {row.verified ? <div>Verified</div> : <Button.Ripple color='primary' type="submit" onClick={() => dispatch(verifyBounty(row.id))}>
                    {buttonLoading ? <ProgressLoader /> : 'Verify bounty'}
                </Button.Ripple>}
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
            <div className="mb-2"><Text className="h1 text-primary">Submissions</Text></div>
                <DataTable
                    noHeader
                    title="All Submissions"
                    columns={columns}
                    className='react-dataTable'
                    data={submissions || []}
                />
            </div>}
        </div>
    )
}

export default Submissions
