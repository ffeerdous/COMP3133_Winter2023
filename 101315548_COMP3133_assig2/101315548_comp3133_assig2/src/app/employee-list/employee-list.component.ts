import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: any;
  showTables = true;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.employees = this.employeeService.getEmployees();
  }

  onAddEmployeeClick(){
    this.showTables = false;
  }

  // Pop-up for emplyee deletation
  onDelete(email: string){
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(email).subscribe(() => {
        this.employees = this.employeeService.getEmployees();
        window.alert('Employee has been deleted!');
        window.location.reload();
      });
    }
  }

  onLogout() {
    localStorage.removeItem('token'); // Remove token from localStorage
    this.router.navigate(['/app-login']); // Navigate back to login page
  }
}
