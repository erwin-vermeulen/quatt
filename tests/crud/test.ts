import express, { Application } from 'express';
import request from 'supertest';
import { checkUserData, checkUserDetails, getUsers, getUserById, createUser, updateUserPutById } from '../../support/api-functions';
import { userPietje, userSinterklaas, userSinterklaasUpdated } from '../../data/user-data';
import { HttpBearerToken } from '../../token';

const app: Application = express();

describe('CRUD tests', () => {
    xtest('GET users per page and amount plus check the user details', async () => {
      const responseGetBody = await getUsers(1, 100);
      
      for (let i = 0, len:number = responseGetBody.length; i < len; i++) {
        checkUserDetails(responseGetBody[i]);
      }
    });

    xtest('CREATE new user and check if user is created', async () => {
      const responsePostBody = await createUser(userSinterklaas);
      const newUserId:number = responsePostBody.id;
      
      const responseGetBody = await getUserById(newUserId);
      checkUserDetails(responseGetBody);
      checkUserData(responseGetBody, userSinterklaas, newUserId);
    });

    test('CREATE a new user, then update the user with PUT and check if user is correctly updated', async () => {
      const responsePostBody = await createUser(userSinterklaas);
      const newUserId:number = responsePostBody.id;
      
      const responsePutBody = await updateUserPutById(newUserId, userSinterklaasUpdated);
      checkUserDetails(responsePutBody);
      checkUserData(responsePutBody, userSinterklaasUpdated, newUserId);

      // Extra check to check if I can fetch the updated data
      const responseGetBody = await getUserById(newUserId);
      checkUserDetails(responseGetBody);
      checkUserData(responseGetBody, userSinterklaasUpdated, newUserId);
    });
});