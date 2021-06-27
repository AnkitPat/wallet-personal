import Chart from 'react-apexcharts'
import { HelpCircle } from 'react-feather'
import { useSelector } from 'react-redux'
import { Card, CardTitle, CardText, CardBody, Row, Col, CardHeader } from 'reactstrap'
import { getRewards } from './selectors'

const BountyStatCard = ({ }) => {
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
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Earnings</CardTitle>
                <HelpCircle size={18} className='text-muted cursor-pointer' />
            </CardHeader>
            <CardBody className='p-0 mb-3'>
                <Chart options={options} series={[completedBountiesReward, claimedBountiesReward, pendingBountiesReward]} type='donut' height={250} />
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
