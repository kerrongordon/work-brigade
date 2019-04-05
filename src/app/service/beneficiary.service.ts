import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor() { }


  registerBeneficiary(data) {
    return console.log(data);
  }
}
