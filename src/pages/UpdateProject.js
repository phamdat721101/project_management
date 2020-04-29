import React, { Component } from 'react'
import { updateOneProject, getOneProject } from '../utils/apiCalls';

class UpdateProject extends Component {

	constructor(props){
		super(props);				
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            name: '',
			description: ''
        }
	}
	
	componentDidMount (){		
		var id = this.props.match.params.id;					
		getOneProject(id).then(res => res.json()).then(res => {						
			this.setState({
				name: res[0].name,
				description: res[0].description
			})
		})
	}

	handleSubmit = e => {
		e.preventDefault();		
		updateOneProject({ name: this.state.name, description: this.state.description}, this.props.match.params.id)
			.then(res => res.json())
			.then(res => {
			this.setState({ 
				formData:{
					...this.state.formData					
				}
			 });
			this.getData();			
		}).catch(res => console.error('Error creating', res));
		window.location.href='/projects'
	};

    nameHandler(e) {
        this.setState({ name: e.target.value });
    }

    descriptionHandler(e) {
        this.setState({ description: e.target.value });
	}		

    handleSave() {
		const item = this.state;   		
		this.props.saveModalDetails(item)     
    }

	render(){		
		return (
			<div className="row">
				<div className="col-6">
					<h1>Update Project</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<p><input value={this.state.name} onChange={(e) => this.nameHandler(e)} /></p>
						</div>
						<div className="form-group">
							<label htmlFor="name">Description</label>
							<p><input value={this.state.description} onChange={(e) => this.descriptionHandler(e)} /></p>
						</div>								
						<button type="submit" className="btn btn-primary">Update project</button>
					</form>
				</div>
			</div>			
		)
	}
}

export default UpdateProject