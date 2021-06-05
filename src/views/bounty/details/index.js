import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import cmtImg from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import { kFormatter } from '@utils'
import {
  Share2,
  MessageSquare,
  Bookmark,
  GitHub,
  Gitlab,
  Facebook,
  Twitter,
  Linkedin,
  CornerUpLeft
} from 'react-feather'
import Breadcrumbs from '@components/breadcrumbs'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Badge,
  Media,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Form,
  Input,
  Button,
  FormGroup,
  CustomInput
} from 'reactstrap'

import '@styles/base/pages/page-blog.scss'
import { useHistory, useLocation, useParams } from 'react-router'
import moment from 'moment'
import { ProgressLoader } from '../../../layouts/ProgressLoader'
import { useDispatch, useSelector } from 'react-redux'
import { AddBountyLink } from '../add/components/AddLink/AddBountyLink'
import { fetchBountyDetails } from '../../../redux/actions/bounty'

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

                      <Media>
                        <Media body>
                          <small className='text-muted'>{bounty.deadline && moment(bounty.deadline).format('DD/MM/YYYY')}</small>
                        </Media>
                      </Media>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: bounty.description
                        }}
                      ></div>

                      <div className="my-2">
                        <Button.Ripple type="submit" color='primary' className='mr-1' onClick={() => {
                          setShowConfirmationPopup(true)
                          setSelectedBounty(bounty)
                        }}>
                          Complete Bounty
                        </Button.Ripple>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <AddBountyLink showConfirmationPopup={showConfirmationPopup} setShowConfirmationPopup={setShowConfirmationPopup} selectedBounty={selectedBounty} completeBounty={() => {}} />

              </Row>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default BountyDetails
