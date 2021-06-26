import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Form, FormGroup, Row, Col, Button, CardTitle, CardText, Label, CustomInput} from 'reactstrap'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {ProgressLoader} from '../../layouts/ProgressLoader'
import {useEffect, useState} from 'react'

import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import {verifyTwoFactorAuth} from '../../redux/actions/auth'
import {DisableTwoFactorPopup} from './components/DisableTwoFactorPopup'

const AuthenticatorTabContent = () => {

    const dispatch = useDispatch()
    const [dataQR, setDataQr] = useState('')
    const [enableTwoFactor, setTwoFactorEnable] = useState(false)
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
    const [secret, setSecret] = useState({})


    const loading = useSelector(state => state.auth.loading)
    const hasTwoFactorAuthentication = useSelector(state => state.auth.userDetails.twoFactorAuthentication)
    const twoFactorAuthentationMeta = useSelector(state => state.auth.userDetails.twoFactorAuthenticationMetaData)
    useEffect(() => {
        if (twoFactorAuthentationMeta === null) {
            setSecret(speakeasy.generateSecret({name: process.env.REACT_APP_TWO_FACTOR_NAME}))
        } else if (twoFactorAuthentationMeta !== undefined) {
            setSecret(JSON.parse(twoFactorAuthentationMeta))
        }

    }, [twoFactorAuthentationMeta])

    useEffect(() => {
        QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
            setDataQr(data_url)
        })
    }, [secret])

  const validationSchema = Yup.object().shape({
    token: Yup.string().required('Token is required')
      .test('len', 'Must be exactly 6 digits', val => { return val?.toString().length === 6 })
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
                {!hasTwoFactorAuthentication ? <>
                    <CustomInput type="switch" id="exampleCustomSwitch" className="my-2" name="customSwitch"
                                 label="Do you want enable Two factor authentication?" onChange={(e) => {
                        setTwoFactorEnable(!enableTwoFactor)
                    }}/>

                    {enableTwoFactor && <>
                        <CardText className='mb-2'>
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
                                <input
                                    name="token"
                                    type="number" pattern="[0-9]*"
                                    autoFocus
                                    placeholder="Enter secret code"
                                    className={`form-control ${errors.token ? 'is-invalid' : ''}`}
                                    {...register('token')}
                                />
                                <small className='text-danger'>
                                    {errors.token && errors.token.message}
                                </small>
                            </FormGroup>
                            <Button.Ripple type="submit" color='primary' block>
                                {loading ? <ProgressLoader/> : 'Verify'}
                            </Button.Ripple>
                        </Form>
                    </>}
                </> : <>
                    <CardText className='mb-2'>
                        You have already secured account with 2-Factor authenticator
                    </CardText>
                    <Button.Ripple onClick={() => setShowConfirmationPopup(true)} color='danger'>
                        Disable 2-factor authentication
                    </Button.Ripple>
                </>}

                {showConfirmationPopup &&
                <DisableTwoFactorPopup
                    showConfirmationPopup={showConfirmationPopup}
                    setShowConfirmationPopup={setShowConfirmationPopup}
                />}
            </Col>
        </Row>
    )
}

export default AuthenticatorTabContent
