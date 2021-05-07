import React, { Component } from 'react';

import ListItem from './ListItem';

import './TodoList.css';

class TodoList extends Component {

	constructor (props) {
		super(props);

		this.state = {
			items : [] 
		};

		this.last_id = 0;

		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);


		fetch("//10.40.2.110:8081/get_items")
				.then(res => res.json())
				.then(data => {
					data.forEach(item_l => {
						this.state.items.push({
							id: item_l.id,
							item:item_l.item
						});
					});

					this.setState({
						items: this.state.items
					});

					this.last_id = data[data.length-1].id;
				});
	}


	addItem (e) {
		e.preventDefault();

		let text_v = document.getElementById("text-task").value;

		document.getElementById("text-task").value = "";
		document.getElementById("text-task").focus();


		this.last_id++;

		this.state.items.push({id: this.last_id, item:text_v});
		console.log(this.state.items);

		this.setState({
			items: this.state.items
		});


		let item_data = JSON.stringify({
			id: this.last_id,
			item: text_v
		});

		fetch("//10.40.2.110:8081/submit", {
			method: "POST",
			headers: {
				'Content-Type':'text/json'
			},
			body: item_data
		});

	}

	removeItem (id_item) {
		console.log("Remove del parent "+id_item);

		for (let i = 0; i < this.state.items.length; i++){
			if (this.state.items[i].id === id_item){
				this.state.items.splice(i, 1);
				break;
			}
		}

		this.setState({
			items: this.state.items
		});
	}


	render (){
		let lista = this.state.items.map( (todo_item) => {
			return (<ListItem item={todo_item.item}
												id_item={todo_item.id}
												parentRemove={this.removeItem} />);
		});

		return (
		<div>
			<p>Num Items: NUM</p>
			<form onSubmit={this.addItem}>
				<p><input type="text" id="text-task" />
				<button type="submit">Añadir</button></p>
			</form>
			<ul>
				{lista}
			</ul>
		</div>
		);
	}
}


export default TodoList;
