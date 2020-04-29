import React, { Component } from 'react'
import { assignProject, getProjects } from '../utils/apiCalls';
class AssignProject extends Component {
	constructor(){
        super();
        this.state = {
            nameP: '',
            data:[{
                PID:'',
                name: '',
                description: ''
            }],            
        }
    }
    
    componentDidMount (){
		getProjects().then(res => res.json()).then(res => {			            
			this.setState({data: res})
		})
	}

	handleSubmit = e => {
        e.preventDefault();       
        console.log(this.state.nameP);
		assignProject({ name: this.state.nameP}, this.props.match.params.id)
			.then(res => res.json())
			.then(res => {			
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
					<h1>Assign Project</h1>
					<form onSubmit={this.handleSubmit}>
                    <div className="form-group">
							<label>Employee</label>
							<select className="form-control" onChange={(e) => this.setState({ nameP: e.target.value })}>
                                <option value="">Select a project</option>
                                {this.state.data.map((team) => <option value={team.name}>{team.name}</option>)}
							</select>
						</div>											
						<button type="submit" className="btn btn-primary">Assign</button>
					</form>
				</div>
			</div>
		)
	}
}

export default AssignProject