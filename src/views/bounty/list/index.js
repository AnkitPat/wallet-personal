import Breadcrumbs from '@components/breadcrumbs'
import '@styles/base/pages/page-blog.scss'
import moment from 'moment'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Card,
    CardBody,
    CardTitle, Col, Input, Label, Row
} from 'reactstrap'
import { ProgressLoader } from '../../../layouts/ProgressLoader'
import { fetchBounties } from '../../../redux/actions/bounty'
import { searchEnhancer } from '../../../utility/Utils'
import Sidebar from './components/Sidebar'


const BountyList = () => {

    const dispatch = useDispatch()

    const bounties = useSelector(state => state.bounty.bounties)
    const [searchTerm, setSearchTerm] = useState('')
    const [text, setText] = useState('')

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

    // ** Search Header
    const CustomHeader = useCallback(() => {
        return (
            <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
                <Row>
                    <Col></Col>
                    <Col
                        xl='6'
                        className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                    >
                        <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                            <Label className='mb-0' for='search-invoice'>
                                Search:
                            </Label>
                            <Input
                                id='search-invoice'
                                className='ml-50 w-100'
                                type='text'
                                // value={text}
                                onChange={e => {
                                    // setText(e.target.value)
                                    searchEnhancer(() => setSearchTerm(e.target.value))
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }, [])

    return (
        <Fragment>
            <Sidebar
                searchTerm={searchTerm}
            />
            <Breadcrumbs
                breadCrumbTitle='Bounty Tasks'
                breadCrumbParent='Tasks'
                breadCrumbActive='List'
            />
            <div className='content-right pl-2'>
                <div className='content-wrapper'>
                    <div className='content-body'>

                        <CustomHeader />
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
