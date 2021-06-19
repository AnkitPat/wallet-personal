// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, Power, UserPlus, LogOut } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.auth.userDetails)
  const userAvatar = (userDetails && userDetails.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{(userDetails && userDetails['name'])}</span>
          <span className='user-status'>{(userDetails && userDetails.role && userDetails.role.title)}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to='/myaccount'>
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
