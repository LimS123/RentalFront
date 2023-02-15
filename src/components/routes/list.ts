import React from 'react'
import Applications from '../pages/applications/applications';
import Catalog from '../pages/catalog/catalog';
import CreateConstruction from '../pages/createConstructionForm/createConstruction';
import Home from '../pages/home/home';
import Post from '../pages/post/post';
import Profile from '../pages/profile/profile';
import SignIn from '../pages/signin/signin';
import SignUp from '../pages/signup/signup';
import UpdateConstruction from '../pages/updateConstuctionForm/updateConstruction';

export const routes = [
    {
        path: '/',
        element: Home,
        auth: false
    },
    {
        path: '/signin',
        element: SignIn,
        auth: false
    },
    {
        path: '/signup',
        element: SignUp,
        auth: false
    },
    {
        path: '/catalog',
        element: Catalog,
        auth: false
    },
    {
        path: '/applications',
        element: Applications,
        auth: true
    },
    {
        path: '/profile',
        element: Profile,
        auth: true
    },
    {
        path: '/catalog/:id',
        element: Post,
        auth: false
    },
    {
        path: '/new-post',
        element: CreateConstruction,
        auth: false
    },
    {
        path: '/update-post/:id',
        element: UpdateConstruction,
        auth: false
    },
]