import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Image } from 'reactstrap'
import WalletHistory from '../userWallet/history'
import WithdrawalHistory from '../Withdrawal/history'
import Earnings from './Earnings'
import SpentHistory from './SpentHistory'
import {DollarSign, Download} from 'react-feather'

const Transactions = () => {
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
              <DollarSign/>
            Wallet History
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
              <Download/>
            Withdrawal History
          </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3')
            }}
          >
            Earnings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '4'}
            onClick={() => {
              toggle('4')
            }}
          >
            Spent History
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
          {active === '1' && <WalletHistory />}
        </TabPane>
        <TabPane tabId='2'>
          {active === '2' && <WithdrawalHistory />}
        </TabPane>
        <TabPane tabId='3'>
          {active === '3' && <Earnings/>}
        </TabPane>
        <TabPane tabId='4'>
          {active === '4' && <SpentHistory/>}
        </TabPane>
      </TabContent>
    </React.Fragment>
  )
}
export default Transactions