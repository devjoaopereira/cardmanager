import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _storedData: any;

  constructor() { }

  setDataStore(data: any): void {
    this._storedData = data;
  }

  getDataStore(): any {
    return this._storedData;
  }
}
