import { Fragment, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Button, Media, Label, Row, Col, Input, FormGroup, Form } from 'reactstrap'
import classNames from 'classnames'
import defaultImage from '../../assets/images/avatars/12.png'
import { history } from '../../utility/Utils'
import { fetchCountries, handleUserInformationUpdate } from '../../redux/actions/myAccount'
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
    phone: Yup.string().required('Phone is required'),
    age: Yup.number().min(10, 'Minimum age should be 10').max(100, 'Maximum age should be 100').required('Age is required').nullable().transform(value => (isNaN(value) ? undefined : value))


  })

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    register,
    control,
    clearErrors,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    reset(data)
  }, [data])


  const onSubmit = data => {
    data = { ...data, profilePhoto: avatar }
    if (data.countryId === ' ') delete data.countryId
    dispatch(handleUserInformationUpdate({
      data, isProfilePhotoUpdated: avatar !== data.avatar
    }))
  }

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  const loading = useSelector(state => state.auth.loading)
  const countries = useSelector(state => state.myaccount.countries)
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
              <input
                name="name"
                placeholder="Enter name"
                {...register('name')}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
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
              
              <input
                name="email"
                placeholder="Enter email"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
              
              <input
                name="phone"
                placeholder="Enter phone"
                type="number"
                {...register('phone')}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              />
              <small className='text-danger'>
                {errors.phone && errors.phone.message}
              </small>
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup className='mb-2'>
              <Label for='blog-edit-status'>Countries</Label>
              <Input
                {...register('countryId')}

                type='select'
                name="countryId"
                id='blog-edit-status'
                value={getValues().countryId}
                onChange={e => {
                  setValue('countryId', e.target.value)
                  if (e.target.value !== '') {
                    clearErrors('countryId')
                  }
                }}

              >
                <option value={' '}>{'Select Country'}</option>

                {countries && countries.map(country =>
                  <option key={country.name} value={country.id}>{country.name}</option>
                )}

              </Input>
              <small className='text-danger'>
                {errors.countryId && errors.countryId.message}
              </small>
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup className='mb-2'>
              <Label for='blog-edit-status'>Age</Label>
              <input
                name="age"
                type="number"
                placeholder="Enter age"
                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                {...register('age')}
              />

              <small className='text-danger'>
                {errors.age && errors.age.message}
              </small>
            </FormGroup>
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
