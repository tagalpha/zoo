import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Nutriment } from './nutriment';

@Injectable()
export class NutrimentService {
  //private nutrimentsUrl = 'http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=sdKuPtUUndt7830vnZSp5WlV9lX3ChGBXkLmclcl&nutrients=205&nutrients=204&nutrients=208&nutrients=269&max=25';
  private nutrimentsUrl = 'https://api.nal.usda.gov/ndb/list?format=json&lt=g&sort=n&api_key=sdKuPtUUndt7830vnZSp5WlV9lX3ChGBXkLmclcl';
  listNutriments : any;

  constructor (private http: Http) { }

  getServices(): Promise<any> {
    if (!this.listNutriments) {
      return this.http.get(this.nutrimentsUrl)
          .toPromise()
          .then(this.extractData.bind(this))
          .catch(this.handleError)
      ;
    } else {
      return Promise.resolve(this.listNutriments);
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    this.listNutriments = body.list.item;

    this.listNutriments.forEach(function (nutrimentTmp) {
      var numIcon = Math.floor(Math.random() * 3) + 1;
      var icon = '';

      if (numIcon === 1) {
        icon = 'apple';
      } else if (numIcon === 2) {
        icon = 'leaf';
      } else {
        icon = 'lemon-o';
      }

      nutrimentTmp.icon = icon;
    });

    return this.listNutriments || { };
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