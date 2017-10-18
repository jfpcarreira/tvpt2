import { Component, OnInit } from '@angular/core';
import { TranslateService }  from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public currLang: String;

  constructor(private translate: TranslateService) {
    this.refreshCurrentLanguage();
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
    this.refreshCurrentLanguage();
  }

  refreshCurrentLanguage(): void {
    this.currLang = this.translate.currentLang || this.translate.getDefaultLang();
  }
}
