import 'jest-expect-message';
import request from 'supertest';
import { UserDetails } from "../models";
import { BASEURL, HTTPBEARERTOKEN } from '../constants';
import { generateUsersJsonParams, generateUsersQueryParams } from "./helpers-functions";

/**
  * Get users by page and amount
  *
  *  @param  {Number}   page           the page you want to see the results of. Default is page 1
  *  @param  {Number}   amountPerPage  amount of results per page. Default is 10. Maximum is 100
  *  @param  {Number}   status         default response status is 200
  */
  export async function getUsers(page:number = 1, amountPerPage:number = 10, status:number = 200): Promise<request> {
    // Maximum amount of results per page = 100
    if(amountPerPage > 100) {
        amountPerPage = 100;
    }
    const response = await request(BASEURL)
        .get('/users?page=' + page + '&per_page=' + amountPerPage +'')
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .expect("Content-Type", /json/)
        .expect(status);

    return response.body;
  }

  /**
  * Get users by specific params
  *
  *  @param  {String}   queryParams  can only have 'name', 'email', 'gender' and 'status'. Example: 'name=Sinterklaas,gender=male,status=active'
  *  @param  {Number}   status       default response status is 200
  */
  export async function getUsersByQueryParams(queryParams: string, status:number = 200): Promise<request> {
    const urlQueryParams = generateUsersQueryParams(queryParams);
    const response = await request(BASEURL)
        .get('/users' + urlQueryParams)
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .expect("Content-Type", /json/)
        .expect(status);

    return response.body;
  }

  /**
  * Get user by ID
  *
  * @param  {Number}   userId  The user ID of the user
  * @param  {Number}   status  default response status is 200
  */
  export async function getUserById(userId: number, status:number = 200): Promise<request> {
    const response = await request(BASEURL)
        .get('/users/' + userId)
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .expect("Content-Type", /json/)
        .expect(status);

    return response.body;
  }

  /**
  * Create user function using test data
  *
  *  @param  {UserDetails}  user    you can choose any user that is created in the 'user-data.ts' file
  *  @param  {Number}       status  default response status is 201
  */
  export async function createUserUsingData(user: UserDetails, status:number = 201): Promise<request> {
    const response = await request(BASEURL)
        .post('/users')
        .set('Accept', 'application/json')
        .set('Content-Type' ,'application/json')
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .send({'name':user.name,'gender':user.gender,'email':user.email,'status':user.status})
        .expect("Content-Type", /json/)
        .expect(status);

    return response.body;
  }

  /**
  * Create user function using params
  *
  * @param  {String}   queryParams  can only have 'name', 'email', 'gender' and 'status'. Example: 'name=Sinterklaas,gender=male,status=active'
  * @param  {Number}   status       default response status is 201
  */
  export async function createUserUsingParams(queryParams: string, status: number = 201): Promise<request> {
    const userDetailsBodyJson = generateUsersJsonParams(queryParams);
    const response = await request(BASEURL)
        .post('/users')
        .set('Accept', 'application/json')
        .set('Content-Type' ,'application/json')
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .send(userDetailsBodyJson)
        .expect("Content-Type", /json/)
        .expect(status);

    return response.body;
  }

  /**
  * Update user PUT function by ID
  *
  * @param  {Number}      userId  The user ID of the users'
  * @param  {UserDetails} user    you can choose any user that is created in the 'user-data.ts' file
  * @param  {Number}      status  default response status is 200
  */
  export async function updateUserPutById(userId: number, user: UserDetails, status:number = 200): Promise<request> {
    const response = await request(BASEURL)
        .put('/users/' + userId)
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .send({'name':user.name,'gender':user.gender,'email':user.email,'status':user.status})
        .expect("Content-Type", /json/)
        .expect(status);

    return response.body;
  }

  /**
  * Update user PATCH function by ID
  *
  * @param  {Number}   userId       The user ID of the users'
  * @param  {String}   queryParams  can only have 'name', 'email', 'gender' and 'status'. Example: 'name=Sinterklaas,gender=male,status=active'
  * @param  {Number}   status       default response status is 200
  */
  export async function updateUserPatchById(userId:number, queryParams: string, status:number = 200): Promise<request> {
    const userDetailsBodyJson = generateUsersJsonParams(queryParams);
    const response = await request(BASEURL)
        .patch('/users/' + userId)
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .send(userDetailsBodyJson)
        .expect("Content-Type", /json/)
        .expect(status);

    return response.body;
  }

  /**
  * Delete user function by ID
  *
  * @param  {Number}   userId   The user ID of the users'
  * @param  {Number}   status   default response status is 204
  */
  export async function deleteUserById(userId:number, status:number = 204): Promise<request> {
    const response = await request(BASEURL)
        .delete('/users/' + userId)
        .set('Content-Type', 'application/json')
        .set('Authorization' ,'Bearer ' + HTTPBEARERTOKEN)
        .expect(status);
      return response.body;
  }