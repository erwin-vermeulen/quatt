import { PartialUserDetails, UserDetails } from '../models';

export const existingUserSinterklaas: UserDetails = {
    id: 7565486,
    name: 'Sinterklaas',
    email: 'sinterklaas136996066705@yopmail.com',
    gender: 'male',
    status: 'active'
}

export const incorrectIdUserSinterklaas: UserDetails = {
    id: 11,
    name: 'Sinterklaas',
    email: 'sinterklaas136996066705@yopmail.com',
    gender: 'male',
    status: 'active'
}

export const incorrectBodyUserSinterklaas: PartialUserDetails = {
    name: 'Sinterklaas',
    email: 'sinterklaas136996066705@yopmail.com',
    status: 'active'
}

export const userSinterklaas: UserDetails = {
    name: 'Sinterklaas',
    email: 'sinterklaas' + (Math.floor(Math.random() * 100000000000) + 99999999999) + '@yopmail.com',
    gender: 'male',
    status: 'active'
}

export const userPietje: UserDetails = {
    name: 'Pietje',
    email: 'Pietje' + (Math.floor(Math.random() * 100000000000) + 99999999999) + '@yopmail.com',
    gender: 'female',
    status: 'active'
}

export const userPietjeUpdated: UserDetails = {
    name: 'Pietje UPDATED',
    email: 'Pietje' + (Math.floor(Math.random() * 100000000000) + 99999999999) + '@yopmail.com',
    gender: 'male',
    status: 'inactive'
}

export const userKerstman: UserDetails = {
    name: 'Kerstman',
    email: 'Kerstman' + (Math.floor(Math.random() * 100000000000) + 99999999999) + '@yopmail.com',
    gender: 'male',
    status: 'active'
}

export const userRudolph: UserDetails = {
    name: 'Rudolph',
    email: 'Rudolph' + (Math.floor(Math.random() * 100000000000) + 99999999999) + '@yopmail.com',
    gender: 'male',
    status: 'active'
}

export const userVixen: UserDetails = {
    name: 'Vixen',
    email: 'Vixen' + (Math.floor(Math.random() * 100000000000) + 99999999999) + '@yopmail.com',
    gender: 'female',
    status: 'active'
}


export const userPartialQuerySinterklaas: string = 'name=Sinterklaas,gender=male,status=active';
export const userPartialQueryPieterbaas: string = 'name=Pieterbaas';
export const userPartialQueryRudolph: string = 'name=Rudolph';