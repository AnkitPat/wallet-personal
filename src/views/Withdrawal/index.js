/**
 *
 * PtmTokenForm
 *
 */

import Breadcrumbs from '@components/breadcrumbs'
import themeConfig from '@configs/themeConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import web3 from '@src/utility/web3'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Label, Row } from 'reactstrap'
import * as Yup from 'yup'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import { fetchTokenInfo } from '../../redux/actions/dashboard'
import { transferCredits } from '../../redux/actions/withdrawal'
import { history } from '../../utility/Utils'

function PtmWithdrawal({ }) {
  const [account, setAccount] = useState('')
  const [showMetaMask, setShowMetaMask] = useState(false)
  const [ptmAmount, setPTMAmount] = useState(0)
  const [exclusiveAmount, setExclusiveAmount] = useState(0)

  const tokenInfo = useSelector(state => state.dashboard.tokenInfo)
  const userCredits = useSelector(state => state.auth.userDetails.credit)
  const loading = useSelector(state => state.withdrawal.loading)

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
    formState: { errors },
    setValue,
    getValues,
    clearErrors
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      walletAddress: account
    }
  })
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable()
      web3.eth.getAccounts().then(addr => {
        setAccount(addr[0])
        setValue('walletAddress', addr[0])
      })
    } else {
      setShowMetaMask(true)
    }
  }, [])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTokenInfo())
  }, [])

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts) => {
      setAccount(accounts[0])
      setValue('walletAddress', accounts[0])

    })
  })


  const changeCreditToPTM = credit => {
    if (tokenInfo && tokenInfo.price) {
      setPTMAmount(+credit / tokenInfo.price.rate)
    }
  }


  const onSubmit = values => {
    dispatch(transferCredits({
      ...values,
      fees: 20,
      exclusiveAmount: values.amount,
      amount: values.amount * 0.8,
      token: ptmAmount * 0.8
    }))
  }


  return <Fragment>
    <Breadcrumbs
      breadCrumbTitle='Withdrawal'
      breadCrumbParent=''
      breadCrumbActive='Withdrawal'
    />
    {showMetaMask && <div className="row">
      <div className="col">
        <p>You need an Ethereum wallet to withdraw in Potentiam token</p>
        <img src="https://opensea.io/static/images/logos/metamask-alternative.png" />
        <a href="https://metamask.io/download.html" target="_blank">
          <Button.Ripple color='primary' className='btn-sm-block mb-2'>
            Get MetaMask
          </Button.Ripple>
        </a>
      </div>
    </div>}
    <div className="form-group dark-layout">
      <div className="form-group">
        {account ? <p className="recharts-text">Recieving Address: {account}</p> : <p className="recharts-text">Please connect metamask</p>}
      </div>
    </div>

    <Button.Ripple color='primary' className='my-2' onClick={() => history.push('/withdrawal/history')}>
      Withdrawal History
    </Button.Ripple>
    {account && account.length > 0 && <Row className="match-height">
      <Col xl='8' md='6' xs='12'>
        <Card className='mb-0'>
          <CardBody>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <img src={themeConfig.app.appLogoImage} alt='logo' style={{ width: 50, height: 50 }} />
              <h2 className='brand-text text-primary ml-1'>Potentiam</h2>
            </div>
            <CardTitle tag='h4' className='mb-1'>
              Transfer/Convert credits
            </CardTitle>
            <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>

              <FormGroup>
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
                  Transfer Fee: 20%
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
                  value={exclusiveAmount * 0.8}
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
                  value={ptmAmount * 0.8}
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
                {loading ? <ProgressLoader /> : 'Transfer Credit'}
              </Button.Ripple>
            </Form>

          </CardBody>
        </Card>
      </Col>
    </Row>}
  </Fragment>
}

PtmWithdrawal.propTypes = {}
export default memo(PtmWithdrawal)
