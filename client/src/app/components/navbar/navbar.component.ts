import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currLang: String;

  constructor(private translate: TranslateService) {
    this.refreshCurrentLanguage();
  }

  ngOnInit(): void {
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
    this.refreshCurrentLanguage();
  }

  refreshCurrentLanguage(): void {
    this.currLang = this.translate.currentLang || this.translate.getDefaultLang();
  }
}
