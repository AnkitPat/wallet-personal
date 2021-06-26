import moment from 'moment'
import React, {useEffect} from 'react'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {Badge, Button, UncontrolledTooltip} from 'reactstrap'
import {ProgressLoader} from '../../../layouts/ProgressLoader'
import {claimMyBounty, fetchMyBounties} from '../../../redux/actions/bounty'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Text} from 'recharts'
import {Info} from "react-feather"

const MyBounties = () => {

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
            selector: 'createdDate',
            format: row => moment(row.createdDate).format('MMMM Do YYYY'),
            name: 'Submitted Date',
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
            name: 'Deadline',
            format: row => moment(row.bountyTask.deadline).fromNow(),
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'bountyTask.updatedAt',
            name: 'Status',
            cell: row => {
                if (row.verified === 'pending') {
                    return <Badge color='light-warning' pill>
                        Pending
                    </Badge>
                }

                if (row.verified === 'rejected') {
                    return <Badge color='light-danger' pill>
                        Rejected
                    </Badge>
                }

                if (row.verified === 'verified' && moment(row.bountyTask.deadline).isAfter(moment())) {
                    return (
                        <>
                            <Badge color='light-success' className="mr-1" pill>
                                Verified
                            </Badge>
                            <Info size={15} id="UnControlledExample"/>
                            <UncontrolledTooltip placement='top' target='UnControlledExample'>
                                Your task is successfully verified. Once deadline is over, you will be able to claim
                                your reward.
                            </UncontrolledTooltip>
                        </>
                    )
                }

                if (row.claimed) {
                    return <Badge color='light-info' pill>
                        Claimed
                    </Badge>
                }

                return <Button.Ripple color='primary' onClick={() => dispatch(claimMyBounty(row.id))}>Claim Reward</Button.Ripple>
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
            {loading ? <ProgressLoader size='lg'/> : <div className="mt-4">
                <div className="mb-2"><Text className="h1 text-primary">My Bounties</Text></div>
                <DataTable
                    noHeader

                    title="My Bounties"
                    columns={columns}
                    className='react-dataTable'
                    data={myBounties || []}
                />
            </div>}
        </div>
    )
}

export default MyBounties
