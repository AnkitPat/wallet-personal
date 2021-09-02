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
            selector: 'bountyTask_title',
            name: 'Title',
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'user_bounties_result',
            name: 'Submitted Link',
            cell: row => <a style={{textOverflow: 'ellipsis', overflow:'hidden', whiteSpace: 'nowrap'}} href={row.user_bounties_result}  target="_blank">{row.user_bounties_result}</a>,
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'bountyTiers_reward',
            name: 'Reward',
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'bountyTask_updatedAt',
            name: 'Last updated',
            format: row => moment(row.bountyTask_updatedAt).format('DD/MM/YYYY'),
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'user_name',
            name: 'Submitted by',
            cell: row => <div>
                {row.user_name}
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
                    <span className="cursor-pointer" onClick={() => dispatch(verifyBounty(row.user_bounties_id, true))}>
                        <Check size={17} id={`send-tooltip-${row.user_bounties_id}`}/>
                        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.user_bounties_id}`}>
                            Accept
                        </UncontrolledTooltip>
                    </span>
                    <span className="cursor-pointer" onClick={() => dispatch(verifyBounty(row.user_bounties_id, false))}>
                        <X size={17} className='mx-1' id={`pw-tooltip-${row.user_bounties_id}`}/>
                        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.user_bounties_id}`}>
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