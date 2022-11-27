import React from "react";
import ItemToDo from "./ItemToDo";
import "../styles/ListItem.css"

const ListItem = ({items, remove, open, complete, loading}) => {

	if(loading) {
		return (
			<h2>Загрузка...</h2>
		)
	}

	if(!items.length) {
		return (
			<h1>У вас нету задач</h1>
		)
	}

	return (
		<div className="lists">
			{items.map((item) =>
				<ItemToDo key={item.id}
						  props={item}
						  remove={remove}
						  open={open}
						  complete={complete}
				/>
			)}
		</div>
	);
};

export default ListItem;