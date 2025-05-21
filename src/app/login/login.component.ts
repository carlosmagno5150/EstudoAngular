import {Component, OnInit} from '@angular/core';
import {AuthViewComponent} from "../security/auth-view/auth-view.component";
import {authConfig, initializeApp, TData, useAuth} from '../authConfig';
import {AccountInfo, AuthenticationResult, PublicClientApplication} from '@azure/msal-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
    imports: [

    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //readonly authConfig = useAuth();
  authConfig!: TData;

  constructor(private router: Router) { }

  async ngOnInit() {

    const initFn = initializeApp();
    const result = await initFn();

    this.authConfig = result;

    await result.msalInstance.initialize();

    result.msalInstance.handleRedirectPromise().then(async (authResult: AuthenticationResult | null) => {
      const accounts = result.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        result.account = accounts[0];
        const response = result.msalInstance.acquireTokenSilent({
          account: result.account,
          scopes: ["api://8949d550-d3a8-42c3-9e95-a95f04bdab1e/API.Read"]
        })
        result.token = (await response).accessToken;
        //await this.router.navigateByUrl("/home");
      }
    });

    // await this.authConfig.msalInstance.initialize();
    //
    // this.authConfig.msalInstance.handleRedirectPromise().then(async (authResult: AuthenticationResult | null) => {
    //   const accounts = this.authConfig.msalInstance.getAllAccounts();
    //   if (accounts.length > 0) {
    //     this.authConfig.account = accounts[0];
    //     const response = this.authConfig.msalInstance.acquireTokenSilent({
    //       account: this.authConfig.account,
    //       scopes: ["api://8949d550-d3a8-42c3-9e95-a95f04bdab1e/API.Read"]
    //     })
    //     this.authConfig.token = (await response).accessToken;
    //     //await this.router.navigateByUrl("/home");
    //   }
    // });
  }



  async login(){
    console.log("login");
    await this.authConfig.msalInstance.loginRedirect();
  }

  logout(){
    this.authConfig.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin
    })
  }

}
