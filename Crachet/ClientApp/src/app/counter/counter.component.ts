import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  firstNumber = 0;
  message = "";
  result = 0;
  secondNumber = 0;

  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {

  }


  public incrementCounter() {
    this.currentCount++;
  }

  addNumbers() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    const request: AddNumbersRequest = {
      first: Number(this.firstNumber),
      second: Number(this.secondNumber)
    };

    const jsonPayload = JSON.stringify(request);

    const url = this.baseUrl + "api/Demo/add";

    this.httpClient.post<AddNumbersResponse>(url, jsonPayload, { headers }).subscribe(
      response => {
        if (response.isSuccessful) {
          this.result = response.sum;
        }
        else {
          this.message = "Error on server";
        }
      },
      (error: HttpErrorResponse) => {
        this.message = error.message;
      }
    );
  }
}

export interface AddNumbersRequest {
  first: number;
  second: number;
}

export interface AddNumbersResponse {
  sum: number;
  isSuccessful: boolean;
}
