import React, { Component } from 'react';

import ListItem from './ListItem';

class TodoList extends Component {

	constructor (props) {
		super(props);

		this.state = {
			items : [] 
		};

		this.addItem = this.addItem.bind(this);
	}


	addItem (e) {
		e.preventDefault();

		let text_v = document.getElementById("text-task").value;


		this.state.items.push({id: 10, item:text_v});
		console.log(this.state.items);

		this.setState({
			items: this.state.items
		});

	}

	render (){
		let lista = this.state.items.map( (todo_item) => {
			return (<ListItem item={todo_item.item}/>);
		});

		return (
		<div>
			<ul>
				{lista}
			</ul>
			<form onSubmit={this.addItem}>
				<p><input type="text" id="text-task" /></p>
				<p><button type="submit">Añadir</button></p>
			</form>
		</div>
		);
	}
}


export default TodoList;
