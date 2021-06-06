import {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Breadcrumbs from '@components/breadcrumbs'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button
} from 'reactstrap'

import '@styles/base/pages/page-blog.scss'
import {useDispatch, useSelector} from 'react-redux'
import {fetchBounties} from '../../../redux/actions/bounty'
import {history} from '../../../utility/Utils'
import {ProgressLoader} from '../../../layouts/ProgressLoader'
import moment from 'moment'

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
                                      to={{pathname: `/bounties/${bounty.id}`, data: bounty}}>
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
                                    __html: bounty.description
                                }}>
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-between align-items-center'>

                                <Link className='font-weight-bold' to={{pathname: `/bounties/${bounty.id}`}}>
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
            <Breadcrumbs
                breadCrumbTitle='Blog List'
                breadCrumbParent='Bounties'
                breadCrumbActive='List'
            />
            <div className='blog-wrapper'>
                <div className='content-detached content-left'>
                    <div className="my-2 d-flex justify-content-start">
                        {role === 'administrator' &&
                            <Button.Ripple color='primary' type="submit" onClick={() => history.push('/bounties/add')}>
                                Add bounty
                            </Button.Ripple>}
                    </div>
                    <div className='content-body'>
                        {loading ? (<ProgressLoader size="lg"/>) : (
                            <div className='blog-list-wrapper'>
                                <Row>{renderRenderList()}</Row>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BountyList
