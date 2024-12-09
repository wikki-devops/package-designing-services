import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  emailContact: string = 'sales@godparticles.in';

  contactForm: FormGroup;
  formData = {
    name: '',
    phone: '',
    email: '',
    brand: ''
  };
  constructor(private router: Router, private renderer: Renderer2, private fb: FormBuilder, private databaseService: DatabaseService, private toastr: ToastrService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      brand: ['', Validators.required]
    });
  }
  ngOnInit(): void { }

  onSubmit() {
    if (this.contactForm.valid) {
      this.databaseService.submitFormData(this.contactForm.value).subscribe(
        (response) => {
          console.log('Server response:', response);
          this.contactForm.reset();

          this.router.navigate(['/thankyou']); 
        },
        (error) => {
          console.error('HTTP error:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  contactform() {
    const calculatorSection = document.getElementById('contactform');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
