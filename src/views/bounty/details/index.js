import React, {Fragment, useState, useEffect} from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button, Alert, CardText
} from 'reactstrap'

import '@styles/base/pages/page-blog.scss'
import {useParams} from 'react-router-dom'
import moment from 'moment'
import {ProgressLoader} from '../../../layouts/ProgressLoader'
import {useDispatch, useSelector} from 'react-redux'
import {AddBountyLink} from '../add/components/AddLink/AddBountyLink'
import {fetchBountyDetails} from '../../../redux/actions/bounty'
import BountySidebar from "../sidebar"

const BountyDetails = () => {

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
    const [selectedBounty, setSelectedBounty] = useState({})

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (params && params.id) {
            dispatch(fetchBountyDetails(params.id))
        }
    }, [params])

    const loading = useSelector(state => state.bounty.loading)
    const bounty = useSelector(state => state.bounty.bounty)

    if (!bounty) {
        return <ProgressLoader size='lg'/>
    }

    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle='Bounty Details'
                breadCrumbParent='Bounties'
                breadCrumbActive='Details'
            />
            <div className='blog-wrapper'>
                <div className='content-detached content-left'>
                    <div className='content-body'>
                        {loading ? (<ProgressLoader size="lg"/>) : (
                            <Row>
                                <Col sm='12'>
                                    <Card className='mb-3'>
                                        <CardBody>
                                            <CardTitle tag='h4'>{bounty.title}</CardTitle>
                                            <hr/>
                                            <div className="card-app-design">
                                            <div className='design-planning-wrapper mb-2 py-75'>
                                                <div className='design-planning'>
                                                    <CardText className='mb-25'>Due Date</CardText>
                                                    <h6 className='mb-0'>{bounty.deadline && moment(bounty.deadline).format('MMMM Do, YYYY')}</h6>
                                                </div>
                                                <div className='design-planning'>
                                                    <CardText className='mb-25'>Reward</CardText>
                                                    <h6 className='mb-0'>{bounty.amount}</h6>
                                                </div>
                                                <div className='design-planning'>
                                                    <CardText className='mb-25'>Project</CardText>
                                                    <h6 className='mb-0'>{bounty.project.title}</h6>
                                                </div>
                                                <div className='design-planning'>
                                                    <CardText className='mb-25'>Category</CardText>
                                                    <h6 className='mb-0'>{bounty.socialMedium.title}</h6>
                                                </div>
                                            </div>
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: bounty.description
                                                }}
                                            ></div>
                                            <hr/>
                                            <div className="my-2">
                                                {bounty.userBounty && !bounty.userBounty.verified &&
                                                <>
                                                    <Button.Ripple
                                                        type="submit"
                                                        color='primary'
                                                        className='mb-2'
                                                        disabled
                                                    >
                                                        Submitted
                                                    </Button.Ripple>
                                                    <Alert color='info'>
                                                        <div className='alert-body'>
                                                            Verification Pending
                                                        </div>
                                                    </Alert>
                                                </>
                                                }
                                                {bounty.userBounty && bounty.userBounty.verified &&
                                                <Alert color='info'>
                                                    <div className='alert-body'>
                                                        Task successfully completed
                                                    </div>
                                                </Alert>
                                                }
                                                {!bounty.userBounty &&
                                                <Button.Ripple
                                                    type="submit"
                                                    color='primary'
                                                    className='mr-1'
                                                    onClick={() => {
                                                        setShowConfirmationPopup(true)
                                                        setSelectedBounty(bounty)
                                                    }}>
                                                    Complete Bounty
                                                </Button.Ripple>
                                                }
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <AddBountyLink
                                    showConfirmationPopup={showConfirmationPopup}
                                    setShowConfirmationPopup={setShowConfirmationPopup}
                                    selectedBounty={selectedBounty}/>
                            </Row>
                        )}
                    </div>
                </div>
                <BountySidebar bounty={bounty}/>
            </div>
        </Fragment>
    )
}

export default BountyDetails
