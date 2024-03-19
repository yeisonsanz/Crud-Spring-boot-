import { Component, Inject, inject } from '@angular/core';
import {ContactServiceService} from '../services/contact-service.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

  contacts: any[] = [];
  private ContactServiceService = inject(ContactServiceService)

  ngOnInit(): void {
    this.ContactServiceService.list()
      .subscribe((contacts: any) => {
        this.contacts = contacts;
      });
  }


}
