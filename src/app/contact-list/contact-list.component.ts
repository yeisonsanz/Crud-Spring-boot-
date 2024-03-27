import { Component, Inject, inject } from '@angular/core';
import {ContactServiceService} from '../services/contact-service.service';
import { OnInit } from '@angular/core';
import { Contact } from '../model/contact.interface';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

  contacts: Contact[] = [];
  private ContactServiceService = inject(ContactServiceService)

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(){
    this.ContactServiceService.list()
    .subscribe(contacts => {
      this.contacts = contacts;
    });
  }


  deleteContact(contact: Contact){
    this.ContactServiceService.delete(contact.id)
        .subscribe(()=>{
           this.loadAll();
        })
  }


}
