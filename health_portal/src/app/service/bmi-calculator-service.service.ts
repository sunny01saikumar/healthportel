import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BmiCalculator } from '../model/bmi-calculator';

@Injectable({
  providedIn: 'root'
})
export class BmiCalculatorServiceService {

  constructor(private http:HttpClient) { }

  postData(bmi:BmiCalculator):Observable<BmiCalculator>{
    
    return this.http.post<BmiCalculator>('http://localhost:2088/insert',bmi)
  }
}
