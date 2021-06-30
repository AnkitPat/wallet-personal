import { useSkin } from '@hooks/useSkin'
import { handleLogin } from '@store/actions/auth'
import '@styles/base/pages/page-auth.scss'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import {
  Button, CardText, CardTitle, Col,
  CustomInput, Form,
  FormGroup,
  Input,
  Label, Row, Spinner
} from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Logo from '@src/assets/images/icons/logo.png'
import LogoLight from '@src/assets/images/icons/logo-light.png'
import { ProgressLoader } from '../layouts/ProgressLoader'

const Login = props => {
  const [skin, setSkin] = useSkin()
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),

    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')

  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/logo/logo_gif.gif`).default


  const onSubmit = data => {
    dispatch(handleLogin(data))
  }

  const loading = useSelector(state => state.auth.loading)

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <span className='brand-logo'>
            <img src={Logo} width="100" height="100" />
          </span>
        </Link>
        <Col className='d-flex px-0 py-0' >
            <img className="d-flex" style={{width: '100%'}} src={source} alt='Login V2' />
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to Potentiam wallet! 👋
              </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                  </Label>

                <Input type='email'
                  id='login-email'
                  placeholder='john@example.com'
                  autoFocus
                  className={classNames({ 'is-invalid': errors['username'] })}
                  {...register('username')}

                />
                <small className='text-danger'>
                  {errors.username && errors.username.message}
                </small>
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                    </Label>
                </div>
                <InputPasswordToggle
                  className='input-group-merge' id='register-password'
                  className={classNames({ 'is-invalid': errors['password'] })}
                  {...register('password')}

                />
                <small className='text-danger'>
                  {errors.password && errors.password.message}
                </small>
                <div className='d-flex justify-content-between'>

                  <Link to='/forgotpassword'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
              </FormGroup>
              {loading ? <ProgressLoader /> : <Button.Ripple type='submit' color='primary' block>
                Sign in
                </Button.Ripple>}

            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
