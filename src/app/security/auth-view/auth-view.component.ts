import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {useAuth} from '../../authConfig';

@Component({
  selector: 'app-auth-view',
  imports: [NgIf],
  templateUrl: './auth-view.component.html',
  styleUrl: './auth-view.component.css'
})
export class AuthViewComponent {

  readonly authConfig = useAuth();

  public isAuthorized(){
    return this.authConfig.account
  }

}
