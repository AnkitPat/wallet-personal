import { Fragment, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'
import classNames from 'classnames'
import defaultImage from '../../assets/images/avatars/12.png'
import { resetWarningCache } from 'prop-types'
import { history } from '../../utility/Utils'
import { handleUserInformationUpdate } from '../../redux/actions/myAccount'
import { useDispatch, useSelector } from 'react-redux'
import { ProgressLoader } from '../../layouts/ProgressLoader'

const GeneralTabs = ({ data }) => {

  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')

  const dispatch = useDispatch()

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    phone: Yup.string().required('Phone is required')

  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    reset(data)
  }, [data])


  const onSubmit = data => {
    dispatch(handleUserInformationUpdate({
      data: { ...data, profilePhoto: avatar }, isProfilePhotoUpdated: avatar !== data.avatar
    }))
  }

  const loading = useSelector(state => state.auth.loading)
  return (
    <Fragment>
      <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={avatar} alt='Placeholder image' height='80' width='80' onError={e => {
            e.target.onerror = null
            e.target.src = defaultImage
          }} />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
            Upload
            <Input type='file' onChange={onChange} hidden accept='image/*' />
          </Button.Ripple>
          <Button.Ripple color='secondary' size='sm' outline onClick={() => setAvatar(data.avatar ? data.avatar : '')}>
            Reset
          </Button.Ripple>
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media>
      <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label className='form-label' for='register-username'>
                Username
                </Label>
              <Controller
                control={control}
                id='name'
                name='name'
                className={classNames({
                  'is-invalid': errors.name
                })}
                render={({ onChange, value }) => {
                  return (
                    <Input
                      defaultValue={getValues().name}
                      onChange={e => setValue('name', e.target.value)}
                      type='text' id='register-username' placeholder='johndoe'
                      className={classNames({ 'is-invalid': errors['name'] })}
                      name="name"
                    />
                  )
                }}
              />
              <small className='text-danger'>
                {errors.name && errors.name.message}
              </small>
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label className='form-label' for='register-email'>
                Email
                </Label>
              <Controller
                control={control}
                id='email'
                name='email'
                className={classNames({
                  'is-invalid': errors.email
                })}
                render={({ onChange, value }) => {
                  return (
                    <Input
                      defaultValue={getValues().email}
                      onChange={e => setValue('email', e.target.value)}
                      type='text' id='register-username' placeholder='johndoe'
                      className={classNames({ 'is-invalid': errors['email'] })}
                      name="email"
                    />
                  )
                }}
              />
              <small className='text-danger'>
                {errors.email && errors.email.message}
              </small>
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label className='form-label' for='register-phone'>
                Phone
                </Label>
              <Controller
                control={control}
                id='phone'
                name='phone'
                className={classNames({
                  'is-invalid': errors.phone
                })}
                render={({ onChange, value }) => {
                  return (
                    <Input
                      defaultValue={getValues().phone}
                      onChange={e => setValue('phone', e.target.value)}
                      type='number' id='register-username' placeholder='123123123'
                      className={classNames({ 'is-invalid': errors['phone'] })}
                      name="phone"

                    />
                  )
                }}
              />
              <small className='text-danger'>
                {errors.phone && errors.phone.message}
              </small>
            </FormGroup>
          </Col>
          <Col sm='6'>

          </Col>

          <Col className='mt-2' sm='12'>
            <Button.Ripple type='submit' className='mr-1' color='primary'>
              {loading ? <ProgressLoader /> : ' Save changes'}
            </Button.Ripple>
            <Button.Ripple color='secondary' outline onClick={() => history.goBack()}>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default GeneralTabs
