import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Nutriment } from './nutriment';

@Injectable()
export class NutrimentService {
  //private nutrimentsUrl = 'http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=sdKuPtUUndt7830vnZSp5WlV9lX3ChGBXkLmclcl&nutrients=205&nutrients=204&nutrients=208&nutrients=269&max=25';
  private nutrimentsUrl = 'https://api.nal.usda.gov/ndb/list?format=json&lt=g&sort=n&api_key=sdKuPtUUndt7830vnZSp5WlV9lX3ChGBXkLmclcl';

  constructor (private http: Http) { }

  getServices(): Promise<Nutriment[]> {
    return this.http.get(this.nutrimentsUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
    ;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.list.item || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
