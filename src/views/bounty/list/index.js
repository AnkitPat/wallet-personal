import Breadcrumbs from '@components/breadcrumbs'
import '@styles/base/pages/page-blog.scss'
import moment from 'moment'
import {Fragment, useCallback, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {
    Card,
    CardBody,
    CardTitle, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap'
import {ProgressLoader} from '../../../layouts/ProgressLoader'
import {searchEnhancer} from '../../../utility/Utils'
import Sidebar from './components/Sidebar'
import {Search} from "react-feather"
import '@styles/base/pages/app-ecommerce.scss'

const BountyList = () => {
    const bounties = useSelector(state => state.bounty.bounties)
    const [searchTerm, setSearchTerm] = useState('')

    const loading = useSelector(state => state.bounty.loading)
    const role = useSelector(state => state.auth.userRole)
    const filters = useSelector(state => state.bounty.bountyFilters)

    const renderRenderList = () => {
        return bounties.map((bounty, index) => {
            return (
                <Card className='ecommerce-card' key={index}>
                    <CardBody>
                        <CardTitle tag='h4' className="d-flex justify-content-between align-items-center">
                            <Link className='blog-title-truncate text-body-heading'
                                  to={{pathname: `/bounties/${bounty.id}`, data: bounty}}>
                                {bounty.title}
                            </Link>
                            <div className='my-1'><small>
                                Rewards: {bounty.amount}
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
                        <hr/>
                        <div className='d-flex justify-content-between align-items-center'>

                            <Link className='font-weight-bold' to={{pathname: `/bounties/${bounty.id}`}}>
                                Read More
                            </Link>
                            {role === 'administrator' ? <Link className='font-weight-bold' to={{
                                pathname: `/bounties/edit/${bounty.id}`
                            }}>
                                Edit
                            </Link> : <></>}
                        </div>
                    </CardBody>
                </Card>
            )
        })
    }

    // ** Search Header
    const CustomHeader = useCallback(() => {
        return (
            <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
                <Row className='mt-1'>
                    <Col sm='12'>
                        <InputGroup className='input-group-merge'>
                            <Input
                                className='search-product'
                                placeholder='Search Bounty'
                                onChange={e => {
                                    searchEnhancer(() => setSearchTerm(e.target.value))
                                }}
                            />
                            <InputGroupAddon addonType='append'>
                                <InputGroupText>
                                    <Search className='text-muted' size={14}/>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        )
    }, [])

    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle='Bounty Tasks'
                breadCrumbParent='Tasks'
                breadCrumbActive='List'
            />
            <div className='content-detached content-right ecommerce-application'>
                <div className='content-body'>
                    <CustomHeader/>
                    <div className="mt-2">
                        <div className="h2">{filters.join(', ')}</div>
                       {bounties.length > 0 && <div>Campaigns: {bounties.length}</div>}
                    </div>
                    {loading ? (<div className="mt-4"><ProgressLoader size="lg"/></div>) : (
                        bounties.length > 0 ? <div className="grid-view">{renderRenderList()}</div> : <div className='d-flex justify-content-center mt-2'>
                            <p>No Results</p>
                        </div>
                    )}
                </div>
            </div>
            <Sidebar searchTerm={searchTerm}/>
        </Fragment>
    )
}

export default BountyList
