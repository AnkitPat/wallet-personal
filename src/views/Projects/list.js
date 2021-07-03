import moment from 'moment'
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import {  UncontrolledTooltip } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Text } from 'recharts'
import { Check, Edit2, Trash } from "react-feather"
import { ProgressLoader } from '../../layouts/ProgressLoader'
import {Link} from 'react-router-dom'

const ProjectList = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(fetchSubmission())
    }, [])

    // const projects = useSelector(state => state.project.projects)
    const projects = [
        {
            name: 'Project name',
            avatar: '',
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
            linkedIn: 'https://linkedIn.com',
            youtube: 'https://youtube.com'
        }
    ]
    const loading = useSelector(state => state.bounty.loading)
    const buttonLoading = useSelector(state => state.bounty.buttonLoading)

    const columns = [
        {
            selector: 'name',
            name: 'Name',
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            selector: 'facebook',
            name: 'Facebook',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Link to={{ pathname: row.facebook }} target="_blank" id="pw-tooltip-facebook">{row.facebook}</Link>
                    <UncontrolledTooltip placement='top' target={`pw-tooltip-facebook`}>
                        {row.facebook}
                    </UncontrolledTooltip>
                </div>
            )
        },
        {
            selector: 'twitter',
            name: 'Twitter',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Link to={{ pathname: row.twitter }} target="_blank" id="pw-tooltip-twitter">{row.twitter}</Link>
                    <UncontrolledTooltip placement='top' target={`pw-tooltip-twitter`}>
                        {row.twitter}
                    </UncontrolledTooltip>
                </div>
            )
        },
        {
            selector: 'instagram',
            name: 'Instagram',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Link to={{ pathname: row.instagram }} target="_blank" id="pw-tooltip-instagram">{row.instagram}</Link>
                    <UncontrolledTooltip placement='top' target={`pw-tooltip-instagram`}>
                        {row.instagram}
                    </UncontrolledTooltip>
                </div>
            )
        },
        {
            selector: 'linkedIn',
            name: 'LinkedIn',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Link to={{ pathname: row.linkedIn }} target="_blank" id="pw-tooltip-linkedIn">{row.linkedIn}</Link>
                    <UncontrolledTooltip placement='top' target={`pw-tooltip-linkedIn`}>
                        {row.linkedIn}
                    </UncontrolledTooltip>
                </div>
            )
        },
        {
            selector: 'youtube',
            name: 'Youtube',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Link to={{ pathname: row.youtube }} target="_blank" id="pw-tooltip-youtube">{row.youtube}</Link>
                    <UncontrolledTooltip placement='top' target={`pw-tooltip-youtube`}>
                        {row.youtube}
                    </UncontrolledTooltip>
                </div>
            )
        },

        {
            selector: 'bountyTask.updatedAt',
            name: 'Action',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <span className="cursor-pointer" onClick={() => dispatch(verifyBounty(row.id, true))}>
                        <Edit2 size={17} id={`send-tooltip-${row.id}`} />
                        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
                            Edit
                        </UncontrolledTooltip>
                    </span>
                    <span className="cursor-pointer" onClick={() => dispatch(verifyBounty(row.id, false))}>
                        <Trash size={17} className='mx-1' id={`pw-tooltip-${row.id}`} />
                        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
                            Delete
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
            {loading ? <ProgressLoader size='lg' /> : <div className="mt-4">
                <div className="mb-2"><Text className="h1 text-primary">Projects</Text></div>
                <DataTable
                    noHeader
                    title=""
                    columns={columns}
                    className='react-dataTable'
                    data={projects || []}
                />
            </div>}
        </div>
    )
}

export default ProjectList
