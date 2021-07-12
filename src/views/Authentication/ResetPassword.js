import {Link, useParams} from 'react-router-dom'
import {Card, CardBody, Form, Button} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import classNames from 'classnames'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {handleResetPassword} from '../../redux/actions/auth'
import {ProgressLoader} from '../../layouts/ProgressLoader'
import logo from '@src/assets/images/icons/logo-light.png'
import logoLight from '@src/assets/images/icons/logo.png'
import {useSkin} from '../../utility/hooks/useSkin'
import InputPasswordToggle from "../../@core/components/input-password-toggle"

const ResetPassword = () => {
    const [skin, setSkin] = useSkin()
    const dispatch = useDispatch()
    const potentiamLogo = skin !== 'dark' ? logo : logoLight
    const {token} = useParams()

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = values => dispatch(handleResetPassword({token, ...values}))

    const loading = useSelector(state => state.auth.loading)

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link className='brand-logo' to='/'>
                            <img src={potentiamLogo} height={100} width={100} alt="logo"/>
                        </Link>
                        <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="password">New password</label>
                                <InputPasswordToggle
                                    id='register-password'
                                    className={classNames({'is-invalid': errors['password']})}
                                    {...register('password')}
                                />
                                <small className='text-danger'>
                                    {errors.password && errors.password.message}
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <InputPasswordToggle
                                    id='confirmPassword'
                                    className={classNames({'is-invalid': errors['confirmPassword']})}
                                    {...register('confirmPassword')}
                                />
                                <small className='text-danger'>
                                    {errors.confirmPassword && errors.confirmPassword.message}
                                </small>
                            </div>
                            <Button.Ripple color='primary' block type="submit">
                                {loading ? <ProgressLoader/> : 'Submit'}
                            </Button.Ripple>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default ResetPassword
