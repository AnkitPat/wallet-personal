import React, {memo} from "react"
import metamask from '@src/assets/images/illustration/metamask-fox.svg'
import {Button} from 'reactstrap'

const MetamaskConnect = ({connectWallet}) => {
    return <div>
        <div className="row pb-4">
            <div className="col d-flex justify-content-center">
                <h1>Sign in to your wallet.</h1>
            </div>
        </div>
        <div className="row pb-4">
            <div className="col d-flex justify-content-center">
                <img width={150} src={metamask} alt='Metamask Pic'/>
            </div>
        </div>
        <div className="row">
            <div className="col d-flex justify-content-center">
                <Button.Ripple color='primary' size='lg' onClick={connectWallet}>Sign in</Button.Ripple>
            </div>
        </div>
    </div>
}

export default memo(MetamaskConnect)
