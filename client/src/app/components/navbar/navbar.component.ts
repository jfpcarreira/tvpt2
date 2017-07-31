import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currLang: String;

  constructor(private translate: TranslateService) {
    this.refreshCurrentLanguage();
  }

  ngOnInit() {
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.refreshCurrentLanguage();
  }

  refreshCurrentLanguage() {
    this.currLang = this.translate.currentLang || this.translate.getDefaultLang();
  }
}
