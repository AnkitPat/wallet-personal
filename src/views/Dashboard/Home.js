import { ThemeColors } from '@src/utility/context/ThemeColors'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/charts/apex-charts.scss'
import { useContext, useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Copy, Facebook, Send, Twitter } from 'react-feather'
import { batch, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Card, CardBody, CardSubtitle, Col, Row } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import { handleUserInformation } from '../../redux/actions/auth'
import { fetchTokenInfo } from '../../redux/actions/dashboard'
import RateBarChart from './components/RateBarChart'
import StatsCard from './components/StatsCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faReddit,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

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
      {tokenInfo && Object.keys(tokenInfo).length > 0 && <> <Row className='match-height'>
        <Col xl='6' md='4' xs='12'>

          <Card className="p-2">
            <CardTitle className="font-weight-bold">Contract Information</CardTitle>
            <CardSubtitle>
              <CopyToClipboard text={'0x7c32DB0645A259FaE61353c1f891151A2e7f8c1e'}
                onCopy={() => toast.success("Copied!!")}>
                <>
                  <span>0x7c32DB0645A259FaE61353c1f891151A2e7f8c1e</span>
                  {' '}
                  <Copy className="cursor-pointer" size="20" onClick={() => {
                    navigator.clipboard.writeText('0x7c32DB0645A259FaE61353c1f891151A2e7f8c1e')
                    toast.success("Copied!!")
                  }} />
                </>
              </CopyToClipboard>
            </CardSubtitle>
            <CardBody>
              <Row>
                <Col className="font-weight-bold">
                  Creator:
                </Col>
                <Col>
                  {tokenInfo.owner}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col xl='6' md='4' xs='12'>

          <Card className="p-2">
            <CardTitle className="font-weight-bold">Token Potentiam Information</CardTitle>
            <CardSubtitle>
              <div className="d-flex justify-content-between">
                <a href="https://www.potentiam.io">https://www.potentiam.io</a>
                <div>
                  {tokenInfo.facebook && <FontAwesomeIcon icon={faFacebook} size="1x" className="cursor-pointer mr-1" onClick={() => window.open(`https://www.facebook.com/${tokenInfo.facebook}`)} />}
                  {tokenInfo.twitter && <FontAwesomeIcon icon={faTwitter} size="1x" className="cursor-pointer mr-1" onClick={() => window.open(`https://www.twitter.com/${tokenInfo.twitter}`)} />}
                  {tokenInfo.reddit && <FontAwesomeIcon icon={faReddit} size="1x" className="cursor-pointer mr-1" onClick={() => window.open(`https://www.twitter.com/${tokenInfo.twitter}`)} />}
                  {tokenInfo.telegram && <Send size="15" className="cursor-pointer mr-1" onClick={() => window.open(`https://www.twitter.com/${tokenInfo.twitter}`)} />}
                </div>
              </div>
            </CardSubtitle>
            <CardBody>

              <Row>
                <Col className="font-weight-bold">
                  Symbol:
                </Col>
                <Col>
                  {tokenInfo.symbol}
                </Col>
              </Row>

              <Row className="my-1">
                <Col className="font-weight-bold">
                  Price:
                </Col>
                <Col>
                  {tokenInfo.price.rate}
                  <small className="d-flex flex-row ">
                    24h:<div className={`mr-1 ${tokenInfo.price.diff > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff).toFixed(2)}%</div>
                    7d:<div className={`mr-1 ${tokenInfo.price.diff7d > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff7d).toFixed(2)}%</div>
                    30d:<div className={`mr-1 ${tokenInfo.price.diff30d > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff30d).toFixed(2)}%</div>
                  </small>
                </Col>
              </Row>

              <Row className="my-1">
                <Col className="font-weight-bold">
                  Volume:
                </Col>
                <Col>
                  {'need to find'}
                  <small className="d-flex flex-row">
                    24h:<div className={`mr-1 ${tokenInfo.price.volDiff1 > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.volDiff1).toFixed(2)}%</div>
                    7d:<div className={`mr-1 ${tokenInfo.price.volDiff7 > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.volDiff7).toFixed(2)}%</div>
                    30d:<div className={`mr-1 ${tokenInfo.price.volDiff30 > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.volDiff30).toFixed(2)}%</div>
                  </small>
                </Col>
              </Row>

              <Row className="my-1">
                <Col className="font-weight-bold">
                  Total Supply:
                </Col>
                <Col>
                  $ {(tokenInfo.totalSupply / 1000000000000000000)}
                </Col>
              </Row>

              <Row className="my-1">
                <Col className="font-weight-bold">
                  Market Cap:
                </Col>
                <Col>
                  Need to add
                </Col>
              </Row>

              <Row className="my-1">
                <Col className="font-weight-bold">
                  Decimals:
                </Col>
                <Col>
                  {tokenInfo.decimals}
                </Col>
              </Row>

              <Row className="my-1">
                <Col className="font-weight-bold">
                  Owner:
                </Col>
                <Col>
                  {tokenInfo.owner}
                </Col>
              </Row>

              <Row className="my-1">
                <Col className="font-weight-bold">
                  Transfers:
                </Col>
                <Col>
                  {tokenInfo.transfersCount}
                </Col>
              </Row>

              <Row className="my-1">
                <Col className="font-weight-bold">
                  Holders:
                </Col>
                <Col>
                  {tokenInfo.holdersCount}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row> </>}
    </div>
  )
}

export default Home
