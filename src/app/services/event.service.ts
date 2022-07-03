import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../models/event';
import {Transaction} from '../models/transaction';

let API_URL = "http://localhost:8082/api/event/service/";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  enroll(transaction: Transaction): Observable<any> {
    return this.http.post(API_URL + 'enroll', JSON.stringify(transaction), {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findAllItems(): Observable<any> {
    return this.http.get(API_URL + "all",{headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findTransactionsOfUser(userId: number): Observable<any> {
    return this.http.get(API_URL + "user/" + userId, {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findStudentsOfEvent(eventId: number): Observable<any> {
    return this.http.get(API_URL + "event/" + eventId, {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findStudentsOfEvent2(eventId: number): Observable<any> {
    return this.http.post(API_URL + "transaction/" + eventId, {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  returnStudentsOfEvent(): Observable<any> {
    return this.http.get(API_URL + "names" , {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  returnStudentsOfEvent2(): Observable<any> {
    return this.http.post(API_URL + "names" , {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
}
