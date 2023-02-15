import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IRentItem } from '../../types';
import { CardMedia, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

interface IPost {
  post: IRentItem
}

const RentItem: FC<IPost> = ({post}) => {
  return (
    <Card sx={{ maxWidth: '30vw', mb: 1.5, mt: 1.5 }}> 
      <CardContent>
        <Typography variant="h6" component="div">
          {post.name}
        </Typography>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
          <b>Регион:</b> {post.region}<br />
          <b>Город:</b> {post.city}<br />
          <b>Улица</b>: {post.street}<br />
          <b>Дом:</b> {post.houseNumber}
        </Typography>
        <CardMedia
          component="img"
          image={post.images[0].dataInBase64}
          alt="Paella dish"
        />
        <Typography variant="h6" component="div">
          Цена: {post.price} руб/мес
        </Typography>
        <Typography sx={{ mb: 1.5, mt: 1.5, }} color="text.secondary">
          Описание: {post.description}
        </Typography>
        <Typography variant="body2">
          <b>Тип:</b> {post.type}<br />
          <b>Площадь:</b> {post.square}<br />
          <b>Год</b>: {post.year}<br />
          <b>Число комнат:</b> {post.numberOfRooms}<br />
          <b>Этаж:</b> {post.floor}
        </Typography>
        <Link to={`/catalog/${post.id}`}>
          <Button size="small" sx={{mt: 1}}>Продолжить</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default RentItem
