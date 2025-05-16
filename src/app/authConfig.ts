import {environment} from '../environment/environment';
import {AccountInfo, PublicClientApplication} from '@azure/msal-browser';

export const authConfig = {
  auth: {
    clientId: environment.clientId,
    authority: 'https://login.microsoftonline.com/' + environment.tenantId
  }
};

const data = {
  account: null as AccountInfo | null,
  msalInstance: new PublicClientApplication(authConfig),
  token: "",
  infoAuth: authConfig
}

export function useAuth(){
  //return data;
  return initializeApp();
}



export default function initializeApp(
  configService: ConfigService,
  msalService: MsalService
) {
  const config = configService.loadConfig();
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
  msalService.instance = new PublicClientApplication(msalConfig);

  return {
    account: null as AccountInfo | null,
    msalInstance: new PublicClientApplication(authConfig),
    token: ""
  }
}
