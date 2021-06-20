import {yupResolver} from '@hookform/resolvers/yup'
import {loadStripe} from '@stripe/stripe-js'
import '@styles/base/pages/page-auth.scss'
import axios from 'axios'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Button, Card, CardBody, CardTitle, Form, FormGroup, Label} from 'reactstrap'
import * as Yup from 'yup'
import {ProgressLoader} from '../../layouts/ProgressLoader'

const stripePromise = loadStripe('pk_test_KcTV8d4CSSGpMfe4PIKvUeFI00hDyI8a1d')

const UserWallet = () => {

    const dispatch = useDispatch()
    const [dollarAmount, setDollarAmount] = useState(0)


    const changeDollarAmount = credit => {
        setDollarAmount((+credit + (+credit * 0.30)))
    }

    const validationSchema = Yup.object().shape({
        amount: Yup.number('Amount is required')
            .typeError('Please enter the credit amount')
            .positive()
            .integer('Amount should not be in decimal values')
            .min(10, 'Amount should be more than 10')
            .required('Amount is required')
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema)
    })


    const handleClick = async amount => {
        // Get Stripe.js instance
        const stripe = await stripePromise

        // Call your backend to create the Checkout Session
        const response = await axios.post(
            '/order/create-checkout-session',
            {
                price: (+amount + (+amount * 0.30)),
                number: amount
            }
        )

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: response.data.id
        })

        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            toast.error('Something went wrong, please try again')
        }
    }

    const onSubmit = values => handleClick(values.amount)

    const loading = useSelector(state => state.auth.loading)

    return (
        <>
            <div className='auth-wrapper align-items-start auth-v1 px-2'>
                <div className='auth-inner py-2'>
                    <Card className='mb-0'>
                        <CardBody>
                            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                                <svg viewBox='0 0 139 95' version='1.1' height='28'>
                                    <defs>
                                        <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%'
                                                        id='linearGradient-1'>
                                            <stop stopColor='#000000' offset='0%'></stop>
                                            <stop stopColor='#FFFFFF' offset='100%'></stop>
                                        </linearGradient>
                                        <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%'
                                                        id='linearGradient-2'>
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
                                                    style={{fill: 'currentColor'}}
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
                                Add Credits to your account
                            </CardTitle>

                            <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup>
                                    <Label className='form-label' for='register-phone'>
                                        Credit
                                    </Label>
                                    <input
                                        {...register('amount')}

                                        type="number"
                                        className={`form-control bg-transparent text-black ${errors.amount ? 'is-invalid' : ''
                                        }`}
                                        size="lg"
                                        name="amount"
                                        id="credit"

                                        onChange={e => changeDollarAmount(e.target.value)}
                                        placeholder="Enter Amount"
                                    />

                                    <small className='text-danger'>
                                        {errors.amount && errors.amount.message}
                                    </small>
                                </FormGroup>
                                <hr/>
                                <ul className='list-unstyled'>
                                    <li className='price-detail d-flex justify-content-between'>
                                        <div className='detail-title detail-total'>Total</div>
                                        <div className='detail-amt font-weight-bolder'>${dollarAmount}</div>
                                    </li>
                                </ul>
                                {loading ? <ProgressLoader/> : <Button.Ripple color='primary' block type="submit">
                                    Add Credit
                                </Button.Ripple>}
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default UserWallet
