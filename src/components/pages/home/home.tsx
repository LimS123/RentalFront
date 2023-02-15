import React, { FC, useEffect, useState } from 'react'
import { ICatalog, IRentItem } from '../../../types'
import Posts from '../../posts/posts'
import {host, getConstructions} from '../../../http-routes'

const Home: FC = () => {
    const [posts, setPosts] = useState<IRentItem[]>([])

    useEffect(() => {
        fetch(getConstructions(host, 1, 10), {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(items => {
                setPosts(items.constructions);
            })
    }, [])

    return (
        <div style={{height: '100%', display: 'flex'}}>
            <div style={{width: '30%'}}>
                
            </div>
            <Posts posts={posts} />
            <div style={{width: '30%'}}>
                
            </div>
        </div>  
    )
}

export default Home