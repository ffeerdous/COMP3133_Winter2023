import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;
  employeeAdded = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router){ }

  ngOnInit(): void {
  this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  onSubmit() {
    const formValue = this.employeeForm.value;
    const firstname = formValue.firstname
    const lastname = formValue.lastname
    const email = formValue.email
    const gender = formValue.gender
    const city = formValue.city
    const designation = formValue.designation
    const salary = formValue.salary

    this.employeeService.addEmployee(firstname, lastname, email, gender, city, designation, salary).subscribe(response => {
        console.log(response);
        this.employeeAdded = true;
        this.employeeForm.reset();
      }, error => {
        console.log(error);
      });
      this.router.navigate(['/'], { skipLocationChange: false }).then(() => {
        window.location.reload();
      });
  }
}
