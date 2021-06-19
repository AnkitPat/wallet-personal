import { Card, CardBody, CardText, Button } from 'reactstrap'
import medal from '@src/assets/images/illustration/badge.svg'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const UserStats = () => {
    const userCredits = useSelector(state => state.auth.userDetails.credit)
    const tokenInfo = useSelector(state => state.dashboard.tokenInfo)

    const convertCredits = useMemo(() => {
        if (userCredits > 0 && tokenInfo.price) {
            return (userCredits / tokenInfo.price.rate).toFixed(2)
        }
        return 0
    }, [tokenInfo, userCredits])
    return (
        <Card className='card-congratulations-medal'>
            <CardBody>
                <h2>Your Credits</h2>
                <h4 className='mb-75 mt-2 pt-50'>
                    Credits:  ${userCredits > 1000 ? `${(userCredits / 1000)}k` : userCredits}
                </h4>
                <h4 className='mt-1 pt-50'>
                    PTM Token:  {convertCredits}
                </h4>
                <img className='congratulation-medal' src={medal} alt='Medal Pic' />
            </CardBody>
        </Card>
    )
}

export default UserStats
