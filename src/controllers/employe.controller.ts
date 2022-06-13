import { NextFunction, Request, Response } from 'express';
import { EmployeDetails, EmployeBasicInfo } from '@interfaces/employe.interface';
import EmployeQueries  from '@queries/employe.queries';
import { convertNestedJSONToArray } from '@utils/util'

class EmployeController {
  public employeQueries = new EmployeQueries
  // Question Number 1.
  public getEmployeeDepartmentData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeDepartmentData: EmployeDetails[] = await this.employeQueries.fetchEmployeeDetails();
      /*We will get JSON like {
        [
          {
            department: 301,
            details: [{
              id: 'Cedric'
              firstName: 
              lastName:
              email: 
              gender: 
              mobile: 
              address: 
              city: 
              designation: 
              department: 
              status: 
            }]
          },
          {
            department: 302,
            details: [{}, {}]
          }
        ]
      }*/
      if (!employeDepartmentData) {
        res.status(500).json({message: 'Internal Error, Please try after sometime.'})
      }
      res.status(200).json({ data: employeDepartmentData, message: 'Employee details group by departments.' });
    } catch (error) {
      console.log("Error in getEmployeeDepartmentData:: ", error)
      next(error);
    }
  };
  //Question Number 2
  public getActiveEmployeeDepartmentData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Here we can manipulate the db query to just fetch active employees from active department 
      // but in the question it is mentioned to pull from contructed JSON so using array methods to do this.
      const employeDepartmentData: EmployeDetails[] = await this.employeQueries.fetchEmployeeDetails();
      if (!employeDepartmentData) {
        res.status(500).json({message: 'Internal Error, Please try after sometime.'})
      }
      let filterActiveDepartments: EmployeDetails[];

      //Filtering active departments from the JSON in step1.
      if (employeDepartmentData && employeDepartmentData.length > 0) {
        filterActiveDepartments = employeDepartmentData.filter(department => department.status == 'Active')
      }

      //Filtering active employees from active departments
      if(filterActiveDepartments && filterActiveDepartments.length > 0) {
        let activeEmployees = []
        filterActiveDepartments.forEach(department => {
          activeEmployees = department.details.filter(detail => detail.status == 'Active')
          department.details = activeEmployees
        })
      }
      
      res.status(200).json({ data: filterActiveDepartments, message: 'Active Employees from Active Departments' });
    } catch (error) {
      console.log("Error in getEmployeeDepartmentData:: ", error)
      next(error);
    }
  };

  //Question Number 3
  public getEmployeeDataInArray = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // We can fetch the employe data with required info with a db query, since the question mentioned to modify the array and build one dimensional array.
      const employeDepartmentData: EmployeDetails[] = await this.employeQueries.fetchEmployeeDetails();
      
      const oneDimensionalEmployeArray: EmployeBasicInfo[] = convertNestedJSONToArray(employeDepartmentData)
      res.status(200).json({ data: oneDimensionalEmployeArray, message: 'One Dimesional Array with Employee data' });
    } catch (error) {
      console.log("Error in getEmployeeDataInArray:: ", error)
      next(error);
    }
  };

  //Question Number 4
  public getRankData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // There is no requirement to get data from step 1, so using db queries

      let maxSalary = await this.employeQueries.getMaxSalary()
      if (!maxSalary) {
        res.status(500).json({message: 'Internal Error, Please try after sometime.'})
      }
      let highRankDepartmentEmployee = []
      if(maxSalary && maxSalary.length > 0){
        highRankDepartmentEmployee = await this.employeQueries.getHighRankDepartment(maxSalary[0].max_salary)
      }

      res.status(200).json({ data: highRankDepartmentEmployee, message: 'One Dimesional Array with Employee data' });
    } catch (error) {
      console.log("Error in getEmployeeDataInArray:: ", error)
      next(error);
    }
  };

  //Question Number 5
  public getSalaryByGender = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // There is no requirement to get data from step 1, so using db queries

      let salaryByGender = []
      salaryByGender = await this.employeQueries.getSalaryByGender()

      res.status(200).json({ data: salaryByGender, message: 'Max Salary based on gender' });
    } catch (error) {
      console.log("Error in getEmployeeDataInArray:: ", error)
      next(error);
    }
  };
}

export default EmployeController;
