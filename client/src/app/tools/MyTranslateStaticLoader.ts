import { Http }                   from '@angular/http';
import { TranslateStaticLoader }  from 'ng2-translate';
import { API_URLS }               from '../../environments/environment';

export function MyTranslateStaticLoader(http: Http): TranslateStaticLoader {
  return new TranslateStaticLoader(http, API_URLS.TRANSLATE, '');
}
