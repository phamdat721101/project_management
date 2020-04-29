import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Toolbar from './components/UI/Toolbar/Toolbar'
import ListProjectsPage from './pages/ListProjects'
import ListEmployeesPage from './pages/ListEmployees'
import AddProjectPage from './pages/AddProject'
import AddEmployeePage from './pages/AddEmployee'
import UpdateEmployee from './pages/UpdateEmployee'
import UpdateProject from './pages/UpdateProject';
import AssignProject from './pages/AssignProject';
import ProjectDetail from './pages/ProjectDetail'
import 'react-table/react-table.css'

import './App.css';

class App extends Component {

	state = {
		projects: [],
		idProjects: 0,
		employees: [],
		idEmployees: 0,
		tasks: [],
		idTasks: 0
	}

	handleNewProjectForm = (e, data) => {
		e.preventDefault()

		let project = { ...data }
		project['id'] = this.state.idProjects
		let projects = this.state.projects.map(p => p)
		projects.push(project)
		
		this.setState({ 
			projects: projects, 
			idProjects: this.state.idProjects + 1 
		})
	}

	handleNewEmployeeForm = (e, data) => {
		e.preventDefault()

		let employee = { ...data }
		employee['id'] = this.state.idEmployees
		let employees = this.state.employees.map(e => e)
		employees.push(employee)
		
		this.setState({ 
			employees: employees, 
			idEmployees: this.state.idEmployees + 1
		})
	}	

	handleRemoveEmployee = (e, id) => {
		let employees = this.state.employees.filter(e => id !== e.id)
		this.setState({ employees: employees });
	}	

	render() {
		return (
			<BrowserRouter>
				<div>
					<Toolbar />
					<h1>This is the test</h1>
					<div className="container py-5">
						<div className="row">
							<div className="col-12">
								<Route exact path="/projects"
									component={() => <ListProjectsPage projects={this.state.projects} />} />
								<Route exact path="/projects/:id"
									component={() => <ProjectDetail projects={this.state.projects} />} />
								<Route exact path="/employees"
									component={() => <ListEmployeesPage
														employees={this.state.employees} 
														removeClicked={this.handleRemoveEmployee} />} />																						
								<Route path="/projects/add"
									component={() => <AddProjectPage 
										handleForm={this.handleNewProjectForm}
										employees={this.state.employees}
										/>} />
								<Route path="/employees/add"
									component={() => <AddEmployeePage 
										handleForm={this.handleNewEmployeeForm}
										employees={this.state.employees} />} />	
								<Route path="/employees/update/:id"
									component={props => <UpdateEmployee {...props}
										handleForm={this.handleNewEmployeeForm}
										employees={this.state.employees} />} />		
								<Route path="/project/update/:id"
									component={props => <UpdateProject {...props}
										handleForm={this.handleNewProjectForm}
										employees={this.state.employees} />} />	
								<Route path="/assign_project/:id"
									component={props => <AssignProject {...props}										
										employees={this.state.employees} />} />															
							</div>
						</div>
					</div>			
				</div>
			</BrowserRouter>
    );
  }
}

export default App;
