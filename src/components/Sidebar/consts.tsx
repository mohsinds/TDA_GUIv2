import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AdminIcon from '@mui/icons-material/AdminPanelSettings'
import HomeIcon from '@mui/icons-material/CandlestickChartOutlined'
import React from 'react'

type SidebarItemChild = {
  title: string
  href: string
}

export type SidebarListItem = {
  title: string
  icon: React.ReactNode
  children?: SidebarItemChild[]
  href?: string
  open: boolean
}

const PLATFORMS_ITEMS: SidebarListItem[] = [
  {
    title: 'RFQ',
    icon: <HomeIcon />,
    open: false,
    href: '/',
  },
  // {
  //   title: 'Trading',
  //   icon: <TrendingUpIcon />,
  //   open: false,
  //   children: [
  //     {
  //       title: 'Spot Streaming',
  //       href: '/trading/spotstreaming',
  //     },
  //     {
  //       title: 'RFQ',
  //       href: '/trading/rfq',
  //     },
  //   ],
  // },

]


const ADMIN_ITEMS: SidebarListItem[] = [
  {
    title: 'Accounting',
    icon: <AdminIcon />,
    open: false,
    children: [
      {
        title: 'Fireblocks',
        href: '/accounting/fireblocks',
      },
    ],
  },

]

const TOOLS_ITEMS: SidebarListItem[] = [
  {
    title: 'Account Funding',
    icon: <AccountBalanceWalletIcon />,
    open: false,
    children: [
      // {
      //   title: 'Balances',
      //   href: '/accountfunding/balances',
      // },
      // {
      //   title: 'Funding',
      //   href: '/accountfunding/funding',
      // },
      // {
      //   title: 'Instructions',
      //   href: '/accountfunding/instructions',
      // },
      {
        title: 'Crypto',
        href: '/accountfunding/crypto',
      },
      {
        title: 'Fiat',
        href: '/accountfunding/fiat',
      },
    ],
  },
  {
    title: 'Account History',
    icon: <AccountBalanceWalletIcon />,
    open: false,
    href: '/accounthistory',
  },
  // {
  //   title: 'Account History',
  //   icon: <AccountBalanceWalletIcon />,
  //   open: false,
  //   children: [
  //     // {
  //     //   title: 'Execution',
  //     //   href: '/accounthistory/execution',
  //     // },
  //     // {
  //     //   title: 'Historic',
  //     //   href: '/accounthistory/historic',
  //     // },
  //     // {
  //     //   title: 'Statement Generation',
  //     //   href: '/accounthistory/statement',
  //     // },
  //   ],
  // }
]

export { PLATFORMS_ITEMS, TOOLS_ITEMS,ADMIN_ITEMS }
