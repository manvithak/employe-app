import { Employe, EmployeDetails, EmployeBasicInfo } from "@/interfaces/employe.interface";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const convertNestedJSONToArray = (departmentInfo: Array<EmployeDetails>) => {
  try {
    let employeesInfo = [] //The one-dimesional array to which the details json of each employee will be pushed

    departmentInfo.forEach(department => {
      let obj:EmployeBasicInfo;
      if(department && department.details && department.details.length > 0){
        department.details.forEach(employee => {
          if (employee && employee.id) {
            obj = {
              'Name': employee.firstName?employee.firstName:'' + employee.lastName?employee.lastName:'',
              'Designation': employee.designation,
              'Salary': '$ ' + (employee.salary ? employee.salary : 0).toString(),
              'Communication': constructAddress(employee)
            }
            employeesInfo.push(obj)
          }
        })
      }
    })
    return employeesInfo;
  }
  catch (err) {
    console.log("Error in convertNestedJSONToArray for departInfo:: ", JSON.stringify(departmentInfo), " Error:: ", err)
  }
}

const constructAddress = (employee: Employe) => {
  let addressString = ''
  addressString = employee.address ? employee.address + ' ,' : ''
  addressString = (addressString) + (employee.city ? employee.city + ' ,' : '')
  addressString = (addressString) + (employee.email ? employee.city + ' and ' : '')
  addressString = (addressString) + (employee.mobile ? employee.mobile : '')
  return addressString;
}
