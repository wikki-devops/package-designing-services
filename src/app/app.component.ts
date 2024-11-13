import { Component, OnInit, Input, Renderer2, ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'package-designing';
  emailContact: string = 'sales@godparticles.in';

  contactForm: FormGroup;
  formData = {
    name: '',
    phone: '',
    email: '',
    brand: ''
  };
  constructor(private renderer: Renderer2, private fb: FormBuilder, private databaseService: DatabaseService, private toastr: ToastrService) {
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

          // Show success toastr message
          this.toastr.success('Thank you for contacting us.', 'Success', { timeOut: 3000 });

          // Reset the form
          this.contactForm.reset();

          // Reload the page after 30 seconds
          setTimeout(() => {
            window.location.reload();
          }, 5000); // 30,000 milliseconds = 30 seconds
        },
        (error) => {
          console.error('HTTP error:', error);

          // Show error toastr message
          this.toastr.error(error.message || 'An error occurred. Please try again.', 'Error', { timeOut: 3000 });
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  ngAfterViewInit() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'assets/js/jquery.js';
    script.src = 'assets/js/vendors.min.js';
    script.src = 'assets/js/main.js';

    this.renderer.appendChild(document.body, script);

  }
  contactform() {
    const calculatorSection = document.getElementById('contactform');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
