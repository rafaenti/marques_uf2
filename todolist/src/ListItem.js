import React, { Component } from 'react';

class ListItem extends Component {

	render (){
		return (
			<li>{this.props.item} <button className="delete">X</button></li>
		);
	}
}


export default ListItem;
