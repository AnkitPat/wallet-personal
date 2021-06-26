// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, Power, UserPlus } from 'react-feather'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.auth.userDetails)
  const userName = Object.keys(userDetails).length === 0 ? 'Name' : userDetails['name']

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{(userDetails && userDetails['name'])}</span>
          <span className='user-status'>{(userDetails && userDetails.subscription && userDetails.subscription.title)}</span>
        </div>
        {
          userDetails && userDetails.avatar ? <Avatar img={userDetails.avatar} imgHeight='40' imgWidth='40' status='online' /> : <Avatar color='primary' initials content={userName} />
        }
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to='/myaccount/edit'>
          <User size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/myaccount/referral'>
          <Mail size={14} className='mr-75' />
          <span className='align-middle'>Referral Link</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/membership'>
          <UserPlus size={14} className='mr-75' />
          <span className='align-middle'>Membership</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
