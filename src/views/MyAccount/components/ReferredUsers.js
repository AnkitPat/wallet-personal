import { ProgressLoader } from '@src/layouts/ProgressLoader'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Fragment, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from "react-redux"
import { Card, CardHeader, CardTitle } from "reactstrap"
import { fetchReferredUsers } from "../../../redux/actions/myAccount"

const ReferredUsers = () => {

    // ** Store Vars
    const dispatch = useDispatch()
    const users = useSelector(state => state.myaccount.referredUsers)

    const columns = [
        {
            name: 'User',
            minWidth: '297px',
            selector: 'name'
        },
        {
            name: 'Email',
            minWidth: '320px',
            selector: 'email',
            cell: row => row.email
        },
        {
            name: 'Status',
            minWidth: '172px',
            selector: '',
            cell: row => (row.block ? <div>Blocked</div> : <div>Active</div>)

        }
    ]

    // ** Get data on mount
    useEffect(() => {
        dispatch(fetchReferredUsers())
    }, [])

    const loading = useSelector(state => state.myaccount.loading)

    return (
        <Fragment>
            {loading ? <ProgressLoader size="lg" /> : <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Referred users</CardTitle>
                </CardHeader>
                <DataTable
                    noHeader
                    className='react-dataTable'
                    responsive
                    columns={columns}
                    className='react-dataTable'
                    data={users ? users.data : []}
                />
            </Card>}

        </Fragment>
    )
}

export default ReferredUsers