import { useState, useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import {
    Row,
    Col,
    Card,
    CardBody,
    Form,
    Label,
    FormGroup,
    Button,
    Input,
    CustomInput, UncontrolledTooltip
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
import {
    addBounty,
    editBounty,
    fetchBountyDetails,
    fetchMyProjects,
    fetchProjectsAndSocialMediums
} from '../../../redux/actions/bounty'
import { ProgressLoader } from '../../../layouts/ProgressLoader'
import { Link, useLocation, useParams } from "react-router-dom"
import {HelpCircle} from "react-feather"

const BlogEdit = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.bounty.buttonLoading)
    const projects = useSelector(state => state.bounty.myProjects)
    const socialMediums = useSelector(state => state.bounty.socialMediums)
    const bounty = useSelector(state => state.bounty.bounty)
    const pageLoading = useSelector(state => state.bounty.loading)
    const userCredits = useSelector(state => state.auth.userDetails.credit)
    const minimumBudget = useSelector(state => state.auth.userDetails.minimumBudget)
    const [multipleSubmission, setMultipleSubmission] = useState(false)

    const contentDataState =
        ContentState.createFromBlockArray(convertFromHTML(''))
    const [editorDataState, setEditorDataState] = useState(EditorState.createWithContent(contentDataState))
    const params = useParams()

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
        shortDescription: Yup.string()
            .required('Short description is required'),
        deadline: Yup.string().required('Deadline is required'),
        amount: Yup.number('Invalid Amount').required("Price is required")
            .nullable()
            .transform(value => (isNaN(value) ? undefined : value))
            .min(minimumBudget, `Minimum budget is ${minimumBudget} credits`)
            .max(userCredits, 'Insufficient Balance'),
        projectId: Yup.string()
            .required('Project is required'),
        socialMediumId: Yup.string()
            .required('Social Mediums is required').transform(value => (value === '' ? undefined : value)),
        tiers: Yup.array().of(
            Yup.object().shape({
                followerCount: Yup.number().typeError('You must specify a number')
                    .min(0, 'Min value 0.')
                    .required("Followers Count is required"),
                reward: Yup.number().typeError('You must specify a number')
                    .min(0, 'Min value 0.')
                    .required("Reward is required")
            })
        )
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
            shortDescription: '',
            deadline: '',
            projectId: '',
            socialMediumId: '',
            multipleSubmission: false
        }

    })
    const location = useLocation()

    const [counter, setCounter] = useState(1)
    const [indexes, setIndexes] = useState([0])
    const onSubmit = values => {
        if (params && params.id) {
            dispatch(editBounty(values))
        } else {
            dispatch(addBounty(values))
        }
    }

    useEffect(() => {
        if (params && params.id && bounty) {
            setCounter(0)
            setIndexes([])
            const clonedBounty = Object.assign({}, bounty)
            if (clonedBounty.multipleSubmission) setMultipleSubmission(true)
            clonedBounty.tiers = clonedBounty.bountyTiers.map((item, index) => {
                setCounter(index + 1)
                setIndexes(prevIndexes => [...prevIndexes, index])
                return {
                    id: item.id,
                    followerCount: item.followerCount,
                    reward: item.reward
                }
            })
            delete clonedBounty.bountyTiers
            reset({ ...clonedBounty, deadline: new Date(clonedBounty.deadline) })

            const contentDataState =
                ContentState.createFromBlockArray(convertFromHTML(getValues().description))
            const editorDataState1 = EditorState.createWithContent(contentDataState)
            setEditorDataState(editorDataState1)
        }
    }, [params, projects.socialMediums, bounty])

    useEffect(() => {
        if (params && params.id) {
            dispatch(fetchBountyDetails(params.id))
        }
    }, [params])

    useEffect(() => {
        dispatch(fetchProjectsAndSocialMediums())
    }, [])

    useEffect(() => {
        dispatch(fetchMyProjects())
    }, [])


    const addTier = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter])
        setCounter(prevCounter => prevCounter + 1)
    }

    const removeTier = index => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)])
        setCounter(prevCounter => prevCounter - 1)
    }

    return (
        <div className='blog-edit-wrapper'>
            {pageLoading ? <ProgressLoader size='lg' /> : <>
                <Breadcrumbs
                    breadCrumbTitle={(params && params.id) ? 'Bounty edit' : 'Bounty Add'}
                    breadCrumbParent='Pages'
                    breadCrumbParent2='Bounty'
                    breadCrumbActive={(params && params.id) ? 'Edit' : 'Add'}
                />
                <Row>
                    <Col sm='12'>
                        <Card>
                            <CardBody>
                                <h5>
                                    You need to have sufficient credits to create budget for your campaign. If not you can always <Link to={'/wallet'}>buy more.</Link>
                                </h5>
                                <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col md='6'>
                                            <FormGroup className="d-flex flex-column">
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
                                            <FormGroup className="d-flex flex-column">
                                                <label htmlFor="price">
                                                    Budget <HelpCircle size={18} id="UnControlledExample" className='text-muted cursor-pointer' />
                                                </label>
                                                <UncontrolledTooltip placement='top' target='UnControlledExample'>
                                                    If you are not sure about the budget, contact us
                                                </UncontrolledTooltip>
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
                                            <FormGroup className="d-flex flex-column">
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
                                        <Col>
                                            <FormGroup className='mb-2'>
                                                <Label for='blog-edit-status'>Projects</Label>
                                                <Input
                                                    {...register('projectId')}

                                                    type='select'
                                                    name="projectId"
                                                    id='blog-edit-status'
                                                    value={getValues().projectId}
                                                    onChange={e => {
                                                        setValue('projectId', e.target.value)
                                                        if (e.target.value !== '') {
                                                            clearErrors('projectId')
                                                        }
                                                    }}

                                                >
                                                    <option value={''}>{'Select Project'}</option>

                                                    {projects.map(project =>
                                                        <option key={`${project.id}-${project.title}`} value={project.id}>{project.title}</option>
                                                    )}

                                                </Input>
                                                <small className='text-danger'>
                                                    {errors.projectId && errors.projectId.message}
                                                </small>
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup className='mb-2'>
                                                <Label for='blog-edit-status'>Social Mediums</Label>
                                                <Input
                                                    {...register('socialMediumId')}

                                                    type='select'
                                                    name="socialMediumId"
                                                    id='blog-edit-status'
                                                    value={getValues().socialMediumId}
                                                    onChange={e => {
                                                        setValue('socialMediumId', e.target.value)
                                                        if (e.target.value !== '') {
                                                            clearErrors('socialMediumId')
                                                        }
                                                    }}

                                                >
                                                    <option value={''}>{'Select Social medium'}</option>
                                                    {socialMediums.map(social =>
                                                        <option key={`${social.id}-social`} value={social.id}>{social.title}</option>
                                                    )}

                                                </Input>
                                                <small className='text-danger'>
                                                    {errors.socialMediumId && errors.socialMediumId.message}
                                                </small>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <CustomInput type="switch" id="exampleCustomSwitch" defaultChecked={getValues().multipleSubmission} className="my-2" name="multipleSubmission"
                                                label="Allow Multiple Submission" onChange={(e) => {
                                                    setValue('multipleSubmission', !multipleSubmission)
                                                    setMultipleSubmission(!multipleSubmission)
                                                }} />
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup className='mb-2'>
                                                <label>Bounty Short Description</label>
                                                <textarea
                                                    id="shortDescription"
                                                    name="shortDescription"
                                                    placeholder="Enter Short Description"
                                                    {...register('shortDescription')}
                                                    className={`form-control ${errors.shortDescription ? 'is-invalid' : ''}`}
                                                />
                                                <small className='text-danger'>
                                                    {errors.shortDescription && errors.shortDescription.message}
                                                </small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Label>Tiers</Label>
                                    {indexes.map(index => {
                                        const fieldName = `tiers[${index}]`
                                        return (
                                            <Row key={`${index.toString()}-tiers`} className="my-1">

                                                <Col md='5'>
                                                    <input
                                                        name={`${fieldName}.followerCount`}
                                                        type="number"
                                                        placeholder="Enter Followers Count"
                                                        className={`form-control ${errors.tiers && errors.tiers[index] && errors.tiers[index].followerCount ? 'is-invalid' : ''}`}
                                                        {...register(`${fieldName}.followerCount`)}
                                                    />

                                                    <small className='text-danger'>
                                                        {errors.tiers && errors.tiers[index] && errors.tiers[index].followerCount && errors.tiers[index].followerCount.message}
                                                    </small>
                                                </Col>
                                                <Col md='5'>

                                                    <input
                                                        name={`${fieldName}.reward`}
                                                        type="number"
                                                        placeholder="Enter reward"
                                                        className={`form-control ${errors.tiers && errors.tiers[index] && errors.tiers[index].reward ? 'is-invalid' : ''}`}
                                                        {...register(`${fieldName}.reward`)}
                                                    />

                                                    <small className='text-danger'>
                                                        {errors.tiers && errors.tiers[index] && errors.tiers[index].reward && errors.tiers[index].reward.message}
                                                    </small>
                                                </Col>
                                                <Col>
                                                    {indexes.length > 1 && <button className="btn btn-danger" type="button" onClick={() => removeTier(index)}>
                                                        Remove
                                                    </button>}
                                                </Col>
                                            </Row>
                                        )
                                    })}

                                    <Button.Ripple color='primary' outline onClick={() => addTier()}>
                                        Add Tier
                                    </Button.Ripple>
                                    <Row>
                                        <Col>
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
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='mt-50'>
                                            <Button.Ripple type="submit" color='primary' className='mr-1'>
                                                {loading ? <ProgressLoader /> : 'Save Changes'}
                                            </Button.Ripple>
                                            <Link to={`/bounties`}>
                                                <Button.Ripple color='secondary' outline>
                                                    Cancel
                                                </Button.Ripple>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </>}
        </div>
    )
}

export default BlogEdit
