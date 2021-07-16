import {Briefcase, Circle, CreditCard, Gift, HelpCircle, Home} from "react-feather"

export const projectManagerItems = [
    {
        id: 'home',
        title: 'Home',
        icon: <Home size={20}/>,
        navLink: '/home'
    },
    {
        id: 'projects',
        title: 'Projects',
        icon: <Briefcase size={20}/>,
        children: [
            {
                id: 'bountyList',
                title: 'List',
                icon: <Circle size={12}/>,
                navLink: '/projects'
            },
            {
                id: 'addProject',
                title: 'Add',
                icon: <Circle size={12}/>,
                navLink: '/projects/add'
            }
        ]
    },
    {
        id: 'bounties',
        title: 'Bounties',
        icon: <Gift size={20}/>,
        children: [
            {
                id: 'addBounty',
                title: 'Add',
                icon: <Circle size={12}/>,
                navLink: '/bounties/add'
            },
            {
                id: 'bountyList',
                title: 'List',
                icon: <Circle size={12}/>,
                navLink: '/bounties'
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
        id: 'faq',
        title: 'FAQ',
        icon: <HelpCircle size={12}/>,
        navLink: '/faq'
    }
]
