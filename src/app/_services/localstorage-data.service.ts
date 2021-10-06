import { Injectable } from '@angular/core';
import { encode } from 'js-base64';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageDataService {

  constructor() { }


  setLocalStorageAttribute(data:object){

    let encodedData = encode(JSON.stringify(data));
    localStorage.setItem('session-data', encodedData);

  }
}
