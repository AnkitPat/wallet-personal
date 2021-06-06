import Instagram from '@uppy/instagram'
import { useState } from 'react'
import { AlignJustify, Rss, Info, Image, Users, Edit, Twitter, Facebook, Mail, Send } from 'react-feather'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button, CardBody, CardTitle, Row, Col } from 'reactstrap'
import bannerImage from '../../assets/images/avatars/banner-bg.jpg'
import { history } from '../../utility/Utils'
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share"
import { useSelector } from 'react-redux'

const Referral = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const referralCode = useSelector(state => state.auth.userDetails.referralCode)

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col lg='6'>
          <Card>

            <CardTitle className="align-self-center my-3">Share your link & earn more</CardTitle>
            <CardBody>
              <div className="form-group d-flex flex-row">
                <Link onClick={() => {
                  navigator.clipboard.writeText(`https://dummyLink.com?referralLink=${referralCode}`)
                  toast.success('Link copied!!')

                }} className="d-flex bg-transparent text-blue" style={{ flex: 1 }}><div type="text" readOnly className="form-control bg-transparent text-primary border border-primary" id="amount"
                >{`https://dummyLink.com?referralLink=${referralCode}`}</div>
                </Link>
                <Button.Ripple to='/' color='primary' style={{ borderRadius: 0 }} onClick={() => {
                  navigator.clipboard.writeText(`https://dummyLink.com?referralLink=${referralCode}`)
                  toast.success('Link copied!!')

                }} className='d-flex btn-sm-block mb-2 rounded-right'>
                  Copy
          </Button.Ripple>
              </div>

              <div className="d-flex flex-row">


                <FacebookShareButton className='d-flex flex-fill mb-2 justify-content-center align-items-center rounded mx-1 bg-primary text-white py-1' color="primary" url={`https://dummyLink.com?referralLink=${referralCode}`}>
                  <Facebook />

                </FacebookShareButton>

                <TelegramShareButton className='d-flex flex-fill mb-2 justify-content-center align-items-center rounded mx-1 bg-primary text-white' color="primary" url={`https://dummyLink.com?referralLink=${referralCode}`}>
                  <Send />

                </TelegramShareButton>

                <TwitterShareButton className='d-flex flex-fill mb-2 justify-content-center align-items-center rounded mx-1 bg-primary text-white' color="primary" url={`https://dummyLink.com?referralLink=${referralCode}`}>
                  <Twitter />

                </TwitterShareButton>


              </div>

              <div className="justify-content-center d-flex font-weight-bold">
                (Your Code {referralCode})
              </div>
            </CardBody>
          </Card>

        </Col>
      </Row>
    </div>
  )
}

export default Referral
