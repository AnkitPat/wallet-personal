import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {Button, Card, Col, ListGroup, ListGroupItem, Row} from 'reactstrap'
import {createPayment} from '../../redux/actions/wallet'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export function OrderSuccess() {

    const query = useQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        if (query.get('session_id')) {
            dispatch(createPayment(query.get('session_id')))
        }
    }, [query])

    return (
        <>
            <div>
                <Row className="mt-4 justify-content-center">
                    <Col lg={6}>
                        <Card className="bg-transparent blick-border">
                            <ListGroup>
                                <ListGroupItem className="p-4 bg-transparent border-0 text-center">

                                    <div className="h1 text-center text-success">Success</div>
                                    <div className="m-4">
                                        <small className="h6">Your credit purchase order was successful</small>
                                    </div>
                                    <Link to="/wallet">
                                        <Button className="mt-2" color="success">
                                            Go back to wallet
                                        </Button>
                                    </Link>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

OrderSuccess.propTypes = {}

export default OrderSuccess
