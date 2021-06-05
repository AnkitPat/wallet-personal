import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, ButtonGroup } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { handleRegister } from '../../redux/actions/auth'
import { ProgressLoader } from '../../layouts/ProgressLoader'

const Register = () => {
  const [roleSelected, setRoleSelected] = useState(1)

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
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = values => dispatch(handleRegister({ ...values }))

  const loading = useSelector(state => state.auth.loading)
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <svg viewBox='0 0 139 95' version='1.1' height='28'>
                <defs>
                  <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                    <stop stopColor='#000000' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                  <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                    <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                </defs>
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                    <g id='Group' transform='translate(400.000000, 178.000000)'>
                      <path
                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                        id='Path'
                        className='text-primary'
                        style={{ fill: 'currentColor' }}
                      ></path>
                      <path
                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                        id='Path'
                        fill='url(#linearGradient-1)'
                        opacity='0.2'
                      ></path>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.049999997'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                      ></polygon>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.099999994'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                      ></polygon>
                      <polygon
                        id='Path-3'
                        fill='url(#linearGradient-2)'
                        opacity='0.099999994'
                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <h2 className='brand-text text-primary ml-1'>Potentiam</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Create your account
            </CardTitle>

            <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="d-flex flex-row">

                <ButtonGroup>
                  <Button color="primary" onClick={() => setRoleSelected(1)} active={roleSelected === 1}>Artist</Button>
                  <Button color="primary" onClick={() => setRoleSelected(2)} active={roleSelected === 2}>Regular</Button>
                </ButtonGroup>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
                <Input type='text' id='register-username' placeholder='johndoe' autoFocus
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
