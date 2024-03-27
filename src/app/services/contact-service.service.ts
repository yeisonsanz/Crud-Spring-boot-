import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contact } from '../model/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private http = inject(HttpClient)

  public list(){
    return this.http.get<Contact[]>('http://localhost:8080/api/contacts')
  }

  public get(id:number){
    return this.http.get<Contact>(`http://localhost:8080/api/contacts/${id}`)
  }

  public create(contact: Contact){
    return this.http.post<Contact>('http://localhost:8080/api/contacts', contact)
  }

  public update(id: number, contact: Contact){
    return this.http.put<Contact>(`http://localhost:8080/api/contacts/${id}`, contact)
  }

  public delete(id: number){
    return this.http.delete(`http://localhost:8080/api/contacts/${id}`)
  }

}
