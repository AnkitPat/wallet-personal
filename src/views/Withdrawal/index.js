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

function PtmWithdrawal({ }) {
  const [account, setAccount] = useState('')
  const [showMetaMask, setShowMetaMask] = useState(false)
  const [ptmAmount, setPTMAmount] = useState(0)

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable()
      web3.eth.getAccounts().then(addr => {
        setAccount(addr[0])
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
    })
  })


  const tokenInfo = useSelector(state => state.dashboard.tokenInfo)
  const loading = useSelector(state => state.membership.loading)

  const changeCreditToPTM = credit => {
    if (tokenInfo && tokenInfo.price) {
      console.log(credit, tokenInfo.price.rate)
      setPTMAmount(+credit / tokenInfo.price.rate)
    }
  }

  const validationSchema = Yup.object().shape({
    amount: Yup.number('Amount is required')
      .typeError('Please enter the credit amount')
      .positive()
      .integer('Amount should not be in decimal values')
      .min(10, 'Amount should be more than 10')
      .required('Amount is required')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = values => {
    dispatch(transferCredits(values))
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

    <Row className="match-height">
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
                  {...register('amount')}

                  type="number"
                  className={`form-control bg-transparent text-black ${errors.amount ? 'is-invalid' : ''
                    }`}
                  size="lg"
                  name="amount"
                  id="credit"

                  onChange={e => changeCreditToPTM(e.target.value)}
                  placeholder="Enter Amount"
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
                  type="number"
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
                  PTM Token after transfer fee
                </Label>
                <input
                  className={`form-control bg-transparent text-black `}

                  type="number"

                  size="lg"
                  name="amount"
                  value={ptmAmount * 0.8}
                  id="credit"
                  readOnly
                />

              </FormGroup>


              <Button.Ripple color='primary' block type="submit">
                {loading ? <ProgressLoader /> : 'Transfer Credit'}
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
