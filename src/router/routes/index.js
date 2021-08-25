import {lazy} from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    {
        path: '/home',
        exact: true,
        component: lazy(() => import('../../views/Dashboard/Home'))
    },
    {
        path: '/second-page',
        component: lazy(() => import('../../views/SecondPage'))
    },
    {
        path: '/login',
        component: lazy(() => import('../../views/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/register',
        component: lazy(() => import('../../views/Authentication/Register')),
        layout: 'BlankLayout',
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: '/register/host',
        component: lazy(() => import('../../views/Authentication/HostRegister')),
        layout: 'BlankLayout',
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: '/verification',
        component: lazy(() => import('../../views/Authentication/Verification')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/forgotpassword',
        component: lazy(() => import('../../views/Authentication/ForgotPassword')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/authenticator',
        exact: true,
        component: lazy(() => import('../../views/Authenticator')),
        layout: 'BlankLayout'
    },
    {
        path: '/myaccount',
        exact: true,
        component: lazy(() => import('../../views/MyAccount'))
    },
    {
        path: '/myaccount/referral',
        exact: true,
        component: lazy(() => import('../../views/MyAccount/Referral'))
    },
    {
        path: '/myaccount/edit',
        exact: true,
        component: lazy(() => import('../../views/AccountSettings'))
    },
    {
        path: '/membership',
        exact: true,
        component: lazy(() => import('../../views/membership'))
    },
    {
        path: '/bounties',
        exact: true,
        component: lazy(() => import('../../views/bounty/list'))
    },
    {
        path: '/bounties/add',
        exact: true,
        component: lazy(() => import('../../views/bounty/add'))
    },
    {
        path: '/bounties/edit/:id',
        exact: true,
        component: lazy(() => import('../../views/bounty/add'))
    },
    {
        path: '/bounties/myBounties',
        exact: true,
        component: lazy(() => import('../../views/bounty/myBounties'))
    },
    {
        path: '/bounties/submissions',
        exact: true,
        component: lazy(() => import('../../views/bounty/submissions'))
    },
    {
        path: '/bounties/:id',
        exact: true,
        component: lazy(() => import('../../views/bounty/details'))
    },
    {
        path: '/wallet',
        exact: true,
        component: lazy(() => import('../../views/userWallet'))
    },
    {
        path: '/withdrawal',
        exact: true,
        component: lazy(() => import('../../views/Withdrawal'))
    },
    {
        path: '/withdrawal/all',
        exact: true,
        component: lazy(() => import('../../views/Withdrawal/allWithdrawal'))
    },
    {
        path: '/order/success',
        exact: true,
        component: lazy(() => import('../../views/userWallet/success'))
    },
    {
        path: '/wallet/transactions',
        exact: true,
        component: lazy(() => import('../../views/Transactions'))
    },
    {
        path: '/users',
        exact: true,
        component: lazy(() => import('../../views/AllUsers'))
    },
    {
        path: '/blog',
        exact: true,
        component: lazy(() => import('../../views/blog/list'))
    },
    {
        path: '/blog/detail/:id',
        exact: true,
        component: lazy(() => import('../../views/blog/details'))
    },
    {
        path: '/faq',
        exact: true,
        component: lazy(() => import('../../views/faq'))
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    },
    {
        path: '/membership/success',
        exact: true,
        component: lazy(() => import('../../views/membership/success'))
    },
    {
        path: '/projects',
        exact: true,
        component: lazy(() => import('../../views/Projects/ProjectList'))
    },
    {
        path: '/projects/add',
        exact: true,
        component: lazy(() => import('../../views/Projects/ProjectForm'))
    },
    {
        path: '/projects/:id/edit',
        exact: true,
        component: lazy(() => import('../../views/Projects/ProjectForm'))
    }
]

export {DefaultRoute, TemplateTitle, Routes}
