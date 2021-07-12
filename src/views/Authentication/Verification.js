import {Link} from 'react-router-dom'
import {Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import classNames from 'classnames'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {handleVerification} from '../../redux/actions/auth'
import {ProgressLoader} from '../../layouts/ProgressLoader'
import logo from '@src/assets/images/icons/logo-light.png'
import logoLight from '@src/assets/images/icons/logo.png'
import {useSkin} from '../../utility/hooks/useSkin'

const Verification = () => {
    const [skin, setSkin] = useSkin()
    const dispatch = useDispatch()
    const potentiamLogo = skin !== 'dark' ? logo : logoLight

    const validationSchema = Yup.object().shape({
        code: Yup.string().required('Code is required')
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
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
                        <Link className='brand-logo' to='/'>
                            <img src={potentiamLogo} height={100} width={100} alt="logo"/>
                        </Link>
                        <h5>A verification code has been sent to your email account. Please also check your spam
                            box.</h5>
                        <p className="font-small-3 card-text">Enter the verification code here to verify your
                            account and continue the registration process.</p>
                        <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label className='form-label' for='register-username'>
                                    Verification Code
                                </Label>
                                <Input type='text' id='register-verification-code' placeholder='Enter Verification Code'
                                       autoFocus
                                       className={classNames({'is-invalid': errors['code']})}
                                       {...register('code')}
                                />
                                <small className='text-danger'>
                                    {errors.code && errors.code.message}
                                </small>
                            </FormGroup>
                            <Button.Ripple color='primary' block type="submit">
                                {loading ? <ProgressLoader/> : 'Sign up'}
                            </Button.Ripple>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Verification
