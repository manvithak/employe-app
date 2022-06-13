import { QueryTypes } from 'sequelize';
import { EmployeDetails, MaxSalary, GenderGroupBySalary } from '@interfaces/employe.interface';
import DB from '@databases';

class EmployeQueries {
    public async fetchEmployeeDetails(): Promise<EmployeDetails[]> {
        try{
            const employe_query = `select (json_agg(tb)::jsonb) FROM (SELECT id, json_agg(obj) as employees 
            from (
              select department as e.department, status as d.status, json_build_object(
                     'id', e.id,
                     'firstName', e.firstName,
                     'lastName', e.lastName
                     'email',  e.email,
                     'gender', e.gender,
                     'mobile', e.mobile,
                     'address', e.address,
                     'city', e.city,
                     'designation', e.department,
                     'department', e.department
                     'status', e.status,
                     'salary', sd.salary
                   ) as details
              from 
              employee e JOIN departments as d on e.department = d.id
              JOIN salarydetails as sd on e.id = sd.employeeid
              ) tmp
              group by department) as tb`
            
            const response: EmployeDetails[] = await DB.sequelize.query(employe_query, {
                replacements: [],
                type: QueryTypes.SELECT
            });
            return response
        }
        catch(err){
            console.log("Error in fetchEmployeeDetails:: ", err)
            return false
        }
    }

    public async getMaxSalary(): Promise<MaxSalary[]> {
        try{
            const employe_query = `SELECT MAX(salary) as max_salary from salarydetails`
            
            const response:MaxSalary[] = await DB.sequelize.query(employe_query, {
                replacements: [],
                type: QueryTypes.SELECT
            });
            return response
        }
        catch(err){
            console.log("Error in fetchEmployeeDetails:: ", err)
            return false
        }
    }

    public async getHighRankDepartment(max_salary): Promise<GenderGroupBySalary[]> {
        try{
            const employe_query = `SELECT d.*, e.* from employe as e 
            JOIN salarydetails as sd on e.id = sd.employeeid 
            JOIN departments as d on e.department = d.id where sd.salary = ?`
            
            const response:GenderGroupBySalary[] = await DB.sequelize.query(employe_query, {
                replacements: [max_salary],
                type: QueryTypes.SELECT
            });
            return response
        }
        catch(err){
            console.log("Error in getHighRankDepartment:: ", err)
            return false
        }
    }

    public async getSalaryByGender(): Promise<EmployeDetails[]> {
        try{
            const employe_query = `SELECT e.gender, SUM(sd.salary) from employe as e 
            JOIN salarydetails as sd on e.id = sd.employeid 
            GROUP BY e.gender`
            
            const response = await DB.sequelize.query(employe_query, {
                replacements: [],
                type: QueryTypes.SELECT
            });
            return response
        }
        catch(err){
            console.log("Error in getSalaryByGender:: ", err)
            return false
        }
    }

}

export default EmployeQueries;