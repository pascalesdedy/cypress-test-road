describe('API - GET Employees', () => {
  it('should return list employess that match with test data provided', () => {
    cy.fixture('test_data').then((expected) => {
     cy.request('https://dummy.restapiexample.com/api/v1/employees')
     .then((response) => {
       expect(response.status).to.eq(200)
       
       expected.employees.forEach((emp) => {
        const apiEmp = response.body.data.find(e => e.id === emp.id)

        expect(apiEmp).to.exist
        expect(apiEmp.employee_name).to.eq(emp.employee_name)
        expect(apiEmp.employee_salary).to.eq(emp.employee_salary)
        expect(apiEmp.employee_age).to.eq(emp.employee_age)
        })
      })
    })
  })
})
