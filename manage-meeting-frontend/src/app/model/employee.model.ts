export class Employee {
  public employeeId: string;
  public name: string;
  public designation: string;
  public department: string;
  public mail: string;

  constructor(employee?) {
    employee = employee || {};
    this.employeeId = employee.employeeId || null;
    this.name = employee.name || null;
    this.designation = employee.designation || null;
    this.department = employee.department || null;
    this.mail = employee.mail || null;
  }
}
