import moment from 'moment'
import React, {useEffect} from 'react'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {UncontrolledTooltip} from 'reactstrap'
import {ProgressLoader} from '../../../layouts/ProgressLoader'
import {fetchSubmission, verifyBounty} from '../../../redux/actions/bounty'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Text} from 'recharts'
import {Check, X} from "react-feather"

const Submissions = () => {

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
            selector: 'bountyTiers.reward',
            name: 'Reward',
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
            name: 'Action',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <span className="cursor-pointer" onClick={() => dispatch(verifyBounty(row.id, true))}>
                        <Check size={17} id={`send-tooltip-${row.id}`}/>
                        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
                            Accept
                        </UncontrolledTooltip>
                    </span>
                    <span className="cursor-pointer" onClick={() => dispatch(verifyBounty(row.id, false))}>
                        <X size={17} className='mx-1' id={`pw-tooltip-${row.id}`}/>
                        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
                            Reject
                        </UncontrolledTooltip>
                    </span>
                </div>
            ),
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
            {loading ? <ProgressLoader size='lg'/> : <div className="mt-4">
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
