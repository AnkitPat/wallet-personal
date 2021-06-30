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
import logo from '@src/assets/images/icons/logo-light.png'

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
                            <Link className='brand-logo' to='/wallet' onClick={e => e.preventDefault()}>
                                <img src={logo} width={100} alt="logo"/>
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
