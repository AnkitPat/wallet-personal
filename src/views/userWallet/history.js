import format from 'date-fns/format'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { connect, useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { fetchWalletHistories } from '../../redux/actions/wallet'
import { history } from '../../utility/Utils'

const WalletHistory = (
    {

    }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchWalletHistories())
    }, [])

    // eslint-disable-next-line no-unused-vars
    function dateFormatter(cell, row, rowIndex, formatExtraData) {
        return format(new Date(row.updatedAt), 'MM/dd/yyyy')
    }

    const columns = [
        {
            dataField: 'amount',
            text: 'Amount',
            style: {
                width: '20%'
            },
            headerStyle: {
                width: '20%'
            }
        },
        {
            dataField: 'currency',
            text: 'Currency',
            style: {
                width: '20%',
                textAlign: 'center'
            },
            headerStyle: {
                width: '20%',
                textAlign: 'center'

            }
        },
        {
            dataField: 'orderStatus.title',
            text: 'Status',
            style: {
                width: '30%',
                textAlign: 'center'

            },
            headerStyle: {
                width: '30%',
                textAlign: 'center'

            }
        },
        {
            dataField: 'updatedAt',
            text: 'Purchased Date',
            formatter: dateFormatter,
            style: {
                width: '30%',
                textAlign: 'center'

            },
            headerStyle: {
                width: '30%',
                textAlign: 'center'

            }
        }
    ]

    const paymentHistory = useSelector(state => state.wallet.history)

    return (
        <div>
            <div className="mt-4">
                <BootstrapTable
                    striped
                    bordered={false}
                    bootstrap4
                    pagination={paginationFactory()}
                    keyField="id"
                    data={paymentHistory}
                    columns={columns}
                />
            </div>
        </div>
    )
}

// const mapStateToProps = createStructuredSelector({
//     //   paymentHistory: makeSelectPaymentHistory(),
//     //   influencerProfile: makeSelectInfluencerDetails(),
//     //   withdrawalRequests: makeSelectWithdrawalRequests(),
//     //   earnings: makeSelectEarnings(),
//     //   userDetails: makeSelectUserDetails()
// })

// function mapDispatchToProps(dispatch) {
//     return {
//         // fetchPaymentHistory: () => dispatch(fetchPaymentHistoryAction()),
//         // getWithdrawalRequests: () => dispatch(getWithdrawalRequestsAction()),
//         // getEarnings: () => dispatch(getEarningsAction())
//     }
// }

// const withConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )

export default WalletHistory
