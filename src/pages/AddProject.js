import React, { Component } from 'react'
import { createProject } from '../utils/apiCalls';

import 'react-datepicker/dist/react-datepicker.css';

class AddProject extends Component {
	state = {
		formData: {
			name: '',
			description: '',
			employee: ''			
		},		
	}

	componentWillMount() {
		this.setState({ availableTasks: this.props.tasks.map(t => t) });
	}

	handleChange = (event, field) => {
		this.setState({ 
			formData: {
				...this.state.formData,
				[field]: field === 'date' ? event : event.target.value 
			}
		})
	}

	handleSubmit = e => {
		e.preventDefault();
		createProject({ name: this.state.formData.name, description: this.state.formData.description})
			.then(res => res.json())
			.then(res => {
			this.setState({ 
				formData:{
					...this.state.formData					
				}
			 });
			this.getData();
		}).catch(res => console.error('Error creating', res));
	};

	
	render() {		
		return (
			<div className="row">
				<div className="col-6">
					<h1>New Project</h1>
					<form className="mt-3"
					 onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input type="text" 
								className="form-control" 
								placeholder="Name" 
								value={this.state.formData.name}
								onChange={e => this.handleChange(e, 'name')} />
						</div>
						<div className="form-group">
							<label htmlFor="name">Description</label>
							<input type="text" 
								className="form-control" 
								placeholder="Name" 
								value={this.state.formData.description}
								onChange={e => this.handleChange(e, 'description')} />
						</div>
						<div className="form-group">
							<label htmlFor="name">Employee</label>
							<input type="text" 
								className="form-control" 
								placeholder="Name" 
								value={this.state.formData.employee}
								onChange={e => this.handleChange(e, 'employee')} />
						</div>
						
						<button type="submit" className="btn btn-primary">Save project</button>
					</form>
				</div>
			</div>
		)
	}
}

export default AddProject