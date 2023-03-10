import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { Box, Button, CardMedia, FormControl, FormControlLabel, IconButton, InputLabel, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import React, { FC, useEffect, useState } from 'react';
import { createConstruction, host } from '../../../http-routes';
import { useNavigate } from 'react-router-dom';

interface IPost {
    price: number;
    name: string;
    region: string;
    city: string;
    street: string;
    houseNumber: string;
    type: string;
    square: number;
    year: number;
    description: string;
    numberOfRooms: number;
    floor: number;
}

const CreateConstruction: FC = () => {
    
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [images, setImages] = useState<ImageType[]>([]);
  const [post, setPost] = useState<IPost>({
    price: 0,
    name: "",
    region: "",
    city: "",
    street: "",
    houseNumber: "",
    type: "",
    square: 0,
    year: 0,
    description: "",
    numberOfRooms: 0,
    floor: 0
  });
  const maxNumber = 9;

  const handleSubmitPost = () => {
    const form = new FormData();

    form.append('price', post.price.toString());
    form.append('name', post.name);
    form.append('region', post.region);
    form.append('city', post.city);
    form.append('street', post.street);
    form.append('houseNumber', post.houseNumber);
    form.append('type', post.type);
    form.append('square', post.square.toString());
    form.append('year', post.year.toString());
    form.append('description', post.description);
    form.append('numberOfRooms', post.numberOfRooms.toString());
    form.append('floor', post.floor.toString());

    console.log(images);

    images.map(image => {
      form.append('images', image.file as Blob);
    })

    fetch(createConstruction(host), {
      method: "POST",
      headers: {
          Accept: 'application/json',
          ContentType: 'application/json; charset=utf8',
          Authorization: `Bearer ${token}`
      },
      body: form
    })
    .then(response => {
      if(response.status == 200){
        navigate('/profile');
      }
    })
  }

  const handleImages = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as ImageType[]);
  };

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, price: event.target.valueAsNumber}))
  }

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, name: event.target.value}))
  }

  const handleRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, region: event.target.value}))
  }

  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, city: event.target.value}))
  }

  const handleStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, street: event.target.value}))
  }

  const handleHouseNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, houseNumber: event.target.value}))
  }

  const handleType = (event: SelectChangeEvent) => {
    setPost(prev => ({...prev, type: event.target.value}))
  }

  const handleSquare = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, square: event.target.valueAsNumber}))
  }

  const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, year: event.target.valueAsNumber}))
  }

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, description: event.target.value}))
  }

  const handleNumberOfRooms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, numberOfRooms: event.target.valueAsNumber}))
  }

  const handleFloor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({...prev, floor: event.target.valueAsNumber}))
  }

  return (
      <div style={{width: '90%', display: 'flex', margin: '100px 35px', alignItems: 'start', flexDirection: 'row'}}>
        <Box sx={{
          width: '25%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
            <b>??????</b>
          </Typography>
          <TextField 
              id="outlined-basic" 
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}} 
              value={post.name}
              onChange={handleName}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>????????</b>
          </Typography>
          <TextField 
              id="outlined-basic" 
              inputProps={{ type: 'number', min: 0, max: 10000}}
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}} 
              value={post.price}
              onChange={handlePrice}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>????????????</b>
          </Typography>
          <TextField 
              id="outlined-basic" 
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}} 
              value={post.region}
              onChange={handleRegion}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>??????????</b>
          </Typography>
          <TextField 
              id="outlined-basic" 
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}}  
              value={post.city}
              onChange={handleCity}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>??????????</b>
          </Typography>
          <TextField 
              id="outlined-basic" 
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}}
              value={post.street}
              onChange={handleStreet}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>?????????? ????????</b>
          </Typography>
          <TextField 
              id="outlined-basic" 
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}}
              value={post.houseNumber}
              onChange={handleHouseNumber}
              variant="outlined" 
              size="small" />
          <FormControl fullWidth>
            <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
              <b>?????? ??????????????????</b>
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              sx={{mr: 2}}
              value={post.type}
              onChange={handleType}
            >
              <MenuItem value="Room">??????????????</MenuItem>
              <MenuItem value="Apartment">????????????????</MenuItem>
              <MenuItem value="House">??????</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>?????????????? ??????????????????</b>
          </Typography>
            <TextField 
              id="outlined-basic" 
              inputProps={{ type: 'number', min: 0, max: 10000}}
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}}
              value={post.square}
              onChange={handleSquare}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>?????? ??????????????????</b>
          </Typography>
            <TextField 
              id="outlined-basic" 
              inputProps={{ type: 'number', min: 1000, max: 2023}}
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}} 
              value={post.year}
              onChange={handleYear}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>???????????????????? ????????????</b>
          </Typography>
            <TextField 
              id="outlined-basic" 
              inputProps={{ type: 'number', min: 0, max: 10}}
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}} 
              value={post.numberOfRooms}
              onChange={handleNumberOfRooms}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>????????</b>
          </Typography>
            <TextField 
              id="outlined-basic" 
              inputProps={{ type: 'number', min: 0, max: 200}}
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}} 
              value={post.floor}
              onChange={handleFloor}
              variant="outlined" 
              size="small" />
          <Typography sx={{ fontSize: 14, mt:1}} color="text.secondary" gutterBottom>
            <b>????????????????</b>
          </Typography>
            <TextField 
              id="outlined-basic" 
              multiline
              rows={10}
              InputLabelProps={{ shrink: true }} 
              sx={{mr: 2}} 
              value={post.description}
              onChange={handleDescription}
              variant="outlined" 
              size="small" />
        </Box>
        <Box sx={{
          width: '40%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <ImageUploading
            multiple
            value={images}
            onChange={handleImages}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps
            }) => (
              <div style={{margin: '26px'}}>
                <Button
                  sx={{mr: 1}}
                  variant="contained"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>
                <Button variant="contained" color="error" onClick={onImageRemoveAll}>Remove all images</Button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <CardMedia component='img' sx={{margin: 1}} image={image.dataURL} width="250" />
                    <div className="image-item__btn-wrapper">
                      <Button variant="contained" size='small' sx={{mr: 1}} onClick={() => onImageUpdate(index)}>Update</Button>
                      <Button variant="contained" size='small' onClick={() => onImageRemove(index)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Box>
        <Button variant="contained" sx={{mt:3, ml: 10}} color="success" endIcon={<SendIcon />} onClick={handleSubmitPost}>??????????????</Button>
      </div>
  );
}

export default CreateConstruction
