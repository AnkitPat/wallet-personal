import { useState } from 'react'
import { AlignJustify, Edit } from 'react-feather'
import { Card, Collapse, Navbar, Button } from 'reactstrap'

import { history } from '../../utility/Utils'

const ProfileHeader = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Card className='profile-header mb-2'>
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
            <img className='rounded img-fluid' src={data.avatar} alt='Card image' />
          </div>
          <div className='profile-title ml-3'>
            <h2 className='text-white'>{data.name}</h2>
            <p className='text-white'>{data.role && data.role.title}</p>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <Navbar className='justify-content-end justify-content-md-between w-100' expand='md' light>
          <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-end flex-wrap mt-1 mt-md-0'>

              <Button color='primary' onClick={() => history.push('/myaccount/edit')}>
                <Edit className='d-block d-md-none' size={14} />
                <span className='font-weight-bold d-none d-md-block'>Edit</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
