import React from "react"
import {Button} from "reactstrap"
import metamask from '@src/assets/images/illustration/metamask-fox.svg'

export function NoWalletDetected() {
    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-6 p-4 text-center">
                    <p>
                        <h1>No Ethereum wallet was detected. <br/>
                            Please install{" "}</h1>
                        <a
                            href="http://metamask.io"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img width={150} src={metamask} alt='Metamask Pic'/><br/>
                            <Button.Ripple className="mt-2" color='primary' size='lg'>MetaMask</Button.Ripple>
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}
