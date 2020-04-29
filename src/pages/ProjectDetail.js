import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import { getUserProject } from '../utils/apiCalls';
class ProjectDetail extends Component {
	constructor(){
		super();
            this.state = {
                tableData: [{
                    PID: '',
                    name: '',
                    description: ''                                   
                }],
            };
	}

	componentDidMount (){        
		getUserProject().then(res => res.json()).then(res => {			
			console.log(res);
			this.setState({tableData: res})
		})
	}

	render() {
		const { tableData } = this.state;		
		console.log(tableData)
		const columns = [			
			{
				Header: 'Name',
				accessor: 'pid'
			},
			{
				Header: 'Member',
				accessor: 'name'
			},
			{
				Header: '',
				Cell : (e, id) => (									
					<button className="btn btn-primary" onClick={event =>  window.location.href='/project/update/'+ (e.index + 1)} >Update</button>
				),
				filterable: false,
				sortable: false
			},
			{
				Header: '',
				Cell : (e, id) => (									
					<button className="btn btn-primary" onClick={event =>  window.location.href='/project/'+ (e.index + 1)} >Detail</button>
				),
				filterable: false,
				sortable: false
			}
		]

		return (
			<div>	 
				<h1>Projects</h1>				
				<Link className="btn btn-primary" to="/projects/add">Add New Project</Link>
				<div>
					<ReactTable data={tableData}
						columns={columns}
						filterable={true}
						defaultPageSize='10'
					/>
				</div>				
			</div>
		)
	}
}

export default ProjectDetail