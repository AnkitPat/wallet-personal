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
import { handleRegister, handleVerification } from '../../redux/actions/auth'
import logo from '@src/assets/images/icons/logo-light.png'
import { ProgressLoader } from '../../layouts/ProgressLoader'

const Verification = () => {

  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Code is required')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = values => dispatch(handleVerification(values))

  const loading = useSelector(state => state.auth.loading)

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={logo} width={100} alt="logo" />
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Verify your account
            </CardTitle>

            <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>

              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Verification Code
                </Label>
                <Input type='text' id='register-verification-code' placeholder='Enter Verification Code' autoFocus
                  className={classNames({ 'is-invalid': errors['code'] })}
                  {...register('code')}

                />
                <small className='text-danger'>
                  {errors.code && errors.code.message}
                </small>
              </FormGroup>


              <Button.Ripple color='primary' block type="submit">
                {loading ? <ProgressLoader /> : 'Sign up'}
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Verification
