/**
 *
 * PtmTokenForm
 *
 */

import Breadcrumbs from '@components/breadcrumbs'
import web3 from '@src/utility/web3'
import React, { Fragment, memo, useEffect, useState } from 'react'

function PtmWithdrawal({ }) {
  const [account, setAccount] = useState('')
  const [showMetaMask, setShowMetaMask] = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable()
      web3.eth.getAccounts().then(addr => {
        setAccount(addr[0])
      })
    } else {
      setShowMetaMask(true)
    }
  }, [])

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log(accounts)
      setAccount(accounts[0])
    })
  })

  return <Fragment>
    <Breadcrumbs
      breadCrumbTitle='Withdrawal'
      breadCrumbParent=''
      breadCrumbActive='Withdrawal'
    />
    {showMetaMask && <div className="row">
      <div className="col">
        <p>You need an Ethereum wallet to withdraw in Potentiam token</p>
        <img src="https://opensea.io/static/images/logos/metamask-alternative.png" />
        <a href="https://metamask.io/download.html" target="_blank">
          <Button.Ripple color='primary' className='btn-sm-block mb-2'>
            Get MetaMask
          </Button.Ripple>
        </a>
      </div>
    </div>}
    <div className="form-group dark-layout">
      <div className="form-group">
        {account ? <p className="recharts-text">Recieving Address: {account}</p> : <p className="recharts-text">Please connect metamask</p>}
      </div>
    </div>
  </Fragment>
}

PtmWithdrawal.propTypes = {}
export default memo(PtmWithdrawal)
