import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import PricingFaqs from './PricingFaqs'
import PricingCards from './PricingCards'
import PricingTrial from './PricingTrial'
import PricingHeader from './PricingHeader'

import '@styles/base/pages/page-pricing.scss'
import { useDispatch } from 'react-redux'
import { fetchPlans } from '../../redux/actions/membership'

const Pricing = () => {


  const [data, setData] = useState(null),
    [faq, setFaq] = useState(null),
    [duration, setDuration] = useState('monthly')

    const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchPlans())
  }, [])

  return (
    <div id='pricing-table'>
      <PricingHeader duration={duration} setDuration={setDuration} />
        <Fragment>
          <PricingCards duration={duration} />
          <PricingFaqs data={faq} />
        </Fragment>
    </div>
  )
}

export default Pricing
