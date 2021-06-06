import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/pages/page-profile.scss'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import ProfileHeader from './ProfileHeader'


const Profile = () => {
  const data = useSelector((state) => state.auth.userDetails)

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Profile' breadCrumbActive='Profile' />
      {data !== null ? (
        <div id='user-profile'>
          <Row>
            <Col sm='12'>
              <ProfileHeader data={data} />
            </Col>
          </Row>
        </div>
      ) : null}
    </Fragment>
  )
}

export default Profile
