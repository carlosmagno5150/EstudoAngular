import { Component } from '@angular/core';
import {AuthViewComponent} from "../security/auth-view/auth-view.component";
import {useAuth} from '../authConfig';
import {AuthenticationResult} from '@azure/msal-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
    imports: [
        AuthViewComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  readonly authConfig = useAuth();

  constructor(private router: Router) { }

  async ngOnInit() {
    await this.authConfig.msalInstance.initialize();

    this.authConfig.msalInstance.handleRedirectPromise().then(async (authResult: AuthenticationResult | null) => {
      const accounts = this.authConfig.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        this.authConfig.account = accounts[0];
        const response = this.authConfig.msalInstance.acquireTokenSilent({
          account: this.authConfig.account,
          scopes: ["api://8949d550-d3a8-42c3-9e95-a95f04bdab1e/API.Read"]
        })
        this.authConfig.token = (await response).accessToken;
        //await this.router.navigateByUrl("/home");
      }
    });
  }

  async login(){
    await this.authConfig.msalInstance.loginRedirect();
  }

  logout(){
    this.authConfig.msalInstance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin
    })
  }

}
