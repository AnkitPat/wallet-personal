import classNames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button, Input, CardTitle, CardText, Label } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import * as Yup from 'yup'
import { history } from '../../utility/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangePassword } from '../../redux/actions/myAccount'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import { useEffect, useState } from 'react'

import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { verifyTwoFactorAuth } from '../../redux/actions/auth'

const AuthenticatorTabContent = () => {

  const dispatch = useDispatch()
  const [dataQR, setDataQr] = useState('')
  const [secret, setSecret] = useState({})


  const loading = useSelector(state => state.auth.loading)
  useEffect(() => {
    const secret = speakeasy.generateSecret()
    setSecret(secret)
    QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
      setDataQr(data_url)
    })
  }, [])


  const validationSchema = Yup.object().shape({
    token: Yup.number('Invalid token').required("Token is required")
      .nullable()
      .test('len', 'Must be exactly 6 digits', val => val?.toString().length === 6)
      .transform(value => (isNaN(value) ? undefined : value))

  })
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = data => {
    dispatch(verifyTwoFactorAuth(secret, data.token))
    reset({})
  }


  return (
    <Row className="d-flex">
      <Col sm='12'>
        <CardTitle tag='h2' className='font-weight-bold mb-1'>
          2FA Authenticator 🔒
        </CardTitle>
        { false ? <> <CardText className='mb-2'>
          Scan QR code 2FA apps.
        </CardText>
          <img
            src={dataQR}
          />

          <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label className='form-label' for='login-email'>
                After scanning QR, Please enter Secret Code
              </Label>
              <Input
                type='number'
                id='login-token'
                placeholder='123456'
                className={classNames({ 'is-invalid': errors['token'] })}
                value={getValues().token}
                {...register('token')}

              />
              <small className='text-danger'>
                {errors.token && errors.token.message}
              </small>
            </FormGroup>
            <Button.Ripple type="submit" color='primary' block>
              Verify
            </Button.Ripple>
          </Form>
        </> : <>
        <CardText className='mb-2'>
         You have already secured account with 2-Factor authenticator
        </CardText>
        </> }

      </Col>
    </Row>
  )
}

export default AuthenticatorTabContent
