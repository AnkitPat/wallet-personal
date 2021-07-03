import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/charts/apex-charts.scss'
import { useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardSubtitle, Col, Row } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import { fetchMyBounties } from '../../redux/actions/bounty'
import { fetchTokenInfo } from '../../redux/actions/dashboard'
import BountyStatCard from './components/BountyStatCard'
import CardCongratulations from './components/CardCongratulation'
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
                    {/* <StatsCard cols={{ xl: '3', sm: '6' }} loader={loader} tokenInfo={tokenInfo} /> */}
                    <CardCongratulations />
                </Col>
                <Col xl='4' md='6' xs='12'>
                    <UserStats />
                </Col>
            </Row>
            {tokenInfo && Object.keys(tokenInfo).length > 0 ? <> <Row className='match-height'>
                <Col xl='6' md='4' xs='12'>
                    <div>
                        <BountyStatCard />
                    </div>
                </Col>

                <Col xl='6' md='4' xs='12'>
                    <Card className="p-2">
                        <CardTitle className="font-weight-bold">Potentiam Token  Information</CardTitle>
                        <CardSubtitle>
                            <div className="d-flex justify-content-between">
                                <a href="https://www.potentiam.io">https://www.potentiam.io</a>
                                <div>

                                </div>
                            </div>
                        </CardSubtitle>
                        <CardBody>

                            <Row>
                                <div className="font-weight-bold col-3">
                                    Symbol:
                                </div>
                                <div className="col-9">
                                    {tokenInfo.symbol}
                                </div>
                            </Row>

                            <Row className="my-1">
                                <div className="font-weight-bold col-3">
                                    Price:
                                </div>
                                <div className="col-9">
                                    {tokenInfo.price.rate}
                                    <small className="d-flex flex-row ">
                                        24h:
                                        <span
                                            className={`mr-1 ${tokenInfo.price.diff > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff).toFixed(2)}%
                                        </span>
                                        7d:
                                        <span
                                            className={`mr-1 ${tokenInfo.price.diff7d > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff7d).toFixed(2)}%
                                        </span>
                                        30d:
                                        <span
                                            className={`mr-1 ${tokenInfo.price.diff30d > 0 ? 'text-success' : 'text-danger'}`}>{parseFloat(tokenInfo.price.diff30d).toFixed(2)}%
                                        </span>
                                    </small>
                                </div>
                            </Row>

                            <Row className="my-1">
                                <div className="font-weight-bold col-3">
                                    Volume:
                                </div>
                                <div className="col-9">
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
                                </div>
                            </Row>

                            <Row className="my-1">
                                <div className="font-weight-bold col-3">
                                    Total Supply:
                                </div>
                                <div className="col-9">
                                    $ {(tokenInfo.totalSupply / 1000000000000000000)}
                                </div>
                            </Row>

                            <Row className="my-1">
                                <div className="font-weight-bold col-3">
                                    Market Cap:
                                </div>
                                <div className="col-9">
                                    $ {((tokenInfo.totalSupply / 1000000000000000000) * tokenInfo.price.rate)}
                                </div>
                            </Row>

                            <Row className="my-1">
                                <div className="font-weight-bold col-3">
                                    Decimals:
                                </div>
                                <div className="col-9">
                                    {tokenInfo.decimals}
                                </div>
                            </Row>

                            <Row className="my-1">
                                <div className="font-weight-bold col-3">
                                    Contract:
                                </div>
                                <div className="col-9">
                                    {tokenInfo.address}
                                </div>
                            </Row>

                            <Row className="my-1">
                                <div className="font-weight-bold col-3">
                                    Transfers:
                                </div>
                                <div className="col-9">
                                    {tokenInfo.transfersCount}
                                </div>
                            </Row>

                            <Row className="my-1">
                                <div className="font-weight-bold col-3">
                                    Holders:
                                </div>
                                <div className="col-9">
                                    {tokenInfo.holdersCount}
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row> </> : <>            {loader ? <ProgressLoader size="lg" /> : <></>}
            </>}
        </div>
    )
}

export default Home
