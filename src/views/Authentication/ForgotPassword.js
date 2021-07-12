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
import { handleForgotPassword, handleRegister, handleVerification } from '../../redux/actions/auth'
import logo from '@src/assets/images/icons/logo-light.png'
import logoLight from '@src/assets/images/icons/logo.png'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import {useSkin} from "../../utility/hooks/useSkin"

const Verification = () => {
  const [skin, setSkin] = useSkin()
  const dispatch = useDispatch()
  const potentiamLogo = skin !== 'dark' ? logo : logoLight

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = data => {
     dispatch(handleForgotPassword(data))
  }
  const loading = useSelector(state => state.auth.loading)

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={potentiamLogo} height={100} width={100} alt="logo"/>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Reset Password
            </CardTitle>

            <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>

              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Enter email
                </Label>
                <Input type='email' id='register-forgotemail' placeholder='Enter email' autoFocus
                  className={classNames({ 'is-invalid': errors['email'] })}
                  {...register('email')}

                />
                <small className='text-danger'>
                  {errors.email && errors.email.message}
                </small>
              </FormGroup>


              <Button.Ripple color='primary' block type="submit">
                {loading ? <ProgressLoader/> : 'Reset Password'}
              </Button.Ripple>
            </Form>
            <div className="mt-3">
              <Link to="/login">Back to login</Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Verification
