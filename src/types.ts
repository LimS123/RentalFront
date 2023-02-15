import { Dispatch, SetStateAction } from 'react'

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface ICatalog {
    setRentItems: TypeSetState<IRentItem[]>
}

export interface IRentItem {
    id: string;
    userId: string;
    phoneNumber: string;
    price: number;
    createdAtUtc: Date;
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
    images: IImage[]
}

export interface IImage {
    id: string;
    dataInBase64: string;
}

export interface IOrderItem {
    id: string,
    startedAtUtc: string,
    endedAtUtc: string,
    constructionId: string
}

export interface IProfile {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: string
}