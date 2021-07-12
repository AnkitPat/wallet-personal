import Breadcrumbs from '@components/breadcrumbs'
import {yupResolver} from '@hookform/resolvers/yup'
import '@styles/base/pages/page-blog.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/editor/editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import {useEffect, useState} from 'react'
import "react-datepicker/dist/react-datepicker.css"
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from "react-router-dom"
import {
    Button, Card,
    CardBody, Col, Form, FormGroup, Input, Label, Media, Row
} from 'reactstrap'
import * as Yup from 'yup'
import {ProgressLoader} from '../../layouts/ProgressLoader'
import {addProject, editProject, getProject} from "../../redux/actions/projects"

const ProjectForm = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.projects.buttonLoading)
    const project = useSelector(state => state.projects.project)
    const [avatar, setAvatar] = useState('')
    const params = useParams()

    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setAvatar(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        getValues,
        setValue,
        clearErrors,
        reset
    } = useForm({
        resolver: yupResolver(Yup.object().shape({
            title: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required').max(200, 'Max characters are 150'),
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
        }).test('yourTestCondition', "You must have added at least one social link", function (value) {
            const haveAtleastOneValue = !!(value.facebook || value.twitter || value.instagram || value.linkedIn || value.youtube)
            if (haveAtleastOneValue) {
                clearErrors()
            }
            return haveAtleastOneValue
        })),
        defaultValues: {}
    })

    useEffect(() => {
        if (params && params.id) {
            dispatch(getProject(params.id))
        }
    }, [params])

    useEffect(() => {
        if (project) {
            reset(project)
            setAvatar(project.logo)
        }
    }, [project])

    const onSubmit = values => {
        if (params && params.id) {
            dispatch(editProject(values))
        } else {
            dispatch(addProject({...values, avatar}))
        }
    }

    return (
        <div className='blog-edit-wrapper'>
            <Breadcrumbs
                breadCrumbTitle={(params && params.id) ? 'Project edit' : 'Project Add'}
                breadCrumbParent2='Project'
                breadCrumbActive={(params && params.id) ? 'Edit' : 'Add'}
            />
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardBody>
                            <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md='6'>
                                        <FormGroup className="d-flex flex-column">
                                            <label htmlFor="title">Project Name</label>
                                            <input
                                                name="title"
                                                placeholder="Enter name"
                                                {...register('title')}
                                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            />
                                            <small className='text-danger'>
                                                {errors.title && errors.title.message}
                                            </small>
                                        </FormGroup>
                                    </Col>
                                    <Col md='6'>
                                        <Media>
                                            <Media className='mr-25' left>
                                                <Media object className='rounded mr-50' src={avatar}
                                                       alt='Placeholder image' height='80' width='80'
                                                       onError={e => {
                                                           e.target.onerror = null
                                                       }}/>
                                            </Media>
                                            <Media className='mt-75 ml-1' body>
                                                <Button.Ripple tag={Label} className='mr-75' size='sm'
                                                               color='primary'>
                                                    Upload
                                                    <Input type='file' onChange={onChange} hidden accept='image/*'/>
                                                </Button.Ripple>
                                                <Button.Ripple color='secondary' size='sm' outline
                                                               onClick={() => setAvatar(data.avatar ? data.avatar : '')}>
                                                    Reset
                                                </Button.Ripple>
                                                <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                                            </Media>
                                        </Media>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="d-flex flex-column">
                                            <label htmlFor="title">Project Description</label>
                                            <textarea
                                                name="name"
                                                placeholder="Enter project description"
                                                {...register('description')}
                                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            />
                                            <small className='text-danger'>
                                                {errors.description && errors.description.message}
                                            </small>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm='12'>
                                        <div className='d-flex align-items-center mb-2'>
                                            <h4 className='mb-0 mt-3'>Social Links</h4>
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
                                    <small className='text-danger ml-2'>
                                        {errors[''] && errors[''].message}
                                    </small>
                                </Row>
                                <Row>
                                    <Col className='mt-50'>
                                        {loading ? <Button.Ripple type="submit" color='primary' disabled
                                                                  className='mr-1'><ProgressLoader/></Button.Ripple> : <Button.Ripple type="submit" color='primary'
                                                           className='mr-1'>Save Changes</Button.Ripple>}
                                        <Link to={`/projects`}>
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
        </div>
    )
}

export default ProjectForm
