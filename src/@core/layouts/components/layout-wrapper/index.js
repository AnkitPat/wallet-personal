// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { handleContentWidth, handleMenuCollapsed, handleMenuHidden } from '@store/actions/layout'

// ** Styles
import 'animate.css/animate.css'
import {handleUserInformation} from "../../../../redux/actions/auth"
import tawkTo from 'tawkto-react'

const LayoutWrapper = props => {
  // ** Props
  const { layout, children, appLayout, wrapperClass, transition, routeMeta } = props

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const navbarStore = store.navbar
  const contentWidth = store.layout.contentWidth
  const userDetails = useSelector(state => state.auth.userDetails)

  //** Vars
  const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment

  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth('full'))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(!routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(!routeMeta.menuHidden))
      }
    }
  }

  // ** ComponentDidMount
  useEffect(() => {
    dispatch(handleUserInformation())
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden))
      }
    }
    return () => cleanUp()
  }, [])

  useEffect(() => {
    if (userDetails.subscriptionId) {
      tawkTo(process.env.REACT_APP_TAWK_PROPERTY, process.env.REACT_APP_TAWK_KEY)
    }
  }, [userDetails])

  return (
    <div
      className={classnames('app-content content overflow-hidden', {
        [wrapperClass]: wrapperClass,
        'show-overlay': navbarStore.query.length
      })}
    >
      <div className='content-overlay'></div>
      <div className='header-navbar-shadow' />
      <div
        className={classnames({
          'content-wrapper': !appLayout,
          'content-area-wrapper': appLayout,
          'container p-0': contentWidth === 'boxed',
          [`animate__animated animate__${transition}`]: transition !== 'none' && transition.length
        })}
      >
        <Tag
          /*eslint-disable */
          {...(layout === 'HorizontalLayout' && !appLayout
            ? { className: classnames({ 'content-body': !appLayout }) }
            : {})}
          /*eslint-enable */
        >
          {children}
        </Tag>
      </div>
    </div>
  )
}

export default LayoutWrapper
