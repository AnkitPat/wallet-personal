import {Home, DollarSign, Award, Users, Circle, LogOut, CreditCard, Gift} from 'react-feather'

const regularItems = [
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
    }
]

const adminItems = [
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
                id: 'bountyList',
                title: 'List',
                icon: <Circle size={12}/>,
                navLink: '/bounties'
            },
            {
                id: 'addBounty',
                title: 'Add',
                icon: <Circle size={12}/>,
                navLink: '/bounties/add'
            },
            {
                id: 'bountySubmission',
                title: 'Submissions',
                icon: <Circle size={12}/>,
                navLink: '/bounties/submissions'
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
            }
        ]
    },
    {
        id: 'users',
        title: 'Users',
        icon: <Users size={20}/>,
        navLink: '/users'
    },
    {
        id: 'withdrawal',
        title: 'Withdrawal Requests',
        icon: <LogOut size={20}/>,
        navLink: '/withdrawal/all'
    }
]

export {
    adminItems, regularItems
}
