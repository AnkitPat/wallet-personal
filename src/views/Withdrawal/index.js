/**
 *
 * PtmTokenForm
 *
 */

import themeConfig from '@configs/themeConfig'
import {yupResolver} from '@hookform/resolvers/yup'
import React, {Fragment, memo, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Label, Row} from 'reactstrap'
import * as Yup from 'yup'
import {ProgressLoader} from '../../layouts/ProgressLoader'
import {fetchTokenInfo} from '../../redux/actions/dashboard'
import {transferCredits} from '../../redux/actions/withdrawal'
import {NoWalletDetected} from "./components/NoWalletDetected"
import MetamaskConnect from "./components/MetamaskConnect"

function PtmWithdrawal() {
    const [address, setAddress] = useState('')
    const [ptmAmount, setPTMAmount] = useState(0)
    const [exclusiveAmount, setExclusiveAmount] = useState(0)

    const tokenInfo = useSelector(state => state.dashboard.tokenInfo)
    const userCredits = useSelector(state => state.auth.userDetails.credit)
    const userDetails = useSelector(state => state.auth.userDetails)
    const loading = useSelector(state => state.withdrawal.loading)
    const transferFee = userDetails.subscription ? userDetails.subscription.transferFee : 20

    const validationSchema = Yup.object().shape({
        amount: Yup.number('Amount is required')
            .typeError('Please enter the credit amount')
            .positive()
            .integer('Amount should not be in decimal values')
            .min(10, 'Amount should be more than 10')
            .max(userCredits, `Amount should be less than available credits ${userCredits}`)
            .required('Amount is required')
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
        clearErrors
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            walletAddress: address
        }
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTokenInfo())
    }, [])

    const changeCreditToPTM = credit => {
        if (tokenInfo && tokenInfo.price) {
            setPTMAmount(+credit / tokenInfo.price.rate)
        }
    }

    const onSubmit = values => {
        dispatch(transferCredits({
            ...values,
            fees: transferFee,
            exclusiveAmount: values.amount,
            amount: values.amount - (values.amount * (transferFee / 100)),
            token: Number((ptmAmount - (values.amount * (transferFee / 100))).toFixed(2))
        }))
    }

    async function connectWallet() {
        const [selectedAddress] = await window.ethereum.enable()
        setAddress(selectedAddress)
        setValue('walletAddress', selectedAddress, {shouldValidate: true})
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            setAddress(newAddress)
            setValue('walletAddress', selectedAddress, {shouldValidate: true})
        })

        window.ethereum.on("networkChanged", ([networkId]) => {
            setAddress('')
        })
    }

    if (window.ethereum === undefined) {
        return <NoWalletDetected/>
    }

    if (!address) {
        return <MetamaskConnect connectWallet={() => connectWallet()}/>
    }

    return <Fragment>
        <Row className="match-height">
            <Col xl='8' md='6' xs='12'>
                <Card className='mb-0'>
                    <CardBody>
                        <CardTitle tag='h4' className='mb-1'>
                            Withdraw
                        </CardTitle>
                        <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <FormGroup>
                                    <Label className='form-label' for='register-phone'>
                                        Total Credits: {userCredits}
                                    </Label>
                                </FormGroup>
                                <Label className='form-label' for='register-phone'>
                                    Credit
                                </Label>
                                <input
                                    type="number"
                                    className={`form-control bg-transparent text-black ${errors.amount ? 'is-invalid' : ''
                                    }`}
                                    size="lg"
                                    name="amount"
                                    id="credit"
                                    placeholder="Enter Amount"
                                    {...register('amount')}
                                    onChange={e => {
                                        if (e.target.value > 10 && e.target.value < userCredits) {
                                            clearErrors('amount', null)
                                        }
                                        setExclusiveAmount(e.target.value)
                                        changeCreditToPTM(e.target.value)
                                        setValue(e.target.value)
                                    }}
                                />
                                <small className='text-danger'>
                                    {errors.amount && errors.amount.message}
                                </small>
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-phone'>
                                    PTM Token
                                </Label>
                                <input
                                    className={`form-control bg-transparent text-black `}
                                    size="lg"
                                    name="amount"
                                    value={ptmAmount}
                                    id="credit"
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-phone'>
                                    Transfer Fee: {transferFee}%
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-phone'>
                                    Credits after transfer fee
                                </Label>
                                <input
                                    className={`form-control bg-transparent text-black `}
                                    size="lg"
                                    name="amount"
                                    value={exclusiveAmount * ((100 - transferFee) / 100)}
                                    id="credit"
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-phone'>
                                    PTM Token after transfer fee
                                </Label>
                                <input
                                    className={`form-control bg-transparent text-black `}
                                    size="lg"
                                    name="amount"
                                    value={ptmAmount * ((100 - transferFee) / 100)}
                                    id="credit"
                                    readOnly
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-phone'>
                                    Your Address
                                </Label>
                                <input
                                    className={`form-control bg-transparent text-black `}
                                    size="lg"
                                    name="walletAddress"
                                    value={getValues().walletAddress}
                                    id="credit"
                                    readOnly
                                    {...register('walletAddress')}
                                />
                            </FormGroup>
                            <Button.Ripple color='primary' block type="submit">
                                {loading ? <ProgressLoader/> : 'Transfer Credit'}
                            </Button.Ripple>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Fragment>
}

PtmWithdrawal.propTypes = {}
export default memo(PtmWithdrawal)
