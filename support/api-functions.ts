import { UserDetails } from "../models";
import request from 'supertest';
import { HttpBearerToken } from '../token';
import 'jest-expect-message';


export function checkUserDetails(responseBody: UserDetails): void {
    const bodyLength:number = Object.keys(responseBody).length
    expect(bodyLength).toEqual(5);
    
    const userData: UserDetails = responseBody;
    expect(userData.id, 'ID cannot be empty for response body' + userData).not.toBeNull();
    expect(typeof userData.id, 'ID must be a number for user ID: ' + userData.id).toBe('number');
    expect(userData.name, 'Name cannot be empty for user ID: ' + userData.id).not.toBeNull();
    expect(typeof userData.name, 'Name must be a string for user ID: ' + userData.id).toBe('string');
    expect(userData.email, 'Email cannot be empty for user ID: ' + userData.id).not.toBeNull();
    expect(typeof userData.email, 'Email must be a string for user ID: ' + userData.id).toBe('string');
    expect(userData.email, 'Email must contain a @ for user ID: ' + userData.id).toContain('@');
    expect(userData.gender, 'Gender cannot be empty for user ID: ' + userData.id).not.toBeNull();
    expect(typeof userData.gender, 'Gender must be a string for user ID: ' + userData.id).toBe('string');
    expect(['male', 'female'], 'Unexpected gender value for user ID: ' + userData.id).toContain(userData.gender);
    expect(userData.status, 'Status cannot be empty for user ID: ' + userData.id).not.toBeNull();
    expect(typeof userData.status, 'Status must be a string for user ID: ' + userData.id).toBe('string');
    expect(['active', 'inactive'], 'Unexpected status value for user ID: ' + userData.id).toContain(userData.status);
  }

  export function checkUserData(responseBody: UserDetails, user: UserDetails, userId: number): void {
    const userData: UserDetails = responseBody;
    expect(userData.id).toEqual(userId);
    expect(userData.name).toEqual(user.name);
    expect(userData.email).toEqual(user.email);
    expect(userData.gender).toEqual(user.gender);
    expect(userData.status).toEqual(user.status);
  }

  export async function getUsers(page = 1, amountPerPage = 10): Promise<request> {
    // Maximum amout of results per page = 100
    if(amountPerPage > 100) {
        amountPerPage = 100;
    }
    const response = await request('https://gorest.co.in/public/v2')
        .get('/users?page=' + page + '&per_page=' + amountPerPage +'')
        .set('Authorization' ,'Bearer ' + HttpBearerToken)
        .expect("Content-Type", /json/);
      expect(response.status).toEqual(200);

    return response.body;
  }

  export async function getUserById(userId: number): Promise<request> {
    const response = await request('https://gorest.co.in/public/v2')
        .get('/users/' + userId)
        .set('Authorization' ,'Bearer ' + HttpBearerToken)
        .expect("Content-Type", /json/);
      expect(response.status).toEqual(200);

    return response.body;
  }

  export async function createUser(user: UserDetails): Promise<request> {
    const response = await request('https://gorest.co.in/public/v2')
        .post('/users')
        .set('Accept', 'application/json')
        .set('Content-Type' ,'application/json')
        .set('Authorization' ,'Bearer ' + HttpBearerToken)
        .send({'name':user.name,'gender':user.gender,'email':user.email,'status':user.status})
        .expect("Content-Type", /json/)
        .expect(201);

    return response.body;
  }

  export async function updateUserPutById(userId: number, user: UserDetails): Promise<request> {
    const response = await request('https://gorest.co.in/public/v2')
        .put('/users/' + userId)
        .set('Authorization' ,'Bearer ' + HttpBearerToken)
        .send({'name':user.name,'gender':user.gender,'email':user.email,'status':user.status})
        .expect("Content-Type", /json/)
        .expect(200);
    expect(response.status).toEqual(200);

    return response.body;
  }