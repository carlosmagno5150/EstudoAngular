import {Component, OnInit} from '@angular/core';
import {AuthViewComponent} from '../security/auth-view/auth-view.component';
import {RouterLink} from '@angular/router';
import {useAuth} from '../authConfig';
import {AppConfig, ConfigService} from '../service/config.service';

@Component({
  selector: 'app-home',
  imports: [
    AuthViewComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  readonly authConfig = useAuth();
  config : AppConfig | undefined;

  constructor(private configService: ConfigService) {

  }

  ngOnInit(): void {
      this.configService.loadConfig().subscribe((config: AppConfig) => {
        this.config = config;
        console.log("config", this.config);
      });
  }

}
