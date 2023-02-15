import { Box, Button, TextField, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { createApplication, getCurrentUser, getUser, getUserConstructions, getUserOrders, host, updateUser } from "../../../http-routes";
import { IOrderItem, IProfile, IRentItem } from "../../../types";
import Orders from "../../orders/orders";
import Posts from "../../posts/posts";

const Profile: FC = () => {

    const token = localStorage.getItem('token');
    const [profile, setProfile] = useState<IProfile>();
    const [updateProfile, setUpdateProfile] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
    });
    const [orders, setOrders] = useState<IOrderItem[]>([]);
    const [constructions, setConstructions] = useState<IRentItem[]>([]);
    const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
    const [becomeLandlordDisabled, setBecomeLandlordDisabled] = useState(true);
    const [addRentDisabled, setAddRentDisabled] = useState(true);

    useEffect(() => {
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
                setUpdateProfile({
                    userId: items.id,
                    firstName: items.firstName,
                    lastName: items.lastName,
                    phoneNumber: items.phoneNumber,
                });

                if(items.role == 'User'){
                    setBecomeLandlordDisabled(false);
                    setAddRentDisabled(true);
                }
                else if(items.role == 'Landlord'){
                    setBecomeLandlordDisabled(true);
                    setAddRentDisabled(false);
                }

                fetch(getUserOrders(host, items.id!), {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(items => {
                    setOrders(items.orders);
                })

                fetch(getUserConstructions(host, items.id!), {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(items => {
                    setConstructions(items.constructions);
                })
            })
    }, [])

    const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateProfile(prev => ({...prev, firstName: event.target.value}))
        setUpdateButtonDisabled(false)
    }
    
    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateProfile(prev => ({...prev, lastName: event.target.value}))
        setUpdateButtonDisabled(false)
    }
    
    const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateProfile(prev => ({...prev, phoneNumber: event.target.value}))
        setUpdateButtonDisabled(false)
    }

    const updateProfileHandler = () => {
        fetch(updateUser(host, profile!.id), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updateProfile)
        })
        .then(response => {
            if(response.status == 200){
                setUpdateButtonDisabled(true);
            }
        })
    }

    const becomeLandlordHandler = () => {
        fetch(createApplication(host, profile!.id), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.status == 200){
                setBecomeLandlordDisabled(true);
            }
        })
    }

    return (
        <div style={{height: '100%', display: 'flex'}}>
            <div style={{width: '35vw'}}>
                <Typography component="h2" sx={{mb: 1}}>
                    Мои заказы
                </Typography>
                <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '800px'}}>
                    <Orders orders={orders}/>
                </div>
                
            </div>
            <div style={{width: '35vw'}}>
                <Typography component="h2" sx={{mb: 1}}>
                    Мои помещения
                </Typography>
                <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '800px'}}>
                    <Posts posts={constructions}/>
                </div>
                
            </div>
            <div style={{width: '26vw', display: 'flex', marginLeft: "10px", marginRight: "10px", flexDirection: 'column', alignItems: 'start'}}>
            <Box sx={{ml: 4}}>
                <Typography component="h2" sx={{mb: 1}}>
                    Личные данные
                </Typography>
                <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{ shrink: true }} 
                    sx={{mr: 2, mt: 2}} 
                    value={updateProfile.firstName}
                    onChange={handleFirstName}
                    label="Имя" 
                    variant="outlined" 
                    size="small" />
                <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{ shrink: true }} 
                    sx={{mr: 2, mt: 2}}
                    value={updateProfile.lastName} 
                    onChange={handleLastName}
                    label="Фамилия" 
                    variant="outlined" 
                    size="small" />
                <br />
                <TextField 
                    id="outlined-basic" 
                    InputLabelProps={{ shrink: true }} 
                    sx={{mr: 2, mt: 2}} 
                    value={updateProfile.phoneNumber} 
                    onChange={handlePhoneNumber}
                    label="Номер телефона" 
                    variant="outlined" 
                    size="small" />
                <br />
                <Button 
                    variant="contained" 
                    sx={{mr: 2, mt: 2}}
                    color='success'
                    disabled={updateButtonDisabled}
                    onClick={updateProfileHandler}
                    >Обновить</Button>
            </Box>
            <Box sx={{mt: 5, ml: 4}}>
                <Button 
                    variant="contained" 
                    sx={{mt: 2}} 
                    disabled={becomeLandlordDisabled}
                    onClick={becomeLandlordHandler}
                    size="large">Стать арендодателем</Button>
                <br />
                <Link to='/new-post'>
                    <Button 
                        variant="contained" 
                        sx={{mt: 2}} 
                        size="large"
                        disabled={addRentDisabled}
                        >Добавить помещение</Button>
                </Link>
                
            </Box>
            </div>
        </div>  
    )
}

export default Profile