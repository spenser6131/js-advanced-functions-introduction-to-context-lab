function createEmployeeRecord(employeeData) {
  let [firstName, familyName, title, payPerHour] = employeeData;
  return {firstName, familyName, title, payPerHour, timeInEvents: [], timeOutEvents: []};
}

function createEmployeeRecords(employeeArray) {
  return employeeArray.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timestamp) {
  let [date, time] = timestamp.split(" ");
  employee.timeInEvents.push({type: "TimeIn", hour: parseInt(time, 10), date});
  return employee;
}

function createTimeOutEvent(employee, timestamp) {
  let [date, time] = timestamp.split(" ");
  employee.timeOutEvents.push({type: "TimeOut", hour: parseInt(time, 10), date});
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let {timeInEvents, timeOutEvents} = employee;
  let timeIn = timeInEvents.find(t => t.date === date).hour;
  let timeOut = timeOutEvents.find(t => t.date === date).hour;
  return (timeOut - timeIn) / 100 ;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(event => event.date);
  return dates.reduce(function(total, date) {
    return total + wagesEarnedOnDate(employee, date)
  }, 0)
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName === name);
}

function calculatePayroll(employees) {
  return employees.reduce(function(total, employee){
    return total + allWagesFor(employee)
  }, 0)
}

