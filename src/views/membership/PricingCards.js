import classnames from 'classnames'
import {Row, Col, Card, CardBody, Button} from 'reactstrap'
import {loadStripe} from "@stripe/stripe-js"
import axios from "axios"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const PricingCards = ({plans, duration}) => {
    const userData = useSelector(state => state.auth.userDetails)

    const handleClick = async event => {
        const stripe = await stripePromise
        if (userData.subscriptionId) {
            const response = await axios.get('/subscriptions/create-customer-portal-session')
            window.location.replace(response.data.url)
        } else {
            const response = await axios.post(
                '/subscriptions/create-checkout-session',
                {
                    id: event
                }
            )
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id
            })
            if (result.error) {
                toast.error('Something went wrong, please try again')
            }
        }
    }

    const renderPricingCards = () => {
        return plans.map((item, index) => {
            return (
                <Col key={index} md='4' xs='12'>
                    <Card
                        className={classnames('text-center', {
                            [`${item.title.toLowerCase()}-pricing`]: item.title
                        })}
                    >
                        <CardBody>
                            {/*<img className={imgClasses} src={item.img} alt='pricing svg' />*/}
                            <h3>{item.title}</h3>
                            {/*<CardText>{item.subtitle}</CardText>*/}
                            <div className='annual-plan'>
                                <div className='plan-price mt-2'>
                                    <sup className='font-medium-1 font-weight-bold text-primary mr-25'>$</sup>
                                    <span
                                        className={`pricing-${item.title.toLowerCase()}-value font-weight-bolder text-primary`}>
                    {item.price / 100}
                  </span>
                                    <span
                                        className='pricing-duration text-body font-medium-1 font-weight-bold ml-25'>/month</span>
                                </div>
                                {/*{item.title !== 'Basic' && duration === 'yearly' ? (*/}
                                {/*  <small className='annual-pricing text-muted'>USD {yearlyPrice} / year</small>*/}
                                {/*) : null}*/}
                            </div>
                            <div dangerouslySetInnerHTML={{__html: item.description}}/>
                            <Button.Ripple
                                color={userData.subscriptionId === item.id ? 'success' : 'primary'}
                                block
                                disabled={userData.subscriptionId === item.id}
                                onClick={() => handleClick(item.id)}
                            >
                                {userData.subscriptionId === item.id ? 'Your current plan' : 'Buy'}
                            </Button.Ripple>
                        </CardBody>
                    </Card>
                </Col>
            )
        })
    }

    return (
        <Row className='pricing-card'>
            <Col className='mx-auto' sm={{offset: 2, size: 10}} lg={{offset: 2, size: 10}} md='12'>
                <Row>{renderPricingCards()}</Row>
            </Col>
        </Row>
    )
}

export default PricingCards
