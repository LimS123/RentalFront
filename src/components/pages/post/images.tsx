import { Box, CardMedia } from '@mui/material'
import React, { FC, useState } from 'react'
import { IImage } from '../../../types'

interface IImages {
    images: undefined | IImage[]
}

const Images: FC<IImages> = ({images}) => {

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
            </Box>
                
            ))}
        </div>
    )
}

export default Images