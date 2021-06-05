import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as Yup from 'yup'
import { submitBounty } from '../../../../../redux/actions/bounty'

export const AddBountyLink = ({ completeBounty, selectedBounty, showConfirmationPopup, setShowConfirmationPopup }) => {

    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        link: Yup.string().url('Invalid Link').required('Link is required')
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            link: ''
        }
    })

    const userId = useSelector(state => state.auth.userDetails.id)
    const onSubmit = values => {
        setShowConfirmationPopup(false)
        dispatch(submitBounty({
            bountyTaskId: selectedBounty.id,
            userId,
            result: values.link
        }))
        // completeBounty({ ...selectedBounty, link: values.link })
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
                    Enter Link
                </ModalHeader>
                <ModalBody>


                    <FormGroup className="d-flex flex-column" >
                        <label htmlFor="link">Bounty Link</label>
                        <input
                            name="link"
                            placeholder="Enter Link"
                            {...register('link')}
                            className={`form-control ${errors.link ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">
                            {errors.link && errors.link.message}
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