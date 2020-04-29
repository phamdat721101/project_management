import React, { Component } from 'react'
import { updateOneUser, getOneUser } from '../utils/apiCalls';

class UpdateEmployee extends Component {

	constructor(props){
		super(props);				
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            name: '',
			phone: '',
			birthday: ''
        }
	}
	
	componentDidMount (){		
		var id = this.props.match.params.id;					
		getOneUser(id).then(res => res.json()).then(res => {	
			console.log(res)		
			this.setState({
				name: res[0].name,
				phone: res[0].phone,
				birthday: res[0].birthday
			})
		})
	}

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.props.match.params.id)
		updateOneUser({ name: this.state.name, phone: this.state.phone, birthday: this.state.birthday}, this.props.match.params.id)
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

    nameHandler(e) {
        this.setState({ name: e.target.value });
    }

    phoneHandler(e) {
        this.setState({ phone: e.target.value });
	}
	
	birthdayHandler(e) {
        this.setState({ birthday: e.target.value });
    }

    handleSave() {
		const item = this.state;   		
		this.props.saveModalDetails(item)     
    }

	render(){		
		return (
			<div className="row">
				<div className="col-6">
					<h1>Update Employee</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<p><input value={this.state.name} onChange={(e) => this.nameHandler(e)} /></p>
						</div>
						<div className="form-group">
							<label htmlFor="name">Phone</label>
							<p><input value={this.state.phone} onChange={(e) => this.phoneHandler(e)} /></p>
						</div>
						<div className="form-group">
							<label htmlFor="name">Birthday</label>
							<p><input value={this.state.birthday} onChange={(e) => this.birthdayHandler(e)} /></p>
						</div>			
						<button type="submit" className="btn btn-primary">Update employee</button>
					</form>
				</div>
			</div>			
		)
	}
}

export default UpdateEmployee