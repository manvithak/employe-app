import { Router } from 'express';
import EmployeController from '@controllers/employe.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';

class EmployeRoute implements Routes {
  public path = '/emplpye';
  public router = Router();
  public employeController = new EmployeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.employeController.getEmployeeDepartmentData);
    this.router.get(`${this.path}/active-employes`, this.employeController.getActiveEmployeeDepartmentData);
    this.router.get(`${this.path}/employee-data`, this.employeController.getEmployeeDataInArray);
    this.router.get(`${this.path}/high-rank-data`, this.employeController.getRankData);
    this.router.get(`${this.path}/salary-by-gender`, this.employeController.getSalaryByGender);
  }
}

export default EmployeRoute;
