import React, { FC, useState } from 'react'
import { IRentItem } from '../../types'
import RentItem from '../rentItem/rentitem'

interface IPosts {
    posts: IRentItem[]
}

const Posts: FC<IPosts> = ({posts}) => {

    return (
        <div style={{display: 'flex', width: '35vw', alignItems: 'center', flexDirection: "column"}}>
            {posts.map((post, index) => (
                <RentItem key={index} post={post} />
            ))}
        </div>
    )
}

export default Posts