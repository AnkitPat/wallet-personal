import { Mail, Home, DollarSign, User } from 'react-feather'
import { useSelector } from 'react-redux'

const regularItems = [
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

const adminItems = [
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
  },
  {
    id: 'submissions',
    title: 'All submission',
    icon: <User size={20} />,
    navLink: '/bounties/submissions'
  }
]

export {
  adminItems, regularItems
}
