import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';

export abstract class AbstractService {

  private apiEndpoint = environment.apiUrl;
  private http: Http|AuthHttp;

  constructor(http: Http|AuthHttp) {
    this.http = http;
  }

  request(method: string, path: string, data: Object, callback: Function) {
    return this.http[method](this.apiEndpoint + path, data)
      .map(callback)
      .catch((error: any) => {
        return Observable.throw(error.json().error || 'Something went wrong');
      });
  }

}
