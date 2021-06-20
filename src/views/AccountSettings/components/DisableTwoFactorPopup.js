import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as Yup from 'yup'
import { verifyAndDisableTwoFactor } from '../../../redux/actions/auth'

export const DisableTwoFactorPopup = ({ showConfirmationPopup, setShowConfirmationPopup }) => {

    const dispatch = useDispatch()
    const secret = useSelector(state => state.auth.userDetails.twoFactorAuthenticationMetaData)

    const validationSchema = Yup.object().shape({
        token: Yup.string().required('Token is required')
            .test('len', 'Must be exactly 6 digits', val => { console.log(val); return val?.toString().length === 6 })
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            token: ''
        }
    })

    const onSubmit = values => {
        dispatch(verifyAndDisableTwoFactor(secret, values.token))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Modal
                isOpen={showConfirmationPopup}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <ModalHeader>
                    Disable Two Factor authentication
                </ModalHeader>
                <ModalBody>
                    <FormGroup className="d-flex flex-column" >
                        <label htmlFor="token">Please enter secret code</label>
                        <input
                            name="token"
                            type="number" pattern="[0-9]*"
                            autoFocus
                            placeholder="Enter secret code"
                            className={`form-control ${errors.token ? 'is-invalid' : ''}`}
                            {...register('token')}
                        />
                        <div className="invalid-feedback">
                            {errors.token && errors.token.message}
                        </div>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>{' '}
                    <Button color="secondary" onClick={() => { setShowConfirmationPopup(false) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </form>
    )
}
