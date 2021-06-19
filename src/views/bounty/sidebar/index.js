import {Card, CardBody, Media} from 'reactstrap'
import React from "react"

const BountySidebar = ({bounty}) => {
    return (
        <div className='sidebar-detached sidebar-right'>
            <div className='sidebar'>
                <div className='blog-sidebar right-sidebar my-2 my-lg-0'>
                    <div className='right-sidebar-content'>
                        <Card className='card-profile'>
                            <CardBody>
                                <div className='profile-image-wrapper'>
                                    <div className='profile-image'>
                                        <Media object className='rounded mr-50' src={bounty.project.logo} alt='logo'/>
                                    </div>
                                </div>
                                <h3>{bounty.project.title}</h3>
                                <hr className='mb-2'/>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h6 className='text-muted font-weight-bolder'>About</h6>
                                        <p>{bounty.project.description}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BountySidebar
