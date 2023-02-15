import React, { FC, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IRentItem, IOrderItem } from '../../types';
import { CardMedia } from '@mui/material';
import { getConstruction, host } from '../../http-routes';

interface IOrder {
    order: IOrderItem
}

const OrderItem: FC<IOrder> = ({order}) => {

    const [post, setPost] = useState<IRentItem>()
    const dateOfStart = new Date(order.startedAtUtc)
    const dateOfEnd = new Date(order.endedAtUtc)

    useEffect(() => {
        fetch(getConstruction(host, order.constructionId), {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(items => {
                setPost(items);
            })
    }, [])


  return (
    <Card sx={{ maxWidth: '30vw', mb: 1.5, mt: 1.5 }}> 
      <CardContent>
        <Typography variant="h6" component="div">
          {post?.name}
        </Typography>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
          <b>Регион:</b> {post?.region}<br />
          <b>Город:</b> {post?.city}<br />
          <b>Улица</b>: {post?.street}<br />
          <b>Дом:</b> {post?.houseNumber}
        </Typography>
        <CardMedia
          component="img"
          image={post?.images[0].dataInBase64}
          alt="Paella dish"
        />
        <Typography sx={{ mb: 1.5, mt: 1.5, }} color="text.secondary">
          <b>Дата начала аренды:</b> {dateOfStart.getDate()}/{dateOfStart.getUTCMonth() + 1}/{dateOfStart.getFullYear()}<br />
          <b>Дата конца аренды:</b> {dateOfEnd.getDate()}/{dateOfEnd.getUTCMonth() + 1}/{dateOfEnd.getFullYear()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OrderItem
