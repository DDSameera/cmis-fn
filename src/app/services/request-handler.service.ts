import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { encode } from 'js-base64';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TicketObjectModel } from '../admin/ticket/ticket.model';
import { Ticket } from '../interface/ticket';

@Injectable({
  providedIn: 'root',
})
export class RequestHandlerService {
  private ip: string = environment.ip;
  private port: number = environment.port;

  constructor(private http: HttpClient) {}

  setHeaders(): HttpHeaders {


    let options: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    let tempToken = localStorage.getItem('token');

    if (tempToken) {
      options['Authorization'] = "Bearer "+tempToken;
    }

    let httpOptions: HttpHeaders = new HttpHeaders(options);

    return httpOptions;
  }

  getRequest(endPoint: string):Observable<any> {
    return this.http.get<Ticket>(this.ip + ':' + this.port + '/' + endPoint, {
      headers: this.setHeaders(),
    });
  }

  postRequest(endPoint: string, body:any):Observable<any> {
    console.log(body);
    return this.http.post<Ticket>(this.ip + ':' + this.port + '/' + endPoint, body, {
      headers: this.setHeaders(),
    });
  }
  updateRequest(endPoint: string, body: any, id: string):Observable<any> {
    return this.http.patch<Ticket>(this.ip +':' + this.port + '/' + endPoint  +'/' +id , body,{
      headers: this.setHeaders(),
    });
  }

  deleteRequest(endPoint: string, id: string){
    return this.http.delete<Ticket>(this.ip + ':' + this.port + '/' + endPoint + '/' + id, {
      headers: this.setHeaders(),
    });
  }
}
