import {memo, useEffect} from "react"
import { Award } from 'react-feather'
import Avatar from '@components/avatar'
import {Button, Card, CardBody, CardText} from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import {useDispatch, useSelector} from "react-redux"
import {Link, useLocation} from "react-router-dom"
import {saveSubscriptionPayment} from "../../redux/actions/membership"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const SubscriptionSuccess = () => {
    const userDetails = useSelector(state => state.auth.userDetails)
    const query = useQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        if (query.get('session_id')) {
            dispatch(saveSubscriptionPayment(query.get('session_id')))
        }
    }, [query])

    return (
        <Card className='card-congratulations'>
            <CardBody className='text-center'>
                <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
                <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
                <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
                <div className='text-center'>
                    <h1 className='mb-1 text-white'>Congratulations {userDetails.name},</h1>
                    <CardText className='m-auto w-75'>
                        Your subscription purchase order was successful
                    </CardText>
                    <Link to="/home">
                        <Button.Ripple color='success' outline className="mt-2">
                            Go back to dashboard
                        </Button.Ripple>
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
}

export default memo(SubscriptionSuccess)
