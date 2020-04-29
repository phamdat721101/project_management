import React, { Component } from 'react'
import { createUser } from '../utils/apiCalls';
class AddEmployee extends Component {
	state = {
		formData: {
			email: '',			
			password: '',
			name:'',
			phone:'',
			birthday:''
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		createUser({ email: this.state.formData.email, 
			password: this.state.formData.password,
			name: this.state.formData.name,
			phone: this.state.formData.phone,
			birthday: this.state.formData.birthday,
		})
			.then(res => res.json())
			.then(res => {
			this.setState({ 
				formData:{
					...this.state.formData					
				}
			 });
			this.getData();
		}).catch(res => console.error('Error creating', res));
		window.location.href='/employees'
	};

	handleChange = (event, field) => {
		this.setState({ 
			formData: {
				...this.state.formData,
				[field]: field === 'date' ? event : event.target.value 
			}
		});
	}

	render() {		

		return (
			<div className="row">
				<div className="col-6">
					<h1>New Employee</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Email</label>
							<input type="text" 
								className="form-control" 
								placeholder="Email" 
								value={this.state.formData.email}
								onChange={e => this.handleChange(e, 'email')} />
						</div>						
						<div className="form-group">
							<label htmlFor="timeslack">Password</label>
							<input type="password" 
								className="form-control" 
								placeholder="Password" 
								value={this.state.formData.password}
								onChange={e => this.handleChange(e, 'password')}/>
						</div>	
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input type="text" 
								className="form-control" 
								placeholder="Name" 
								value={this.state.formData.name}
								onChange={e => this.handleChange(e, 'name')} />
						</div>
						<div className="form-group">
							<label htmlFor="name">Phone</label>
							<input type="text" 
								className="form-control" 
								placeholder="Phone" 
								value={this.state.formData.phone}
								onChange={e => this.handleChange(e, 'phone')} />
						</div>
						<div className="form-group">
							<label htmlFor="name">Birthday</label>
							<input type="date" 
								className="form-control" 
								placeholder="Birthday" 
								value={this.state.formData.birthday}
								onChange={e => this.handleChange(e, 'birthday')} />
						</div>
						<button type="submit" className="btn btn-primary">Save employee</button>
					</form>
				</div>
			</div>
		)
	}
}

export default AddEmployee