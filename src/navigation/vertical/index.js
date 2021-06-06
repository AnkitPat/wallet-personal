import { Mail, Home, DollarSign } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  
  {
    id: 'bounties',
    title: 'Bounties',
    icon: <Mail size={20} />,
    navLink: '/bounties'
  },
  {
    id: 'userWallet',
    title: 'User Wallet',
    icon: <DollarSign size={20} />,
    navLink: '/wallet'
  }
]
