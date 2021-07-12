import {Circle, CreditCard, Gift, HelpCircle, Home} from "react-feather"

export const regularItems = [
    {
        id: 'home',
        title: 'Home',
        icon: <Home size={20}/>,
        navLink: '/home'
    },
    {
        id: 'bounties',
        title: 'Bounties',
        icon: <Gift size={20}/>,
        children: [
            {
                id: 'listBounties',
                title: 'List',
                icon: <Circle size={12}/>,
                navLink: '/bounties'
            },
            {
                id: 'myBounties',
                title: 'My Bounties',
                icon: <Circle size={12}/>,
                navLink: '/bounties/myBounties'
            }
        ]
    },
    {
        id: 'userWallet',
        title: 'Manager',
        icon: <CreditCard size={20}/>,
        children: [
            {
                id: 'addCredits',
                title: 'Add Credits',
                icon: <Circle size={12}/>,
                navLink: '/wallet'
            },
            {
                id: 'creditHistory',
                title: 'Transaction',
                icon: <Circle size={12}/>,
                navLink: '/wallet/transactions'
            },
            {
                id: 'withdrawal',
                title: 'Withdrawal',
                icon: <Circle size={12}/>,
                navLink: '/withdrawal'
            }
        ]
    },
    {
        id: 'faq',
        title: 'FAQ',
        icon: <HelpCircle size={12}/>,
        navLink: '/faq'
    }
]
