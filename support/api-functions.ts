import { UpdateUserDetails, UserDetails } from "../models";
import request from 'supertest';
import { BASEURL, HTTPBEARERTOKEN } from '../constants';
import 'jest-expect-message';

  export async function getUsers(page = 1, amountPerPage = 10): Promise<request> {
    // Maximum amout of results per page = 100
    if(amountPerPage > 100) {
        amountPerPage = 100;
    }
    const response = await request(BASEURL)
        .get('/users?page=' + page + '&per_page=' + amountPerPage +'')
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .expect("Content-Type", /json/)
        .expect(200);

    return response.body;
  }

  export async function getUserById(userId: number, status = 200): Promise<request> {
    const response = await request(BASEURL)
        .get('/users/' + userId)
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .expect("Content-Type", /json/)
        .expect(status);

    return response.body;
  }

  export async function createUser(user: UserDetails): Promise<request> {
    const response = await request(BASEURL)
        .post('/users')
        .set('Accept', 'application/json')
        .set('Content-Type' ,'application/json')
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .send({'name':user.name,'gender':user.gender,'email':user.email,'status':user.status})
        .expect("Content-Type", /json/)
        .expect(201);

    return response.body;
  }

  export async function updateUserPutById(userId: number, user: UserDetails): Promise<request> {
    const response = await request(BASEURL)
        .put('/users/' + userId)
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .send({'name':user.name,'gender':user.gender,'email':user.email,'status':user.status})
        .expect("Content-Type", /json/)
        .expect(200);

    return response.body;
  }

  export async function updateUserPatchById(userId:number, userDetailsBodyJson: UpdateUserDetails): Promise<request> {
    const response = await request(BASEURL)
        .patch('/users/' + userId)
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .send(userDetailsBodyJson)
        .expect("Content-Type", /json/)
        .expect(200);

    return response.body;
  }

  export async function deleteUserById(userId:number): Promise<void> {
    await request(BASEURL)
        .delete('/users/' + userId)
        .set('Content-Type', 'application/json')
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .expect(204);
  }