import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Nutriment } from './nutriment';

/*
 * class NutrimentService
 *
 * map des fonctions :
 * getServices() => Fait l'appel à l'url de l'api
 * extractData() => Permet d'extraire les données du résultat renvoyé par l'API
 * handleError() => Affiche les messages d'erreur liés à l'API
*/
@Injectable()
export class NutrimentService {
  // Url de l'api
  private nutrimentsUrl = 'https://api.nal.usda.gov/ndb/list?format=json&lt=g&sort=n&api_key=sdKuPtUUndt7830vnZSp5WlV9lX3ChGBXkLmclcl';
  listNutriments : any;

  constructor (private http: Http) { }

  // Instancie une promesse pour appeler l'API, extraire les données et renvoyer
  // un message d'erreur s'il y en a
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

  // Récupère les données renvoyées par l'API
  private extractData(res: Response) {
    let body = res.json();
    this.listNutriments = body.list.item;

    // Génère une icone pour chaque nutriment
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

  // Génère des messages d'erreur s'il y en a dans la fonction extractData
  // ou si l'API renvoie une erreur
  private handleError (error: Response | any) {
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
