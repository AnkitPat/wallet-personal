import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Avatar from '@components/avatar'
import htmlToDraft from 'html-to-draftjs'
import { selectThemeColors } from '@utils'
import { Editor } from 'react-draft-wysiwyg'
import Breadcrumbs from '@components/breadcrumbs'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    Media,
    Form,
    Label,
    Input,
    FormGroup,
    CustomInput,
    Button
} from 'reactstrap'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import "react-datepicker/dist/react-datepicker.css"
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import WYSIWYGEditor from './components/Htmleditor/Editor'
import { useDispatch, useSelector } from 'react-redux'
import { addBounty, editBounty, fetchBountyDetails } from '../../../redux/actions/bounty'
import moment from 'moment'
import { ProgressLoader } from '../../../layouts/ProgressLoader'
import { useLocation } from 'react-router'

const BlogEdit = () => {

    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
        deadline: Yup.string().required('Deadline is required'),
        amount: Yup.number('Invalid Amount').required("Price is required")
            .nullable()
            .transform(value => (isNaN(value) ? undefined : value))
    })


    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues,
        setValue,
        clearErrors,
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            description: '',
            deadline: ''
        }

    })
    const location = useLocation()

    const onSubmit = values => {
        if (location && location.data) {
            dispatch(editBounty(values))
        } else {
            dispatch(addBounty({ ...values }))
        }
    }

    const loading = useSelector(state => state.bounty.buttonLoading)
    const contentDataState =
        ContentState.createFromBlockArray(convertFromHTML(''))
    const [editorDataState, setEditorDataState] = useState(EditorState.createWithContent(contentDataState))
    useEffect(() => {
        if (location && location.data) {
            reset({ ...location.data, deadline: new Date(location.data.deadline) })

            const contentDataState =
                ContentState.createFromBlockArray(convertFromHTML(getValues().description))
            const editorDataState1 = EditorState.createWithContent(contentDataState)
            setEditorDataState(editorDataState1)
        }
    }, [location])

    return (
        <div className='blog-edit-wrapper'>
            <Breadcrumbs
                breadCrumbTitle={(location && location.data) ? 'Blog edit' : 'Blog Add'}
                breadCrumbParent='Pages'
                breadCrumbParent2='Blog'
                breadCrumbActive={(location && location.data) ? 'Edit' : 'Add'}
            />
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardBody>

                            <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md='6'>
                                        <FormGroup className="d-flex flex-column" >
                                            <label htmlFor="title">Bounty Title</label>
                                            <input
                                                name="title"
                                                placeholder="Enter Title"
                                                {...register('title')}
                                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            />
                                            <small className='text-danger'>
                                                {errors.title && errors.title.message}
                                            </small>
                                        </FormGroup>
                                    </Col>
                                    <Col md='6'>
                                        <FormGroup className="d-flex flex-column" >
                                            <label htmlFor="price">Amount</label>
                                            <input
                                                name="amount"
                                                type="number"
                                                placeholder="Enter price"
                                                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                                {...register('amount')}
                                            />
                                            <small className='text-danger'>
                                                {errors.amount && errors.amount.message}
                                            </small>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <FormGroup className="d-flex flex-column" >
                                            <label htmlFor="title">Bounty deadline</label>
                                            <Controller
                                                dateFormat={'dd/MM/yyyy'}
                                                name="deadline"
                                                control={control}
                                                render={({ onChange, value }) => (
                                                    <DatePicker
                                                        popperPlacement="top-start"
                                                        popperModifiers={{
                                                            flip: {
                                                                behavior: ["top-start"] // don't allow it to flip to be above
                                                            },
                                                            preventOverflow: {
                                                                enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                                                            }
                                                        }}
                                                        className={`form-control ${errors.deadline ? 'is-invalid' : ''}`}
                                                        selected={getValues().deadline}
                                                        style={{ flex: 1 }}
                                                        onChange={(value) => {
                                                            setValue('deadline', value)
                                                            if (value !== undefined) {
                                                                clearErrors('deadline')
                                                            }
                                                        }}
                                                    />
                                                )}
                                            />
                                            <small className='text-danger'>
                                                {errors.deadline && errors.deadline.message}
                                            </small>
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Label>Description</Label>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ onChange, value }) => (
                                            <WYSIWYGEditor
                                                editorDataState={editorDataState}
                                                onChange={(value) => {
                                                    setValue('description', value)
                                                    if (value !== undefined) {
                                                        clearErrors('description')
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                    <small className='text-danger'>
                                        {errors.description && errors.description.message}
                                    </small>
                                </Row>
                                <Row>

                                    <Col className='mt-50'>
                                        <Button.Ripple type="submit" color='primary' className='mr-1'>
                                            {loading ? <ProgressLoader /> : 'Save Changes'}
                                        </Button.Ripple>
                                        <Button.Ripple color='secondary' outline>
                                            Cancel
                      </Button.Ripple>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BlogEdit
