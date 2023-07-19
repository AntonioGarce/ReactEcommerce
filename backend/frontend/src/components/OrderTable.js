import React, { useState } from 'react'
import { CButton, CCardBody, CCollapse, CSmartTable } from '@coreui/react-pro'

// import data from './_data.js'
import { useSelector } from 'react-redux'

const OrderTable = () => {
  const [details, setDetails] = useState([])
  const { loading, orders, error } = useSelector(state=>state.orderList)
  const data = orders.map(order=>{return {id:order._id, created_at:order.createdAt, price:order.totalPrice, 
                                            paidAt: order.paidAt??'', delivered_at: order.deliveredAt??'', is_paid:order.isPaid}})
  console.log(data)
  const columns = [
    {
      key: 'id',
      _style: { width: '5%' },
    },
    { key: 'created_at', _style: { width: '10%'}},
    { key: 'price', _style: { width: '5%' } },
    { key: 'paid', _style: { width: '10%' }},
    { key: 'delivered', _style: { width: '10%'}},
    {
      key: 'show_details',
      label: 'Show details',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  return (
    <>
        { 
        data  && 
        <CSmartTable
        sorterValue={{ column: 'name', state: 'asc' }}
        clickableRows
        tableProps={{
            striped: true,
            hover: true,
        }}
        activePage={3} 
        items={data}
        columns={columns}
        columnFilter
        tableFilter
        cleaner
        itemsPerPageSelect
        itemsPerPage={5}
        columnSorter
        pagination
        scopedColumns={{
            paid: (item) => (
                <td style={{display:'block',alignContent:'center'}}>
                    {item.isPaid?item.paidAt:<i style={{color:'red', marginLeft:'50%'}} className='fas fa-times'></i>}
                </td>
            ),
            delivered: (item) => (
                <td>
                    {item.isDelivered? item.deliveredAt : <i style={{color:'red', marginLeft:'50%'}} className='fas fa-times'></i>}
                </td>
            ),

            show_details: (item) => {
            return (
                <td className="py-2">
                <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                    toggleDetails(item.id)
                    }}
                >
                    {details.includes(item.id) ? 'Hide' : 'Show'}
                </CButton>
                </td>
            )
            },
            details: (item) => {
            return (
                <CCollapse visible={details.includes(item.id)}>
                <CCardBody>
                    <h4>{item.username}</h4>
                    <p className="text-muted">User since: {item.registered}</p>
                    <CButton size="sm" color="info">
                    Edit
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1">
                    Delete
                    </CButton>
                </CCardBody>
                </CCollapse>
            )
            },
        }}
        />
        }
    </>
  )
}

export default OrderTable
