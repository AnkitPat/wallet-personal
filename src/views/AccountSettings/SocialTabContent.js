import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Link } from 'react-feather'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap'
import * as Yup from 'yup'
import { ProgressLoader } from '../../layouts/ProgressLoader'
import { handleUserInformationUpdate } from '../../redux/actions/myAccount'
import { history } from '../../utility/Utils'

const SocialTabContent = ({ data }) => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.loading)
    const userDetails = useSelector(state => state.auth.userDetails)

    // const validationSchema = 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        clearErrors,
        setError
    } = useForm({
        resolver: yupResolver(Yup.object().shape({
            facebook: Yup.string().url('Enter valid url')
                .nullable(),
            twitter: Yup.string().url('Enter valid url')
                .nullable(),
            instagram: Yup.string().url('Enter valid url')
                .nullable(),
            linkedIn: Yup.string().url('Enter valid url')
                .nullable(),
            youtube: Yup.string().url('Enter valid url')
                .nullable()
        }).test('yourTestCondition', "You must have added atleast one social link", function (value) {
            const haveAtleastOneValue = !!(value.facebook || value.twitter || value.instagram || value.linkedIn || value.youtube)
            if (haveAtleastOneValue) {
                clearErrors()
            }
            return haveAtleastOneValue
        }))
    })

    const onSubmit = data => {
        dispatch(handleUserInformationUpdate({
            data
        }))
    }

    useEffect(() => {
        if (userDetails && Object.keys(userDetails).length > 0) {
            reset(userDetails)
        }
    }, [userDetails])
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm='12'>
                    <div className='d-flex align-items-center mb-2'>
                        <Link size={18} />
                        <h4 className='mb-0 ml-75'>Social Links</h4>
                    </div>
                </Col>
                <Col sm='6'>
                    <FormGroup>
                        <Label for='account-twitter'>Twitter</Label>
                        <input
                            name="twitter"
                            type="url"
                            placeholder="Enter twitter"
                            className={`form-control ${errors.twitter ? 'is-invalid' : ''}`}
                            {...register('twitter')}
                        />
                        <small className='text-danger'>
                            {errors.twitter && errors.twitter.message}
                        </small>
                    </FormGroup>
                </Col>
                <Col sm='6'>
                    <FormGroup>
                        <Label for='account-facebook'>Facebook</Label>
                        <input
                            name="facebook"
                            type="url"
                            placeholder="Enter facebook"
                            className={`form-control ${errors.facebook ? 'is-invalid' : ''}`}
                            {...register('facebook')}
                        />
                        <small className='text-danger'>
                            {errors.facebook && errors.facebook.message}
                        </small>
                    </FormGroup>
                </Col>
                <Col sm='6'>
                    <FormGroup>
                        <Label for='account-linkedIn'>LinkedIn</Label>
                        <input
                            name="linkedIn"
                            type="url"
                            placeholder="Enter linkedIn"
                            className={`form-control ${errors.linkedIn ? 'is-invalid' : ''}`}
                            {...register('linkedIn')}
                        />
                        <small className='text-danger'>
                            {errors.linkedIn && errors.linkedIn.message}
                        </small>
                    </FormGroup>
                </Col>
                <Col sm='6'>
                    <FormGroup>
                        <Label for='account-instagram'>Instagram</Label>
                        <input
                            name="instagram"
                            type="url"
                            placeholder="Enter instagram"
                            className={`form-control ${errors.instagram ? 'is-invalid' : ''}`}
                            {...register('instagram')}
                        />
                        <small className='text-danger'>
                            {errors.instagram && errors.instagram.message}
                        </small>
                    </FormGroup>
                </Col>
                <Col sm='6'>
                    <FormGroup>
                        <Label for='account-youtube'>Youtube</Label>
                        <input
                            name="youtube"
                            type="url"
                            placeholder="Enter youtube"
                            className={`form-control ${errors.youtube ? 'is-invalid' : ''}`}
                            {...register('youtube')}
                        />
                        <small className='text-danger'>
                            {errors.youtube && errors.youtube.message}
                        </small>
                    </FormGroup>
                </Col>
                <Col sm='6'></Col>
                <small className='text-danger ml-2'>
                    {errors[''] && errors[''].message}
                </small>
                <Col className='mt-1' sm='12'>
                    <Button.Ripple type="submit" className='mr-1' color='primary'>
                        {loading ? <ProgressLoader /> : 'Save changes'}
                    </Button.Ripple>
                    <Button.Ripple color='secondary' outline onClick={() => history.goBack()}>
                        Cancel
                    </Button.Ripple>
                </Col>
            </Row>
        </Form>
    )
}

export default SocialTabContent
