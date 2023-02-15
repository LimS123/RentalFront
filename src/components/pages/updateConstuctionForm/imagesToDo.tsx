import { Box, Button, CardMedia } from '@mui/material'
import React, { FC, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { IImage, IRentItem } from '../../../types'

interface IImages {
    images: undefined | IImage[],
    setImages: React.Dispatch<React.SetStateAction<IRentItem>>
}

const ImagesToDo: FC<IImages> = ({images, setImages}) => {

    return (
        <div>
            {images?.map((image, index) => (
            <Box sx={{mt: 3, mb: 3}}>
                <CardMedia
                    key={index}
                    component="img"
                    image={image.dataInBase64}
                    alt="Paella dish"
                />
                <Button variant="outlined" color='error' onClick={() => {const newTodos = images.filter((_, i) => i !== index);setImages(prev => ({...prev, images: newTodos}));}} startIcon={<DeleteIcon />}>
                    Удалить
                </Button>
            </Box>
                
            ))}
        </div>
    )
}

export default ImagesToDo