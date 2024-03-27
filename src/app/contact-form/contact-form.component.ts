import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from '../services/contact-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../model/contact.interface';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private contactService: ContactServiceService
  ) {}

  form?: FormGroup;
  contact?: Contact;
  modoEdicion: boolean = false;

  ngOnInit(): void {
    const id = this.activateRouter.snapshot.paramMap.get('id');
    this.modoEdicion = !!id;

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    if (id) {
      this.contactService.get(parseInt(id)).subscribe((contact) => {
        this.contact = contact;
        this.form = this.fb.group({
          nombre: [contact.id, [Validators.required]],
          email: [contact.email, [Validators.required]],
        });
      });
    } else {
      this.form = this.fb.group({
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required]],
      });
    }
  }

  save() {
    const contactForm = this.form!.value;

    if(this.contact){
      this.contactService.update(this.contact.id, contactForm)
          .subscribe(() => {
          this.router.navigate(['/']);
      });
    }else{
      this.contactService.create(contactForm)
          .subscribe(() => {
          this.router.navigate(['/']);
      });
    }
    
  }
}
