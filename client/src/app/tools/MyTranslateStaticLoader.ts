import { HttpClient }           from '@angular/common/http';
import { TranslateHttpLoader }  from '@ngx-translate/http-loader';

export function MyTranslateStaticLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
