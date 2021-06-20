import classnames from 'classnames'
import { useMemo } from 'react'
import { Row, Col, Card, CardBody, CardText, Badge, ListGroup, ListGroupItem, Button } from 'reactstrap'

const PricingCards = ({ plans, duration }) => {
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
                  <span className={`pricing-${item.title.toLowerCase()}-value font-weight-bolder text-primary`}>
                    {item.price / 100}
                  </span>
                  <span className='pricing-duration text-body font-medium-1 font-weight-bold ml-25'>/month</span>
                </div>
                {/*{item.title !== 'Basic' && duration === 'yearly' ? (*/}
                {/*  <small className='annual-pricing text-muted'>USD {yearlyPrice} / year</small>*/}
                {/*) : null}*/}
              </div>
              <div dangerouslySetInnerHTML={{__html: item.description}}/>
              <Button.Ripple
                color={item.title === 'Basic' ? 'success' : 'primary'}
                outline={item.title !== 'Standard'}
                block
              >
                {item.title === 'Basic' ? 'Your current plan' : 'Upgrade'}
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Row className='pricing-card'>
      <Col className='mx-auto' sm={{ offset: 2, size: 10 }} lg={{ offset: 2, size: 10 }} md='12'>
         <Row>{renderPricingCards()}</Row>
      </Col>
    </Row>
  )
}

export default PricingCards
