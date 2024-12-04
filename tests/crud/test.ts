import express, { Application } from 'express';
import { getUsers, getUserById, createUser, updateUserPutById, updateUserPatchById, deleteUserById } from '../../support/api-functions';
import { userKerstman, userPietje, userPietjeUpdated, userRudolph, userSinterklaas } from '../../data/user-data';
import { checkUserData, checkUserDataForUser, checkUserDetails } from '../../support/assertion-checks';

const app: Application = express();

describe('CRUD tests', () => {
    test('GET users per page and amount plus check the user details', async () => {
      const responseGetBody = await getUsers(1, 100);
      
      for (let i = 0, len:number = responseGetBody.length; i < len; i++) {
        checkUserDetails(responseGetBody[i]);
      }
    });

    test('CREATE new user and check if user is created', async () => {
      const responsePostBody = await createUser(userSinterklaas);
      const newUserId:number = responsePostBody.id;
      
      const responseGetBody = await getUserById(newUserId);
      checkUserDetails(responseGetBody);
      checkUserDataForUser(responseGetBody, userSinterklaas, newUserId);
    });

    test('CREATE a new user, then update the user with PUT and check if user is correctly updated', async () => {
      const responsePostBody = await createUser(userPietje);
      const newUserId:number = responsePostBody.id;
      
      const responsePutBody = await updateUserPutById(newUserId, userPietjeUpdated);
      checkUserDetails(responsePutBody);
      checkUserDataForUser(responsePutBody, userPietjeUpdated, newUserId);

      // Extra check to check if I can fetch the updated data
      const responseGetBody = await getUserById(newUserId);
      checkUserDetails(responseGetBody);
      checkUserDataForUser(responseGetBody, userPietjeUpdated, newUserId);
    });

    test('CREATE a new user, then update the user with PATCH and check if user is correctly updated', async () => {
      const responsePostBody = await createUser(userKerstman);
      const newUserId:number = responsePostBody.id;
      
      const responsePatchBody = await updateUserPatchById(newUserId, {name:'Pieterbaas'});
      checkUserDetails(responsePatchBody);
      checkUserData(responsePatchBody, newUserId, 'Pieterbaas', userKerstman.email, userKerstman.gender, userKerstman.status);

      // Extra check to check if I can fetch the updated data
      const responseGetBody = await getUserById(newUserId);
      checkUserDetails(responseGetBody);
      checkUserData(responseGetBody, newUserId, 'Pieterbaas', userKerstman.email, userKerstman.gender, userKerstman.status);
    });

    test('CREATE a new user, then delete the user with DELETE and check if user is correctly deleted', async () => {
      const responsePostBody = await createUser(userRudolph);
      const newUserId:number = responsePostBody.id;
      
      await deleteUserById(newUserId);

      const responseGetBody = await getUserById(newUserId, 404);
      expect(responseGetBody).toEqual({"message": "Resource not found"});
    });
});