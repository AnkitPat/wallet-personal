import classNames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button, Input } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import * as Yup from 'yup'
import { history } from '../../utility/Utils'
import { useDispatch } from 'react-redux'
import { handleChangePassword } from '../../redux/actions/myAccount'

const PasswordTabContent = () => {

  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required')
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
    dispatch(handleChangePassword({
      password: data.currentPassword,
      newPassword: data.confirmPassword
    }))
    reset({})
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <Controller
              control={control}
              id='currentPassword'
              name='currentPassword'
              className={classNames({
                'is-invalid': errors.currentPassword
              })}
              render={({ onChange, value }) => {
                return (
                  <Input
                    defaultValue={getValues().currentPassword}
                    onChange={e => setValue('currentPassword', e.target.value)}
                    type='password' id='register-username' placeholder='Old Password'
                    className={classNames({ 'is-invalid': errors['currentPassword'] })}
                    name="currentPassword"
                  />
                )
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <Controller
              control={control}
              id='newPassword'
              name='newPassword'
              className={classNames({
                'is-invalid': errors.newPassword
              })}
              render={({ onChange, value }) => {
                return (
                  <Input
                    defaultValue={getValues().newPassword}
                    onChange={e => setValue('newPassword', e.target.value)}
                    type='password' id='register-username' placeholder='New Password'
                    className={classNames({ 'is-invalid': errors['newPassword'] })}
                    name="newPassword"
                  />
                )
              }}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Controller
              control={control}
              id='confirmPassword'
              name='confirmPassword'
              className={classNames({
                'is-invalid': errors.confirmPassword
              })}
              render={({ onChange, value }) => {
                return (
                  <Input
                    defaultValue={getValues().confirmPassword}
                    onChange={e => setValue('confirmPassword', e.target.value)}
                    type='password' id='register-username' placeholder='Confirm Password'
                    className={classNames({ 'is-invalid': errors['confirmPassword'] })}
                    name="confirmPassword"
                  />
                )
              }}
            />
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple type='submit' className='mr-1' color='primary'>
            Save changes
          </Button.Ripple>
          <Button.Ripple color='secondary' outline onClick={() => history.goBack()}>
            Cancel
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  )
}

export default PasswordTabContent
