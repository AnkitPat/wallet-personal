import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'
import { getRewards } from './selectors'

const BountyStatCard = ({  }) => {
    const pendingBountiesReward = useSelector(state => getRewards('pending', state, 'verified'))
    const completedBountiesReward = useSelector(state => getRewards('verified', state, 'verified'))
    const claimedBountiesReward = useSelector(state => getRewards(true, state, 'claimed'))

    const options = {
        chart: {
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: { show: false },
        comparedResult: [2, -3, 8],
        labels: ['Completed', 'Claimed', 'Pending'],
        stroke: { width: 0 },
        colors: ['#28c76f66', '#28c76f33', '#28c76f11'],
        grid: {
            padding: {
                right: -20,
                bottom: -8,
                left: -20
            }
        },
        plotOptions: {
            pie: {
                startAngle: -10,
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
                breakpoint: 1325,
                options: {
                    chart: {
                        height: 100
                    }
                }
            },
            {
                breakpoint: 1200,
                options: {
                    chart: {
                        height: 120
                    }
                }
            },
            {
                breakpoint: 1065,
                options: {
                    chart: {
                        height: 100
                    }
                }
            },
            {
                breakpoint: 992,
                options: {
                    chart: {
                        height: 120
                    }
                }
            }
        ]
    }
   
    return (
        <Card className='earnings-card'>
            <CardBody>
                <Row>
                    <Col xs='6'>
                        <CardTitle className='mb-1'>Earnings</CardTitle>
                        <div className='font-small-2'>Completed bounty reward</div>
                        <CardText className='text-muted font-small-2'>
                            <span className='font-weight-bolder'>{completedBountiesReward}</span>
                        </CardText>
                        <div className='font-small-2'>Claimed bounty reward</div>
                        <CardText className='text-muted font-small-2'>
                            <span className='font-weight-bolder'>{claimedBountiesReward}</span>
                        </CardText>
                        <div className='font-small-2'>Pending bounty reward</div>
                        <CardText className='text-muted font-small-2'>
                            <span className='font-weight-bolder'>{pendingBountiesReward}</span>
                        </CardText>
                    </Col>
                    <Col xs='6'>
                        <Chart options={options} series={[completedBountiesReward, claimedBountiesReward, pendingBountiesReward]} type='donut' height={150} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default BountyStatCard
