import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees: any;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) {
    this.employees = this.employeeService.getEmployees();
  }
}