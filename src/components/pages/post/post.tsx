import React, { FC, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Box, CardMedia, IconButton, TextField } from '@mui/material';
import { IProfile, IRentItem } from '../../../types';
import { createOrder, deleteConstruction, getConstruction, getCurrentUser, getEndDate, host } from '../../../http-routes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Images from './images';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const Post: FC = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {id} = useParams();
    const [post, setPost] = useState<IRentItem>();
    const [profile, setProfile] = useState<IProfile>();
    const [endDate, setEndDate] = useState(new Date());
    const [order, setOrder] = useState({
        constructionId: id,
        startedAtUtc: "",
        endedAtUtc: ""
    })

    useEffect(() => {
        fetch(getConstruction(host, id!), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(items => {
            setPost(items); 
        })

        fetch(getEndDate(host, id!), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(items => {
            setEndDate(new Date(items.endDate));
        })

        fetch(getCurrentUser(host), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(items => {
            setProfile(items);
        })

    }, [])

    const handleStartedDate = (date: Dayjs | null) => {
        setOrder(prev => ({...prev, startedAtUtc: date!.toDate().toISOString()}))
    };

    const handleEndedDate = (date: Dayjs | null) => {
        setOrder(prev => ({...prev, endedAtUtc: date!.toDate().toISOString()}))
    };

    const handleOrder = () => {
        fetch(createOrder(host), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(items => {
            setEndDate(new Date(items.endDate));
        })
    }

    const handleRemove = () => {
        fetch(deleteConstruction(host, id!), {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(order)
        })
        .then(response => {
            if(response.status == 200){
              navigate('/profile');
            }
          })
    }
    
  return (
    <div style={{width: '100%', display: 'flex', marginTop: '100px', justifyContent: 'space-around', flexDirection: 'row'}}>
        <div style={{width: '60%'}}>
        <Typography variant="h4" sx={{mb: 2}} component="div">
          <b>{post?.name}</b>
            {profile?.id == post?.userId && <Link to={`/update-post/${id}`}><Button 
                sx={{ml: 5}}
                variant="outlined" 
            >????????????????
            </Button></Link>}
            {(profile?.role == 'Administrator' || profile?.id == post?.userId) && <Button 
                sx={{ml: 1}}
                variant="outlined" 
                color="error" 
                onClick={handleRemove}
                startIcon={<DeleteIcon />}
            >??????????????
            </Button>}
        </Typography>
        <Typography sx={{ fontSize: 16, mb: 2}} color="text.secondary" gutterBottom>
          <b>????????????:</b> {post?.region}<br />
          <b>??????????:</b> {post?.city}<br />
          <b>??????????</b>: {post?.street}<br />
          <b>??????:</b> {post?.houseNumber}<br />
          <b>??????????????:</b> {post?.phoneNumber}
        </Typography>
        <CardMedia
          component="img"
          image={post?.images[0].dataInBase64}
          alt="Paella dish"
        />
        <Typography variant="h6" sx={{ fontSize: 24, mb: 2, mt: 2}} component="div">
          <b>????????: {post?.price} ??????/??????</b>
        </Typography>
        <Typography sx={{ mb: 2, mt: 2, }} color="text.secondary">
          ????????????????: {post?.description}
        </Typography>
        <Typography sx={{ fontSize: 16, mb: 10}} variant="body2">
          <b>??????:</b> {post?.type}<br />
          <b>??????????????:</b> {post?.square} ????. ????????????<br />
          <b>??????</b>: {post?.year}<br />
          <b>?????????? ????????????:</b> {post?.numberOfRooms}<br />
          <b>????????:</b> {post?.floor}
        </Typography>
        <Images images={post?.images} />
        </div>
        <div style={{width: '30%'}}>
            { (profile?.role == 'Landlord' || profile?.role == 'User') && <Box>
                <Typography variant="h5" sx={{mb: 4}} component="div">
                    <b>????????????</b>
                </Typography>
                <Button variant="contained" color="success">
                    ???????????? ?????????????????? ???????????????? ?? {endDate.getDate() + 1}/{endDate.getUTCMonth() + 1}/{endDate.getFullYear()}
                </Button>
                <Box sx={{mt: 3, display: 'flex', flexDirection: 'row'}}>
                    <Box sx={{mr: 2}}>
                        <DesktopDatePicker
                            label="???????? ????????????"
                            inputFormat="MM/DD/YYYY"
                            value={dayjs(order.startedAtUtc)}
                            onChange={handleStartedDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                    <Box>
                        <DesktopDatePicker
                            label="???????? ??????????"
                            inputFormat="MM/DD/YYYY"
                            value={dayjs(order.endedAtUtc)}
                            onChange={handleEndedDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                </Box>
                <br />
                <Button 
                    variant="contained" 
                    sx={{mt: 1, mr: 1}} 
                    color='success'
                    onClick={handleOrder}
                >????????????????????</Button>
            </Box>}
        </div>
      </div>
  );
}

export default Post
