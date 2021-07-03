// ** React Imports
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

// ** Third Party Components
import { Disc, X, Circle } from 'react-feather'

// ** Config
import logo from '@src/assets/images/icons/logo-light.png'
import logoLight from '@src/assets/images/icons/logo.png'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props
  const item = window.localStorage.getItem('skin')
  const potentiamLogo = JSON.parse(item) !== 'dark' ? logo : logoLight

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header'>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item mr-auto'>
          <NavLink to='/' className='navbar-brand'>
            <span className='brand-logo'>
              <img src={potentiamLogo} alt='logo' />
            </span>
          </NavLink>
        </li>
        <li className='nav-item nav-toggle'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
