// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Third Party Components
import wNumb from 'wnumb'
import classnames from 'classnames'
import { Star } from 'react-feather'
import Nouislider from 'nouislider-react'
import { Card, CardBody, Row, Col, CustomInput, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'
import { useEffect, useMemo, useState } from 'react'
import { fetchBounties, fetchProjectsAndSocialMediums } from '../../../../redux/actions/bounty'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = props => {
  const priceRanges = useMemo(() => [
    {
      id: 'all',
      label: 'All',
      value: ''
    },
    {
      id: '0-10',
      label: '<=$10',
      value: 'priceMin=2&priceMax=10'
    },
    {
      id: '10-100',
      label: '$10-$100',
      value: 'priceMin=10&priceMax=100'
    },
    {
      id: '100-500',
      label: '$100-$500',
      value: 'priceMin=100&priceMax=500'
    },
    {
      id: '500-5000',
      label: '>=$500',
      value: 'priceMin=500&priceMax=5000'

    }
  ], [])
  const dispatch = useDispatch()
  const [selectedSocialMedium, setSelectedSocialMedium] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState('')
  const [selectedProjects, setSelectedProjects] = useState([])

  const projects = useSelector(state => state.bounty.projects)
  const socialMediums = useSelector(state => state.bounty.socialMediums)

  useEffect(() => {
    dispatch(fetchProjectsAndSocialMediums())
  }, [])


  useEffect(() => {
    dispatch(fetchBounties(selectedProjects, selectedSocialMedium, selectedPriceRange, props.searchTerm))
  }, [selectedProjects, selectedSocialMedium, selectedPriceRange, props.searchTerm])

  return (
    <div className='sidebar-detached sidebar-left mt-3'>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop')}
        >
          <Row>
            <Col sm='10'>
              <h6 className='filter-heading d-none d-lg-block'>Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div className='multi-range-price'>
                <h6 className='filter-title mt-0'>Multi Range</h6>
                <ul className='list-unstyled price-range'>
                  {priceRanges.map((range) => {
                    return <li className="my-1">
                      <CustomInput id={range.id} name='price-range-radio' type='radio' label={range.label} onChange={() => setSelectedPriceRange(range.value)} />
                    </li>
                  })}


                </ul>
              </div>

              <div id='product-categories'>
                <h6 className='filter-title'>Projects</h6>
                <ul className='list-unstyled categories-list'>
                  {projects.map(project => {
                    return (
                      <li className="my-1" key={project.id}>
                        <CustomInput
                          type='checkbox'
                          id={project.id}
                          label={project.title}
                          onChange={(e) => {
                            if (selectedProjects.findIndex(innerProject => innerProject.id === project.id) === -1) setSelectedProjects([...selectedProjects, project])
                            else setSelectedProjects(selectedProjects.filter(innerProject => innerProject.id !== project.id))
                          }}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className='brands'>
                <h6 className='filter-title'>Social Mediums</h6>
                <ul className='list-unstyled brand-list'>
                  {socialMediums.map(socialMedium => {
                    return (
                      <li className="my-1" key={socialMedium.title}>
                        <CustomInput
                          type='radio'
                          id={socialMedium.title}
                          label={socialMedium.title}
                          name='socialmedium-radio'
                          onChange={(e) => {
                            setSelectedSocialMedium(socialMedium.id)
                          }}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div id='clear-filters'>
                <Button.Ripple color='primary' block>
                  Clear All Filters
                </Button.Ripple>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
