import React, {useEffect} from 'react'
import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux'
import {UncontrolledTooltip} from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Text} from 'recharts'
import {Edit2, Trash} from "react-feather"
import {ProgressLoader} from '../../layouts/ProgressLoader'
import {Link} from 'react-router-dom'
import {fetchProjects} from "../../redux/actions/projects"

const ProjectList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProjects())
    }, [])

    const projects = useSelector(state => state.projects.projects)
    const loading = useSelector(state => state.projects.loading)

    const columns = [
        {
            selector: 'title',
            name: 'Name'
        },
        {
            selector: 'facebook',
            name: 'Facebook',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Link to={{pathname: row.facebook}} target="_blank" id="pw-tooltip-facebook">{row.facebook}</Link>
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
                    <Link to={{pathname: row.twitter}} target="_blank" id="pw-tooltip-twitter">{row.twitter}</Link>
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
                    <Link to={{pathname: row.instagram}} target="_blank"
                          id="pw-tooltip-instagram">{row.instagram}</Link>
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
                    <Link to={{pathname: row.linkedIn}} target="_blank" id="pw-tooltip-linkedIn">{row.linkedIn}</Link>
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
                    <Link to={{pathname: row.youtube}} target="_blank" id="pw-tooltip-youtube">{row.youtube}</Link>
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
                    <Link to={`/projects/${row.id}/edit`}>
                        <Edit2 size={17} id={`send-tooltip-${row.id}`}/>
                        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
                            Edit
                        </UncontrolledTooltip>
                    </Link>
                    <span className="cursor-pointer" onClick={() => dispatch(verifyBounty(row.id, false))}>
                        <Trash size={17} className='mx-1' id={`pw-tooltip-${row.id}`}/>
                        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
                            Delete
                        </UncontrolledTooltip>
                    </span>
                </div>
            )
        }
    ]

    return (
        <div>
            {loading ? <ProgressLoader size='lg'/> : <div className="mt-4">
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
