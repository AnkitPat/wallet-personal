import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/charts/apex-charts.scss'
import { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Copy } from 'react-feather'
import { batch, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Card, CardBody, CardSubtitle, Col, Row } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import { fetchMyBounties } from '../../redux/actions/bounty'
import { fetchTokenInfo } from '../../redux/actions/dashboard'
import BountyStatCard from './components/BountyStatCard'
import StatsCard from './components/StatsCard'
import UserStats from "./components/UserStats"

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        batch(() => {
            dispatch(fetchTokenInfo())
            dispatch(fetchMyBounties())
        })
    }, [])

    const loader = useSelector(state => state.dashboard.loading)
    const tokenInfo = useSelector(state => state.dashboard.tokenInfo)
    return (
        <div id='dashboard-ecommerce'>
            <Row className="match-height">
                <Col xl='8' md='6' xs='12'>
                    <StatsCard cols={{xl: '3', sm: '6'}} loader={loader} tokenInfo={tokenInfo}/>
                </Col>
              <Col xl='4' md='6' xs='12'>
                <UserStats />
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
                                    }}/>
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
                                        24h:
                                        <div
                                            className={`mr-1 ${tokenInfo.price.diff > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff).toFixed(2)}%
                                        </div>
                                        7d:
                                        <div
                                            className={`mr-1 ${tokenInfo.price.diff7d > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff7d).toFixed(2)}%
                                        </div>
                                        30d:
                                        <div
                                            className={`mr-1 ${tokenInfo.price.diff30d > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff30d).toFixed(2)}%
                                        </div>
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
                                        24h:
                                        <div
                                            className={`mr-1 ${tokenInfo.price.volDiff1 > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.volDiff1).toFixed(2)}%
                                        </div>
                                        7d:
                                        <div
                                            className={`mr-1 ${tokenInfo.price.volDiff7 > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.volDiff7).toFixed(2)}%
                                        </div>
                                        30d:
                                        <div
                                            className={`mr-1 ${tokenInfo.price.volDiff30 > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.volDiff30).toFixed(2)}%
                                        </div>
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
                <Col xl='5' md='4' xs='12'>
                    <BountyStatCard />
                </Col>
            </Row> </>}
        </div>
    )
}

export default Home
