import {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import Faqs from './Faqs'
import FaqFilter from './FaqFilter'
import FaqContact from './FaqContact'
import Breadcrumbs from '@components/breadcrumbs'

import '@styles/base/pages/page-faq.scss'
import bliiink from '@src/assets/images/banner/FB_Cover.jpg'

const data = {

    // payment
    potentiam: {
        icon: 'CreditCard',
        title: 'Potentiam Wallet',
        subtitle: '',
        qandA: [
            {
                question: 'What is Potentiam?',
                ans:
                    'Potentiam network\'s core purpose is to facilitate interactions between brands,music creators, and consumers without the need for intermediaries.'
            },
            {
                question: 'Users: How does the Potentiam wallet work?',
                ans:
                    '1. Create your profile, and fill out the requested information (including your social media profiles). The more detailed the information is, the better.\n' +
                    '2. Search for active project campaigns you wish to complete. We have provided search filters that help you narrow your choices.\n' +
                    'Campaign Search Instructions\n' +
                    'Log in to your account > Click the bounties button on the top left-hand corner under home > List button to see available campaigns > Filter to your preferences > Browse and select the ones you like.\n' +
                    '3. If you see a campaign that you like, read the instructions thoroughly to complete it! Once you submit the required link, we will verify it. Then it will be available for you to claim at the end of the campaign period. \n'
            },
            {
                question: 'What are the best practices for setting up & using your wallet?',
                ans: 'When creating an account, use the same social media handles and email used during signup for completing campaigns. If not, the submission may not be accepted.\n' +
                    'Read through the rules, instructions and adhere to them. Otherwise, your submission may not be accepted. Activate 2FA authentication to protect your account.\n'
            },
            {
                question: 'Can anyone earn on potentiam?',
                ans: 'Yes, Anyone is free to create an account and earn on completing tasks on Potentiam, provided you are above the age of 16.'
            },
            {
                question: 'Can I participate in any bounty campaign?',
                ans: 'Yes, you are free to participate in any bounty campaign. However, please check your eligibility under the rules of individual campaigns.'
            },
            {
                question: 'Can I earn from referrals & how do I do this?',
                ans: 'Yes, everyone can earn from referrals. Send your link found on the referral section in your wallet to your friends. And, you will receive 25% of the subscription fee.'
            }
        ]
    },
    // delivery
    delivery: {
        icon: 'Music',
        title: 'Artists/Brands',
        subtitle: 'Coming soon!',
        qandA: []
    },
    // cancellation and return
    payment: {
        icon: 'DollarSign',
        title: 'Payment',
        subtitle: '',
        qandA: [
            {
                question: 'International users payment?',
                ans:
                    'We have plans to have our services available globally. However, we can only accept online payments from countries that Stripe services are available.'
            },
            {
                question: 'Can I refund a purchase on potentiam?',
                ans:
                    'There are no refunds when buying credits on Potentiam, so please make sure you do adequate checks before purchasing credits.'
            },
            {
                question: 'How do I withdraw on potentiam wallet?',
                ans:
                    'To withdraw on the Potentiam wallet, click the manager button on the left-hand side, click the withdrawal button, make sure you sign in to your Metamask wallet.'
            },
            {
                question: 'How long does it take for payouts to be completed?',
                ans:
                    'Payouts will be available at the end of the designated campaign. You are free to request payouts anytime after the campaign ends. We endeavour to complete the payout within seven days of your request.'
            }
        ]
    },
    // my orders
    myOrders: {
        icon: 'Package',
        title: 'Membership & subscription',
        subtitle: '',
        qandA: [
            {
                question: 'Can I upgrade my membership?',
                ans:
                    'Yes, you can upgrade your membership plan.'
            },
            {
                question: 'How do you process subscription payments?',
                ans:
                    'We use Stripe to process subscription payments.'
            },
            {
                question: 'Does my subscription automatically renew?',
                ans:
                    'Yes, subscriptions automatically renew monthly.'
            },
            {
                question: 'Can I pause or cancel my subscription?',
                ans:
                    'Yes, you can pause your subscription and choose to restart at a later date. Or you can cancel your subscription at the end of the current period.'
            }
        ]
    }
}

const Faq = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <a href="https://bliiink.co.uk/" target="_blank">
                        <img alt="bliiink banner" className="img-fluid mb-3" src={bliiink}/>
                    </a>
                </div>
            </div>
            <Faqs data={data}/>
            <FaqContact/>
        </Fragment>
    )
}

export default Faq
