import { UserDetails } from "../models";

/**
* Function to check if the user has the correct user details
*
* @param  {UserDetails}   responseBody   The response body containing user data
*/
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

  /**
  * Function to compare the response body data with test data
  * 
  * @param  {UserDetails}   responseBody   The response body containing user data
  * @param  {UserDetails}   user           You can choose any user that is created in the 'user-data.ts' file
  * @param  {Number}        userId         The user ID of the user
  */
  export function checkUserDataForUser(responseBody: UserDetails, user: UserDetails, userId: number): void {
    const userData: UserDetails = responseBody;
    expect(userData.id).toEqual(userId);
    expect(userData.name).toEqual(user.name);
    expect(userData.email).toEqual(user.email);
    expect(userData.gender).toEqual(user.gender);
    expect(userData.status).toEqual(user.status);
  }

  /**
  * Function to compare the response body data with any given test data
  * 
  * @param  {UserDetails}   responseBody   The response body containing user data
  * @param  {Number}        userId         The user ID of the user
  * @param  {String}        name           The name of the user
  * @param  {String}        userId         The email of the user
  * @param  {String}        userId         The gender of the user. Can only be male of female
  * @param  {String}        userId         The status of the user. Can only be active or inactive
  */
  export function checkUserData(responseBody: UserDetails, userId: number, name: string, email: string, gender: 'male' | 'female', status: 'active' | 'inactive'): void {
    const userData: UserDetails = responseBody;
    expect(userData.id).toEqual(userId);
    expect(userData.name).toEqual(name);
    expect(userData.email).toEqual(email);
    expect(userData.gender).toEqual(gender);
    expect(userData.status).toEqual(status);
  }