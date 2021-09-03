import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { handleRegister } from '../../redux/actions/auth'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import logo from '@src/assets/images/icons/logo-light.png'
import logoLight from '@src/assets/images/icons/logo.png'
import { useSkin } from '../../utility/hooks/useSkin'


const Register = () => {
    const [referralCode, setReferralCode] = useState('')
    const [skin, setSkin] = useSkin()
    const { search } = useLocation()
    const potentiamLogo = skin !== 'dark' ? logo : logoLight

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
        name: Yup.string().required('Name is required')
            .test('space', 'Name is required', val => { return val?.trim().toString().length > 0 })
            .test('min', 'Name must have 5 characters atleast', val => { return val?.trim().toString().length > 4 })
            .test('max', 'Name should have atmost 50 characters', val => { return val?.trim().toString().length < 51 }),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phone: Yup.string().required('Phone is required').min(10, "Phone number should contain minimum 10 digits").max(15, "Phone number should contain atmost 15 digits"),
        password: Yup.string()
            .required('Password is required')
            .test('space', 'Password is required', val => { return val?.trim().toString().length > 0 })
            .test('min', 'Password must have 6 characters atleast', val => { return val?.trim().toString().length > 5 })
            .test('max', 'Password must have atmost 100 characters', val => { return val?.trim().toString().length < 101 })
            .test('spaceatstart', 'Your password can’t start or end with a blank space', val => { return val?.trim().toString().length === val?.toString().length }),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Ts & Cs is required')
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = values => dispatch(handleRegister({ ...values, referralCode, roleId: 1 }))

    const loading = useSelector(state => state.auth.loading)
    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <img src={potentiamLogo} height={100} width={100} alt="logo" />
                        </Link>
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
                                    className='input-group-merge' id='register-password'
                                    className={classNames({ 'is-invalid': errors['password'] })}
                                    {...register('password', { validate: value => !!value.trime() })}

                                />
                                <small className='text-danger'>
                                    {errors.password && errors.password.message}
                                </small>
                            </FormGroup>
                            <FormGroup>
                                <Label className='form-label' for='register-confirm-password'>
                                    Confirm Password
                                </Label>
                                <InputPasswordToggle className='input-group-merge' id='register-confirm-password'
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
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Register
