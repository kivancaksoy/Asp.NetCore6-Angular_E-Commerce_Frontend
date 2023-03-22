import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationEndpointService {
  constructor(private httpClientService: HttpClientService) {}

  async assignRoleEndpoint(
    roles: string[],
    code: string,
    menu: string,
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'authorizationendpoints',
      },
      {
        roles: roles,
        code: code,
        menu: menu,
      }
    );

    const promiseData = observable.subscribe({
      next: successCallBack,
      error: errorCallBack,
    });

    await promiseData;
  }

  async getRolesToEndpoint(
    code: string,
    menu: string,
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ): Promise<string[]> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'authorizationendpoints',
        action: 'get-roles-to-endpoint',
      },
      { code: code, menu: menu }
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);

    return (await promiseData).roles;
  }
}
