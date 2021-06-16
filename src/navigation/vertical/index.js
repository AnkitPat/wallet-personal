import {Home, DollarSign, Award, Users, Circle} from 'react-feather'

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
        icon: <Award size={20}/>,
        navLink: '/bounties'
    },
    {
        id: 'userWallet',
        title: 'Manager',
        icon: <DollarSign size={20}/>,
        children: [
            {
                id: 'addCredits',
                title: 'Add Credits',
                icon: <Circle size={12}/>,
                navLink: '/wallet'
            },
            {
                id: 'creditHistory',
                title: 'History',
                icon: <Circle size={12}/>,
                navLink: '/wallet/history'
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
        icon: <Award size={20}/>,
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
        icon: <DollarSign size={20}/>,
        children: [
            {
                id: 'addCredits',
                title: 'Add Credits',
                icon: <Circle size={12}/>,
                navLink: '/wallet'
            },
            {
                id: 'creditHistory',
                title: 'History',
                icon: <Circle size={12}/>,
                navLink: '/wallet/history'
            }
        ]
    },
    {
        id: 'users',
        title: 'Users',
        icon: <Users size={20}/>,
        navLink: '/users'
    }
]

export {
    adminItems, regularItems
}
