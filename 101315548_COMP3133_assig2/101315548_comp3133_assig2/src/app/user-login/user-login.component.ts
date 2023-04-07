import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  error!: string;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) { // Check if token exists in localStorage
      this.router.navigate(['/app-employee-list']);
    }
  }

  onSubmit() {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    this.employeeService.login(username, password).subscribe(
      result => {
        console.log(result);
        localStorage.setItem('token', result.token); // Set token in localStorage
        this.router.navigate(['/app-employee-list'])
      },
      error => {
        console.log(error);
        this.error = error.message;
      }
    );
  }
}