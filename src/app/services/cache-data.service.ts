import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheDataService {
  constructor() {}

  loggedUserName: string = '';
}
