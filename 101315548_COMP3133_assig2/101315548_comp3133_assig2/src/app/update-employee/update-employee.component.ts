import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeEmail: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required]
    });
  
    this.employeeEmail = this.route.snapshot.paramMap.get('email')!;
    this.employeeService.getEmployeeByEmail(this.employeeEmail).subscribe((data: any) => {
      this.employeeForm.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        gender: data.gender,
        city: data.city,
        designation: data.designation,
        salary: data.salary
      });
    });
  }

  onSubmit() {
    this.employeeService.updateEmployee(
      this.employeeEmail,
      this.employeeForm.value.firstname,
      this.employeeForm.value.lastname,
      this.employeeForm.value.gender,
      this.employeeForm.value.city,
      this.employeeForm.value.designation,
      this.employeeForm.value.salary
    ).subscribe(() => {
      this.router.navigate(['/'], { skipLocationChange: false }).then(() => {
        window.location.reload();
      });
      });
    };
  }