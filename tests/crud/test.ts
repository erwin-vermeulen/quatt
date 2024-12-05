import express, { Application } from 'express';
import { getUsers, getUserById, createUserUsingData, updateUserPutById, updateUserPatchById, deleteUserById, getUsersByQueryParams, createUserUsingParams } from '../../support/api-functions';
import { existingUserSinterklaas, incorrectIdUserSinterklaas, userKerstman, userPietje, userPietjeUpdated, userPartialQuerySinterklaas,userSinterklaas, userPartialQueryPieterbaas, userRudolph } from '../../data/user-data';
import { checkUserData, checkUserDataForUser, checkUserDetails } from '../../support/assertion-checks';

const app: Application = express();

describe('CRUD tests', () => {
  describe('GET tests', () => {
    test('GET users per page and amount plus check the user details', async () => {
      const responseGetBody = await getUsers(1, 100);
      
      for (let i = 0, len:number = responseGetBody.length; i < len; i++) {
        checkUserDetails(responseGetBody[i]);
      }
    });

    test('GET users using query parameters plus check the user details', async () => {
      const responseGetBody = await getUsersByQueryParams(userPartialQuerySinterklaas);

      if(responseGetBody.length == 0) {
        expect(responseGetBody.length, 'Expected to see results, but no results are found').toBeGreaterThan(0);
      } else {
        for (let i = 0, len:number = responseGetBody.length; i < len; i++) {
          checkUserDetails(responseGetBody[i]);
        }
      }
    });

    test('GET user using ID', async () => {
      const responseGetBody = await getUserById(existingUserSinterklaas.id);
      checkUserDetails(responseGetBody);
      checkUserDataForUser(responseGetBody, existingUserSinterklaas, existingUserSinterklaas.id);
    });

    test('GET user using incorrect ID', async () => {
      const responseGetBody = await getUserById(incorrectIdUserSinterklaas.id, 404);
      expect(responseGetBody).toEqual({'message': 'Resource not found'});
    });
  });

  describe('CREATE tests', () => {
    test('CREATE new user and check if user is created', async () => {
      const responsePostBody = await createUserUsingData(userSinterklaas);
      const newUserId:number = responsePostBody.id;
      
      const responseGetBody = await getUserById(newUserId);
      checkUserDetails(responseGetBody);
      checkUserDataForUser(responseGetBody, userSinterklaas, newUserId);
    });

    test('CREATE new user using incorrect body', async () => {
      const responsePostBody = await createUserUsingParams(userPartialQuerySinterklaas, 422);
      expect(responsePostBody).toEqual([{"field": "email", "message": "can't be blank"}]);
    });
  });

  describe('UPDATE tests', () => {
    test('Create a new user, then UPDATE the user with PUT and check if user is correctly updated', async () => {
      const responsePostBody = await createUserUsingData(userPietje);
      const newUserId:number = responsePostBody.id;
      
      const responsePutBody = await updateUserPutById(newUserId, userPietjeUpdated);
      checkUserDetails(responsePutBody);
      checkUserDataForUser(responsePutBody, userPietjeUpdated, newUserId);

      // Extra check to check if I can fetch the updated data
      const responseGetBody = await getUserById(newUserId);
      checkUserDetails(responseGetBody);
      checkUserDataForUser(responseGetBody, userPietjeUpdated, newUserId);
    });

    test('Try to UPDATE a non existing user with PUT', async () => {
      const responsePutBody = await updateUserPutById(11, userPietjeUpdated, 404);
      expect(responsePutBody).toEqual({'message': 'Resource not found'});
    });

    test('Create a new user, then UPDATE the user with PATCH and check if user is correctly updated', async () => {
      const responsePostBody = await createUserUsingData(userKerstman);
      const newUserId:number = responsePostBody.id;
      
      const responsePatchBody = await updateUserPatchById(newUserId, userPartialQueryPieterbaas);
      checkUserDetails(responsePatchBody);
      checkUserData(responsePatchBody, newUserId, 'Pieterbaas', userKerstman.email, userKerstman.gender, userKerstman.status);

      // Extra check to check if I can fetch the updated data
      const responseGetBody = await getUserById(newUserId);
      checkUserDetails(responseGetBody);
      checkUserData(responseGetBody, newUserId, 'Pieterbaas', userKerstman.email, userKerstman.gender, userKerstman.status);
    });

    test('Try to UPDATE a non existing user with PATCH', async () => {
      const responsePatchBody = await updateUserPatchById(11, userPartialQueryPieterbaas, 404);
      expect(responsePatchBody).toEqual({'message': 'Resource not found'});
    });
  });

  describe('DELETE tests', () => {
    test('Create a new user, then delete the user with DELETE and check if user is correctly deleted', async () => {
      const responsePostBody = await createUserUsingData(userRudolph);
      const newUserId:number = responsePostBody.id;
      
      await deleteUserById(newUserId);

      const responseGetBody = await getUserById(newUserId, 404);
      expect(responseGetBody).toEqual({'message': 'Resource not found'});
    });

    test('Try to DELETE a user that does not exist', async () => {
      const responseBodyDelete = await deleteUserById(11, 404);
      expect(responseBodyDelete).toEqual({'message': 'Resource not found'});
    });
  });
});