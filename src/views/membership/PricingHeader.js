import { duration } from 'moment'
import { CustomInput } from 'reactstrap'

const PricingHeader = ({ duration, setDuration }) => {

  return (
    <div className='text-center'>
      <h1 className='mt-5'>Pricing Plans</h1>
      <p className='mb-2 pb-75'>
        Membership Plans Join the Potentiam plans to receive a variety of advantages
      </p>

    </div>
  )
}

export default PricingHeader
