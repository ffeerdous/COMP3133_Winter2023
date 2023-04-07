import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ApolloError } from '@apollo/client';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  signupForm: FormGroup;
  error!: string;
  errorMessage!: string;

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    const username = this.signupForm.get('username')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;

    this.employeeService.signup(username, email, password).subscribe(
      () => {
        this.router.navigateByUrl('/app-login')
      },
      (error) => {
        if (error instanceof ApolloError && error.message.includes('E11000 duplicate key error')){
          this.errorMessage = "Username already Taken";
        }else {
        this.errorMessage = error.message;
      }
    }
    );
  }
}

