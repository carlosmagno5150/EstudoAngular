import {environment} from '../environment/environment';
import {AccountInfo, BrowserCacheLocation, Configuration, PublicClientApplication} from '@azure/msal-browser';
import { AppConfig, ConfigService } from './service/config.service';
import { MsalService } from '@azure/msal-angular';
import { inject } from '@angular/core';
import { appConfig } from './app.config';
import { firstValueFrom } from 'rxjs';


export const authConfig = {
  auth: {
    clientId: environment.clientId,
    authority: 'https://login.microsoftonline.com/' + environment.tenantId
  }
};

export interface TData {
  account: AccountInfo | null;
  msalInstance: PublicClientApplication;
  token: string;
}

// export const data = {
//   account: null as AccountInfo | null,
//   msalInstance: new PublicClientApplication(authConfig),
//   token: "",
//   infoAuth: authConfig
// }

export function useAuth(){
  // return data;
  return initializeApp();
}



// export function initializeApp(
//   configService: ConfigService,
//   msalService: MsalService
// ) {
//   const config = configService.loadConfig();
//   const msalConfig: Configuration = {
//     auth: {
//       clientId: config.clientI,
//       authority: config.authority,
//       redirectUri: window.location.origin,
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage,
//       storeAuthStateInCookie: false,
//     },
//   };
//   msalService.instance = new PublicClientApplication(msalConfig);

//   return {
//     account: null as AccountInfo | null,
//     msalInstance: new PublicClientApplication(authConfig),
//     token: ""
//   }
// }


export function initializeApp(): () => Promise<TData> {
  return async () => {
    const configService = inject(ConfigService);
    const msalService = inject(MsalService);

    const config = await firstValueFrom(configService.loadConfig());

    const msalConfig: Configuration = {
      auth: {
        clientId: config.clientId,
        authority: config.authority,
        redirectUri: window.location.origin,
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: false,
      },
    };

    const msalInstance = new PublicClientApplication(msalConfig);
    msalService.instance = msalInstance;

    return {
      account: null,
      msalInstance,
      token: "",
    };
  };
}
