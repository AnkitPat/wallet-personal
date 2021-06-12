// ** React Imports
import { Slash, UserCheck } from 'react-feather'
import { Link } from 'react-router-dom'
// ** Third Party Components
import { Button } from 'reactstrap'

export const columns = [
  {
    name: 'User',
    minWidth: '297px',
    selector: 'name',
  },
  {
    name: 'Email',
    minWidth: '320px',
    selector: 'email',
    cell: row => row.email
  },
  {
    name: 'Role',
    minWidth: '172px',
    selector: 'role.title',
  },
  {
    name: 'Status',
    minWidth: '172px',
    selector: '',
    cell: row => (row.block ? <div>Blocked</div> : <div>Active</div>)

  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (row.block ? <Button.Ripple tag={Link} to='/' color='primary' className='btn-sm-block' onClick={() => {
      blockUser(row.id, currentPage, 10, !row.block)
    }}>
      <UserCheck size={15} />
    </Button.Ripple> : <Button.Ripple tag={Link} to='/' color='primary' className='btn-sm-block' onClick={() => {
      blockUser(row.id, currentPage, 10, !row.block)
    }}>
      <Slash size={15} />
    </Button.Ripple>)
  }
]
