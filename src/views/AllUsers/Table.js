import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Fragment, useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import {ChevronDown, Facebook, Instagram, Linkedin, Slash, Twitter, UserCheck, Youtube} from 'react-feather'
import ReactPaginate from 'react-paginate'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Card, Col, CustomInput, Input, Label, Row, UncontrolledTooltip} from 'reactstrap'
import {ProgressLoader} from '../../layouts/ProgressLoader'
import {blockUser, fetchUsers} from '../../redux/actions/users'

// ** Table Header
const CustomHeader = ({handlePerPage, rowsPerPage, handleFilter, searchTerm}) => {
    return (
        <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <Label for='rows-per-page'>Show</Label>
                        <CustomInput
                            className='form-control mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{
                                width: '5rem',
                                padding: '0 0.8rem',
                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                            }}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </CustomInput>
                        <Label for='rows-per-page'>Entries</Label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                        <Label className='mb-0' for='search-invoice'>
                            Search:
                        </Label>
                        <Input
                            id='search-invoice'
                            className='ml-50 w-100'
                            type='text'
                            value={searchTerm}
                            onChange={e => handleFilter(e.target.value)}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const UsersList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const columns = [
        {
            name: 'User',
            minWidth: '297px',
            selector: 'name'
        },
        {
            name: 'Social',
            minWidth: '100px',
            cell: row => {
                console.log(row)
                return (
                    <Fragment>
                        {row.facebook &&
                        <a href={row.facebook} target="_blank" style={{paddingRight: 5}}>
                          <Facebook size={14}  id={`av-tooltip-facebook-${row.id}`}/>
                          <UncontrolledTooltip placement='top' target={`av-tooltip-facebook-${row.id}`}>
                            <span className='font-weight-bold'>{row.facebook}</span>
                          </UncontrolledTooltip>
                        </a>
                        }
                        {row.twitter &&
                        <a href={row.twitter} target="_blank" style={{paddingRight: 5}}>
                          <Twitter size={14} id={`av-tooltip-twitter-${row.id}`}/>
                          <UncontrolledTooltip placement='top' target={`av-tooltip-twitter-${row.id}`}>
                            <span className='font-weight-bold'>{row.twitter}</span>
                          </UncontrolledTooltip>
                        </a>
                        }
                        {row.instagram &&
                        <a href={row.instagram} target="_blank" style={{paddingRight: 5}}>
                          <Instagram size={14} id={`av-tooltip-instagram-${row.id}`}/>
                          <UncontrolledTooltip placement='top' target={`av-tooltip-instagram-${row.id}`}>
                            <span className='font-weight-bold'>{row.instagram}</span>
                          </UncontrolledTooltip>
                        </a>
                        }
                        {row.linkedIn &&
                        <a href={row.linkedIn} target="_blank" style={{paddingRight: 5}}>
                          <Linkedin size={14} id={`av-tooltip-linkedin-${row.id}`}/>
                          <UncontrolledTooltip placement='top' target={`av-tooltip-linkedin-${row.id}`}>
                            <span className='font-weight-bold'>{row.linkedIn}</span>
                          </UncontrolledTooltip>
                        </a>
                        }
                        {row.youtube &&
                        <a href={row.youtube} target="_blank" style={{paddingRight: 5}}>
                          <Youtube size={14} id={`av-tooltip-youtube-${row.id}`}/>
                          <UncontrolledTooltip placement='top' target={`av-tooltip-youtube-${row.id}`}>
                            <span className='font-weight-bold'>{row.youtube}</span>
                          </UncontrolledTooltip>
                        </a>
                        }
                    </Fragment>
                )
            }
        },
        {
            name: 'Email',
            minWidth: '320px',
            selector: 'email',
            cell: row => row.email
        },
        {
            name: 'Role',
            minWidth: '100px',
            selector: 'role.title'
        },
        {
            name: 'Status',
            minWidth: '100px',
            selector: '',
            cell: row => (row.block ? <div>Blocked</div> : <div>Active</div>)

        },
        {
            name: 'Actions',
            minWidth: '100px',
            cell: row => (row.block ? <Button.Ripple color='primary' className='btn-sm-block' onClick={() => {
                dispatch(blockUser(row.id, currentPage, 10, !row.block, searchTerm))
            }}>
                <UserCheck size={15}/>
            </Button.Ripple> : <Button.Ripple color='primary' className='btn-sm-block' onClick={() => {
                dispatch(blockUser(row.id, currentPage, 10, !row.block, searchTerm))
            }}>
                <Slash size={15}/>
            </Button.Ripple>)
        }
    ]

    // ** Get data on mount
    useEffect(() => {
        dispatch(fetchUsers(0, rowsPerPage))
    }, [])


    // ** Function in get data on page change
    const handlePagination = page => {
        dispatch(
            fetchUsers(page.selected, rowsPerPage)
        )
        setCurrentPage(page.selected + 1)
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        dispatch(fetchUsers(currentPage - 1, rowsPerPage))
        setRowsPerPage(value)
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        dispatch(fetchUsers(currentPage - 1, rowsPerPage, val))
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const userCount = useSelector(state => state.users.userCount)
        const count = Number(Math.ceil(userCount / rowsPerPage))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
            />
        )
    }

    // ** Table data to render
    const dataToRender = () => {

        if (users.length > 0) {
            return users
        } else if (users.length === 0) {
            return []
        } else {
            return users
        }
    }

    const loading = useSelector(state => state.users.loading)

    return (
        <Fragment>
            {loading ? <ProgressLoader size="lg"/> : <Card>
                <DataTable
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={columns}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                    subHeaderComponent={
                        <CustomHeader
                            handlePerPage={handlePerPage}
                            rowsPerPage={rowsPerPage}
                            searchTerm={searchTerm}
                            handleFilter={handleFilter}
                        />
                    }
                />
            </Card>}

        </Fragment>
    )
}

export default UsersList
