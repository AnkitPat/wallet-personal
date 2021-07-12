import {Card, CardBody, CardTitle} from 'reactstrap'
import {useSelector} from 'react-redux'
import {useMemo} from 'react'
import {CreditCard} from "react-feather"

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
        <Card className='card-congratulations-medal overflow-hidden'>
            <CardBody>
                <CardTitle tag='h4'>Balance</CardTitle>
                <h5 className='mb-75 mt-2 pt-50'>
                    Credits: ${userCredits > 1000 ? `${(userCredits / 1000)}k` : userCredits}
                </h5>
                <h5 className='mt-1 pt-50'>
                    PTM Token: {convertCredits}
                </h5>
                <div className="icon-body">
                    <CreditCard size={100}/>
                </div>
            </CardBody>
        </Card>
    )
}

export default UserStats
