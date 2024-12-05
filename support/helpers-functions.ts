import { USER_QUERY_PARAMS } from "../constants";
import { PartialUserDetails } from "../models";

  /**
   * Generate query params for GET
   *
   * @param  {String}   params  can only have 'name', 'email', 'gender' and 'status'. Example: 'name=Sinterklaas,gender=male,status=active'
   */
  export function generateUsersQueryParams(params: string): string {
    let paramsUrl: string = '?';
    const paramsArray: string[] = params.split(',');

    for (let i = 0, len:number = paramsArray.length; i < len; i++) {
        const queryParam = paramsArray[i].substring(0, paramsArray[i].indexOf('='));
        if(USER_QUERY_PARAMS.indexOf(queryParam) > -1) {
          paramsUrl = paramsUrl + paramsArray[i];
        } else {
          expect(paramsArray[i], 'Incorrect parameter given. Please use one of the params in the expected value').toEqual('name OR email OR gender OR status');
        }

        if(i < paramsArray.length - 1) {
          paramsUrl = paramsUrl + '&';
        }
      }

    return paramsUrl;
  }

  /**
   * Generate a JSON body for POST and PTACH
   *
   * @param  {String}   params  can only have 'name', 'email', 'gender' and 'status'. Example: 'name=Sinterklaas,gender=male,status=active'
   */
  export function generateUsersJsonParams(params: string): PartialUserDetails {
    const paramsJson: PartialUserDetails = {};
    const paramsArray: string[] = params.split(',');

    for (let i = 0, len: number = paramsArray.length; i < len; i++) {
        const queryParam: string = paramsArray[i].substring(0, paramsArray[i].indexOf('='));
        const paramValue: string = paramsArray[i].substring(paramsArray[i].indexOf('=') + 1);

        if(USER_QUERY_PARAMS.indexOf(queryParam) > -1) {
          paramsJson[queryParam] = paramValue;
        } else {
          expect(paramsArray[i], 'Incorrect parameter given. Please use one of the params in the expected value').toEqual('name OR email OR gender OR status');
        }
      }

    return paramsJson;
  }