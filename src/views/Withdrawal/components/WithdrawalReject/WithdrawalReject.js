import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as Yup from 'yup'
import { submitBounty } from '../../../../redux/actions/bounty'
import { rejectWithdrawal } from '../../../../redux/actions/withdrawal'

export const WithdrawalReject = ({ selectedWithdrawal, showConfirmationPopup, setShowConfirmationPopup }) => {

    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        rejectReason: Yup.string().required('Reason is required')
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            rejectReason: ''
        }
    })

    const userId = useSelector(state => state.auth.userDetails.id)
    const onSubmit = values => {
        setShowConfirmationPopup(false)
        dispatch(rejectWithdrawal({
            ...values,
            id: selectedWithdrawal.id
        }))
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
                    Reject Withdrawal
                </ModalHeader>
                <ModalBody>


                    <FormGroup className="d-flex flex-column" >
                        <label htmlFor="link">Add reason to reject</label>
                        <textarea
                            name="link"
                            
                            placeholder="Enter reason"
                            {...register('rejectReason')}
                            className={`form-control ${errors.rejectReason ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">
                            {errors.rejectReason && errors.rejectReason.message}
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
