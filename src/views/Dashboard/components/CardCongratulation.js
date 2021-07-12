import { Award } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import { useSelector } from 'react-redux'

const CardCongratulations = () => {
    const userDetails = useSelector(state => state.auth.userDetails)
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <div className="h2">🎉</div>
        <div className='text-center'>
          <h2 className='mb-1 text-white'>Welcome To Potentiam {userDetails ? userDetails.name : ''},</h2>
          <CardText className='m-auto w-75'>
          Get Ready For The Upcoming Featured Projects On Potentiam
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
