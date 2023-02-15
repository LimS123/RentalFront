import React, { FC, useState } from 'react'
import { getConstruction, host } from '../../http-routes'
import { IOrderItem, IRentItem } from '../../types'
import OrderItem from '../orderItem/orderItem'
import RentItem from '../rentItem/rentitem'

interface IOrders {
    orders: IOrderItem[]
}

const Orders: FC<IOrders> = ({orders}) => {
    return (
        <div style={{display: 'flex', width: '35vw', alignItems: 'center', flexDirection: "column"}}>
            {orders.map((order, index) => (
                <OrderItem key={index} order={order}/>
            ))}
        </div>
    )
}

export default Orders