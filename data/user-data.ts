import { UserDetails } from '../models';

export const userSinterklaas: UserDetails = {
    name: "Sinterklaas",
    email: "sinterklaas" + (Math.floor(Math.random() * 100000000000) + 99999999999) + "@yopmail.com",
    gender: "male",
    status: "active"
}

export const userSinterklaasUpdated: UserDetails = {
    name: "Sinterklaas UPDATED",
    email: "sinterklaas" + (Math.floor(Math.random() * 100000000000) + 99999999999) + "@yopmail.com",
    gender: "female",
    status: "inactive"
}

export const userPietje: UserDetails = {
    name: "Pietje",
    email: "Pietje" + (Math.floor(Math.random() * 100000000000) + 99999999999) + "@yopmail.com",
    gender: "female",
    status: "active"
}