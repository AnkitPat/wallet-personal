import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
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
    path: '/order/success',
    exact: true,
    component: lazy(() => import('../../views/userWallet/success'))
  },
  {
    path: '/wallet/history',
    exact: true,
    component: lazy(() => import('../../views/userWallet/history'))
  },
  {
    path: '/users',
    exact: true,
    component: lazy(() => import('../../views/AllUsers'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
