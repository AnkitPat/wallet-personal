import { ThemeColors } from '@src/utility/context/ThemeColors'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/charts/apex-charts.scss'
import { useContext, useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { handleUserInformation } from '../../redux/actions/auth'
import { fetchTokenInfo } from '../../redux/actions/dashboard'
import RateBarChart from './components/RateBarChart'
import StatsCard from './components/StatsCard'
import VolumeBarChart from './components/VolumneLineChar'


const Home = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'

  const dispatch = useDispatch()
  useEffect(() => {
    batch(() => {
      dispatch(handleUserInformation())
      dispatch(fetchTokenInfo())
    })
  }, [])

  const loader = useSelector(state => state.dashboard.loading)
  const tokenInfo = useSelector(state => state.dashboard.tokenInfo)
  return (
    <div id='dashboard-ecommerce'>
      <Row className="match-height">
        <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} loader={loader} tokenInfo={tokenInfo} />
        </Col>
        
      </Row>
      <Row className='match-height'>
          <Col lg='6' md='3' xs='6'>
          <RateBarChart tokenInfo={tokenInfo} loader={loader} />
          </Col>
          <Col lg='6' md='3' xs='6'>
            <VolumeBarChart tokenInfo={tokenInfo} loader={loader} />
          </Col>
        </Row>
    </div>
  )
}

export default Home
