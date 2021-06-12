import { Facebook, Send, Twitter } from 'react-feather'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton
} from "react-share"
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap'

const Referral = () => {
    const referralCode = useSelector(state => state.auth.userDetails.referralCode)

    const shareableUrl = `${window.location.origin}/register?referralLink=${referralCode}`
    return (
        <div>
            <Row className="d-flex justify-content-center">
                <Col lg='6'>
                    <Card>
                        <CardTitle className="align-self-center my-3">Share your link & earn more</CardTitle>
                        <CardBody>
                            <div className="form-group d-flex flex-row">
                                <Link onClick={() => {
                                    navigator.clipboard.writeText(shareableUrl)
                                    toast.success('Link copied!!')

                                }} className="d-flex bg-transparent text-blue" style={{flex: 1}}>
                                    <div type="text" readOnly
                                         className="form-control bg-transparent text-primary border border-primary"
                                         id="amount"
                                    >{shareableUrl}</div>
                                </Link>
                                <Button.Ripple to='/' color='primary' style={{borderRadius: 0}} onClick={() => {
                                    navigator.clipboard.writeText(shareableUrl)
                                    toast.success('Link copied!!')

                                }} className='d-flex btn-sm-block mb-2 rounded-right'>
                                    Copy
                                </Button.Ripple>
                            </div>
                            <div className="d-flex flex-row">
                                <FacebookShareButton
                                    className='d-flex flex-fill mb-2 justify-content-center align-items-center rounded mx-1 bg-primary text-white py-1'
                                    color="primary" url={shareableUrl}>
                                    <Facebook/>

                                </FacebookShareButton>
                                <TelegramShareButton
                                    className='d-flex flex-fill mb-2 justify-content-center align-items-center rounded mx-1 bg-primary text-white'
                                    color="primary" url={shareableUrl}>
                                    <Send/>

                                </TelegramShareButton>
                                <TwitterShareButton
                                    className='d-flex flex-fill mb-2 justify-content-center align-items-center rounded mx-1 bg-primary text-white'
                                    color="primary" url={shareableUrl}>
                                    <Twitter/>

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
