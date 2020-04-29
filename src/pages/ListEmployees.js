import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { getUser } from '../utils/apiCalls';
class ListEmployees extends Component {
	constructor(props){
		super(props);		
		this.state = {
			requiredItem: 0,
			tableData: [{
				ID: '',
				email: '',
				name: '',
				phone: '',
				birthday: '',                    
			}],
		};
	}
	
	componentDidMount (){
		getUser().then(res => res.json()).then(res => {			
			this.setState({tableData: res})
		})
	}	

	handleButtonClick = (e, row) => {
		console.log(e.index);
	}; 

	render() {		
		const { tableData } = this.state;					
		const columns = [
			{
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Phone',
				accessor: 'phone'
			},
			{
				Header: 'Birthday',
				accessor: 'birthday'
			},
			{
				Header: 'Name',
				accessor: 'name'
			},			
			{
				Header: '',								
				Cell : (e, id) => (									
					<button className="btn btn-primary" onClick={event =>  window.location.href='/employees/update/'+ (e.index + 1)} >Update</button>
				),				
				filterable: false,
				sortable: false
			},
			{
				Header: '',
				Cell : (e, id) => (									
					<button className="btn btn-primary" onClick={event =>  window.location.href='/assign_project/'+ (e.index + 1)} >Assign project</button>
				),
				filterable: false,
				sortable: false
			}
		]		
		return (
			<div>	
				<h1>List Of Employees</h1>
				<Link className="btn btn-primary" to="/employees/add">Add New Employee</Link>				
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

export default ListEmployees