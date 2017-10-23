import { Component }            from '@angular/core';
import { Router }               from '@angular/router';
import { TranslateService }     from '@ngx-translate/core';
import { ToastrService }        from 'ngx-toastr';
import { AuthService }          from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private currLang: String;
  private isTeste: boolean = false;

  constructor(
      private router: Router
    , private auth: AuthService
    , private toast: ToastrService
    , private translate: TranslateService) {
    this.refreshCurrentLanguage();
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
    this.refreshCurrentLanguage();
  }

  teste() {
    this.auth.isLoggedIn().subscribe(
      data => this.isTeste = data
    );
  }

  refreshCurrentLanguage(): void {
    this.currLang = this.translate.currentLang || this.translate.getDefaultLang();
  }

  onLogoutClick(): void {
    this.auth.logout();
    this.toast.success('Logged out successfuly', 'Success!');
    this.router.navigate(['/']);
  }
}
