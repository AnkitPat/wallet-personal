import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@components/breadcrumbs'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap'

import '@styles/base/pages/page-blog.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBounties } from '../../../redux/actions/bounty'
import { ProgressLoader } from '../../../layouts/ProgressLoader'
import moment from 'moment'
import Sidebar from './components/Sidebar'

const BountyList = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBounties())
    }, [])

    const bounties = useSelector(state => state.bounty.bounties)

    const loading = useSelector(state => state.bounty.loading)
    const role = useSelector(state => state.auth.userRole)

    const renderRenderList = () => {
        return bounties.map((bounty, index) => {
            return (
                <Col key={index} md='6'>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h4' className="d-flex justify-content-between align-items-center">
                                <Link className='blog-title-truncate text-body-heading'
                                    to={{ pathname: `/bounties/${bounty.id}`, data: bounty }}>
                                    {bounty.title}
                                </Link>
                                <div className='my-1'><small>
                                    Amount: {bounty.amount}
                                </small>
                                </div>

                            </CardTitle>
                            <div className='text-danger'><small>
                                Deadline: {moment(bounty.deadline).format('DD/MM/YYYY')}
                            </small>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: bounty.shortDescription
                                }}>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between align-items-center'>

                                <Link className='font-weight-bold' to={{ pathname: `/bounties/${bounty.id}` }}>
                                    Read More
                                </Link>
                                {role === 'administrator' ? <Link className='font-weight-bold' to={{
                                    pathname: `/bounties/edit/${bounty.id}`,
                                    data: bounty
                                }}>
                                    Edit
                                </Link> : <></>}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            )
        })
    }

    return (
        <Fragment>
            <Sidebar
    
            />
            <Breadcrumbs
                breadCrumbTitle='Bounty Tasks'
                breadCrumbParent='Tasks'
                breadCrumbActive='List'
            />
            <div className='content-right pl-2'>
                <div className='content-wrapper'>
                    <div className='content-body'>

                        {loading ? (<ProgressLoader size="lg" />) : (
                            bounties.length > 0 ? <Row>{renderRenderList()}</Row> : <Row className="mx-3"><h2>No Entries Found</h2></Row>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BountyList
