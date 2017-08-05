import { Http } from '@angular/http';
import { TranslateStaticLoader } from 'ng2-translate';
import { environment } from '../../environments/environment';

export function MyTranslateStaticLoader(http: Http) {
  return new TranslateStaticLoader(http, environment.API_DOMAIN + environment.TRANSLATE_API_URL, '');
}
