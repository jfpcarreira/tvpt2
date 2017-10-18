import { Component }              from '@angular/core';
import { TranslateService }       from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  template: SafeHtml;
  templateHtml: string = `
    <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
      <div style="width: 150px; height: 70px; margin: 0 auto;">
        <img style="object-fit: contain; position: inherit;"
          src="http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-10.gif" />
        </div>
      </div>
    `;

  constructor(private translate: TranslateService, private sanitized: DomSanitizer) {
    this.template = this.sanitized.bypassSecurityTrustHtml(this.templateHtml);
    translate.addLangs(['pt', 'en']);
    translate.setDefaultLang('en');
  }
}
