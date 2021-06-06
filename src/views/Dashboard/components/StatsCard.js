import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'
import { ProgressLoader } from '../../../layouts/ProgressLoader'

const StatsCard = ({ cols, loader, tokenInfo }) => {
    const data = [
        {
            title: '230k',
            subtitle: 'Sales',
            color: 'light-primary',
            icon: <TrendingUp size={24} />
        },
        {
            title: '8.549k',
            subtitle: 'Customers',
            color: 'light-info',
            icon: <User size={24} />
        },
        {
            title: '1.423k',
            subtitle: 'Products',
            color: 'light-danger',
            icon: <Box size={24} />
        },
        {
            title: '$9745',
            subtitle: 'Revenue',
            color: 'light-success',
            icon: <DollarSign size={24} />
        }
    ]

    return (
        <Card className='card-statistics'>
            <CardHeader>
                <CardTitle tag='h4'>Statistics</CardTitle>
                <CardText className='card-text font-small-2 mr-25 mb-0'>Updated 1 min ago</CardText>
            </CardHeader>
            {(!loader && Object.keys(tokenInfo).length > 0) ? <CardBody className='statistics-body'>
                <Row>
                    <Col
                        className={classnames({
                            [`mb-2 mb-1-0`]: 1
                        })}
                    >
                        <Media>
                            <Avatar color={'primary'} icon={<DollarSign size={24} />} className='mr-2' />
                            <Media className='my-auto' body>
                                <h4 className='font-weight-bolder mb-0'>{(tokenInfo.totalSupply / 1000000000000000000)}</h4>
                                <CardText className='font-small-3 mb-0'>Total Supply</CardText>
                            </Media>
                        </Media>
                    </Col>
                    <Col
                        className={classnames({
                            [`mb-2 mb-1-0`]: 1
                        })}
                    >
                        <Media>
                            <Avatar color={'primary'} icon={<TrendingUp size={24} />} className='mr-2' />
                            <Media className='my-auto' body>
                                <h4 className='font-weight-bolder mb-0'>{((tokenInfo.totalSupply / 1000000000000000000) * tokenInfo.price.rate)}</h4>
                                <CardText className='font-small-3 mb-0'>Market Cap</CardText>
                            </Media>
                        </Media>
                    </Col>
                    {/* <Col
                        className={classnames({
                            [`mb-2 mb-1-0`]: 1
                        })}
                    >
                        <Media>
                            <Avatar color={'primary'} icon={<TrendingUp size={24} />} className='mr-2' />
                            <Media className='my-auto' body>
                                <h4 className='font-weight-bolder mb-0'>{(tokenInfo.transfersCount)}</h4>
                                <CardText className='font-small-3 mb-0'>Transfer Count</CardText>
                            </Media>
                        </Media>
                    </Col> */}
                    <Col
                        className={classnames({
                            [`mb-2 mb-1-0`]: 1
                        })}
                    >
                        <Media>
                            <Avatar color={'primary'} icon={<User size={24} />} className='mr-2' />
                            <Media className='my-auto' body>
                                <h4 className='font-weight-bolder mb-0'>{(tokenInfo.holdersCount)}</h4>
                                <CardText className='font-small-3 mb-0'>Holders Count</CardText>
                            </Media>
                        </Media>
                    </Col>
                </Row>
            </CardBody> : <ProgressLoader size="lg" />}
            {/* <div>
                {(!loader && Object.keys(tokenInfo).length > 0) ? <div>
                    <div className="d-flex">
                        <div>TotalSupply:</div>
                        <div>{(tokenInfo.totalSupply / 1000000000000000000)}</div>
                    </div>

                    <div className="d-flex">
                        <div>TransferCount:</div>
                        <div>{tokenInfo.transfersCount}</div>
                    </div>

                    <div className="d-flex">
                        <div>HoldersCount:</div>
                        <div>{tokenInfo.holdersCount}</div>
                    </div>

                    <div className="d-flex">
                        <div>Market Cap:</div>
                        <div>{((tokenInfo.totalSupply / 1000000000000000000) * tokenInfo.price.rate)}</div>
                    </div>

                    <div className="d-flex">
                        <div>Volumn 24H:</div>
                        <div>{tokenInfo.price.volume24h}</div>
                    </div>
                </div> : <ProgressLoader size="lg" />
                }
            </div> */}
        </Card>
    )
}

export default StatsCard
