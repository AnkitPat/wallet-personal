import InputPasswordToggle from '@components/input-password-toggle'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSkin } from '@hooks/useSkin'
import '@styles/base/pages/page-auth.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Button, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import * as Yup from 'yup'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import { handleRegister } from '../../redux/actions/auth'

const HostRegister = () => {
    const [referralCode, setReferralCode] = useState('')
    const [skin, setSkin] = useSkin()
    const {search} = useLocation()

    useEffect(() => {
        if (search) {
            const query = new URLSearchParams(search)
            const parsedReferralCode = query ? query.get('referrer') : ''
            if (parsedReferralCode) {
                setReferralCode(parsedReferralCode)
            }
        }
    }, [search])
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phone: Yup.string().required('Phone is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Ts & Cs is required')
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = values => dispatch(handleRegister({...values, referralCode, roleId: 2}))

    const loading = useSelector(state => state.auth.loading)

    const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

  
    return (
        <div className='auth-wrapper auth-v2'>
            <Row className='auth-inner m-0'>

                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login V2' />
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                        <CardTitle tag='h4' className='mb-1'>
                            Create your account
                        </CardTitle>

                        <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label className='form-label' for='register-name'>
                                    Name
                                </Label>
                                <Input type='text' id='register-name' placeholder='johndoe' autoFocus
                                    className={classNames({ 'is-invalid': errors['name'] })}
                                    {...register('name')}

                                />
                                <small className='text-danger'>
                                    {errors.name && errors.name.message}
                                </small>
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-email'>
                                    Email
                                </Label>
                                <Input type='email' id='register-email' placeholder='john@example.com'
                                    className={classNames({ 'is-invalid': errors['email'] })}
                                    {...register('email')}

                                />
                                <small className='text-danger'>
                                    {errors.email && errors.email.message}
                                </small>
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-phone'>
                                    Phone
                                </Label>
                                <Input type='number' id='register-phone' placeholder='+4413456789'
                                    className={classNames({ 'is-invalid': errors['phone'] })}
                                    {...register('phone')}
                                />
                                <small className='text-danger'>
                                    {errors.phone && errors.phone.message}
                                </small>
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-password'>
                                    Password
                                </Label>
                                <InputPasswordToggle
                                    id='register-password'
                                    className={classNames({ 'is-invalid': errors['password'] })}
                                    {...register('password')}
                                />
                                <small className='text-danger'>
                                    {errors.password && errors.password.message}
                                </small>
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-confirm-password'>
                                    Confirm Password
                                </Label>
                                <InputPasswordToggle
                                    id='register-confirm-password'
                                    className={classNames({ 'is-invalid': errors['confirmPassword'] })}
                                    {...register('confirmPassword')}
                                />
                                <small className='text-danger'>
                                    {errors.confirmPassword && errors.confirmPassword.message}
                                </small>
                            </FormGroup>

                            {loading ? <ProgressLoader /> : <Button.Ripple color='primary' block type="submit">
                                Sign up
                            </Button.Ripple>}
                        </Form>
                        <CardText tag="h5" className="mt-2">
                            Already have an account?{' '}
                            <Link to="/login">Sign in here</Link>
                        </CardText>
                       
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default HostRegister
