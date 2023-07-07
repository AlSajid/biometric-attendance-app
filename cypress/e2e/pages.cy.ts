describe('Load All Pages', () => {
  it('Dashboard', () => {
    cy.visit('http://localhost:3000/');
  })

  it('Device Connection', () => {
    cy.visit('http://localhost:3000/devices/connections');   
  })

  it('Add Employee', () => {
    cy.visit('http://localhost:3000/employees/add-employee');   
  })

  it('Manage Employees', () => {
    cy.visit('http://localhost:3000/employees/manage-employees');   
  })

  it('Apply Leaves', () => {
    cy.visit('http://localhost:3000/leaves/apply-leave');   
  })

  it('Manage Leaves', () => {
    cy.visit('http://localhost:3000/leaves/manage-leaves');   
  })

  it('Leave Types', () => {
    cy.visit('http://localhost:3000/leaves/leave-types');   
  })

  it('Fetch Attendance', () => {
    cy.visit('http://localhost:3000/attendance/puller');   
  })

  it('Company Settings', () => {
    cy.visit('http://localhost:3000/settings/company');   
  })

  it('Hours Settings', () => {
    cy.visit('http://localhost:3000/settings/hours');
  })

  it('Manage Departments', () => {
    cy.visit('http://localhost:3000/settings/departments');
  })

  it('Attendance Report', () => {
    cy.visit('http://localhost:3000/reports/attendance');
  })
})