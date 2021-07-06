import {Row, Col} from 'reactstrap'
import AppCollapse from '@components/app-collapse'
import {useMemo} from 'react'

const PricingFaqs = ({data}) => {

    const faqs = useMemo(() => [
        {
            title: 'Can I Upgrade my Membership?',
            content: 'Yes, you can upgrade your membership plan.'
        },
        {
            title: 'How do you process subscription payments?',
            content: 'We use Stripe to process subscription payments.'
        },
        {
            title: 'Does my subscription automatically renew?',
            content: 'Yes, subscriptions automatically renew monthly.'
        },
        {
            title: 'Can I Pause or cancel my subscription?',
            content: 'Yes, you can pause your subscription and choose to restart at a later date. Or you can cancel your subscription at the end of the current period.'
        }
    ], [])


    return (
        <div className='pricing-faq'>
            <h3 className='text-center'>FAQ's</h3>
            <p style={{maxWidth: 820, margin: '0 auto'}}>
                There are four membership plans, including the regular membership free plan, available to everyone.
                However, we offer three other paid membership plans offering a variety of benefits in the Potentiam
                wallet. See the available membership plans by clicking your profile image on the top right-hand corner
                of the account home page.
            </p>
            <Row className='my-2'>
                <Col className='mx-auto' sm='12' lg={{size: 10, offset: 2}}>
                    <AppCollapse type='margin' data={faqs} titleKey='' contentKey='' accordion/>
                </Col>
            </Row>
        </div>
    )
}

export default PricingFaqs
