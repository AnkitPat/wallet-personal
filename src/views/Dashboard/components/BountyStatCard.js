import ReactApexChart from 'react-apexcharts'
import { HelpCircle } from 'react-feather'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle, Col, PopoverBody, Row, UncontrolledPopover, UncontrolledTooltip } from 'reactstrap'
import { getRewards } from './selectors'

const BountyStatCard = ({ }) => {
    const pendingBountiesReward = useSelector(state => getRewards('pending', state, 'verified'))
    const completedBountiesReward = useSelector(state => getRewards('verified', state, 'verified'))
    const claimedBountiesReward = useSelector(state => getRewards(true, state, 'claimed'))
    const myBounties = useSelector(state => state.bounty.myBounties)
    const series = [completedBountiesReward, claimedBountiesReward, pendingBountiesReward]
    const options1 = {
        chart: {
            type: 'donut'
        },
        legend: { show: false },
        comparedResult: [2, -3, 8],
        labels: ['Completed', 'Claimed', 'Pending'],
        stroke: { width: 0 },
        colors: ['#28c76f66', '#28c76f33', '#F2BA58'],
        grid: {
            padding: {
                right: -20,
                bottom: -8,
                left: -20
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            offsetY: 15
                        },
                        value: {
                            offsetY: -15,
                            formatter(val) {
                                return `${parseInt(val)}`
                            }
                        },
                        total: {
                            show: true,
                            offsetY: 15,
                            label: 'Completed',
                            formatter(w) {
                                if (claimedBountiesReward && completedBountiesReward && pendingBountiesReward) {
                                    return `${((completedBountiesReward / (completedBountiesReward + claimedBountiesReward + pendingBountiesReward)) * 100).toFixed(2)}%`
                                }
                                return '0%'
                            }
                        }
                    }
                }
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    }

    return (
        <Card>
            
            <UncontrolledTooltip placement='top' target='UnControlledExample'>
            Discover ways to earn by visiting the bounty page.
                            </UncontrolledTooltip>
            <CardHeader>
                <CardTitle tag='h4'>Earnings</CardTitle>
                <HelpCircle size={18} id="UnControlledExample" className='text-muted cursor-pointer' />
            </CardHeader>
            {myBounties && myBounties.length === 0 ? <div className="mx-2">
                <CardSubtitle className='text-danger'>Data will be shown once you complete any bounty!!</CardSubtitle>
            </div> : <></>}
            <CardBody >
                <div className='recharts-wrapper'>

                    <ReactApexChart options={options1} series={series} type="donut" />

                </div>
            </CardBody>
            <Row className='border-top text-center mx-0'>
                <Col xs='4' className='border-right py-1'>
                    <CardText className='text-muted mb-0'>Completed</CardText>
                    <h3 className='font-weight-bolder mb-0'>{completedBountiesReward}</h3>
                </Col>
                <Col xs='4' className='border-right py-1'>
                    <CardText className='text-muted mb-0'>Claimed</CardText>
                    <h3 className='font-weight-bolder mb-0'>{claimedBountiesReward}</h3>
                </Col>
                <Col xs='4' className='py-1'>
                    <CardText className='text-muted mb-0'>Pending</CardText>
                    <h3 className='font-weight-bolder mb-0'>{pendingBountiesReward}</h3>
                </Col>
            </Row>
        </Card>
    )
}

export default BountyStatCard
