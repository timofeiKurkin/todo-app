import React from "react";
import ItemToDo from "./ItemToDo";
import "../styles/ListItem.css"

/**
 * Функциональный компонент ListItem - выводит список to-do.
 *
 * @param {{file, dateComplete: string, description: string, completeStatus: boolean, id: number, title: string, idItem: string}} items
 * @param {function} remove
 * @param {function} open
 * @param {function} complete
 * @param {boolean} loading
 * @returns {JSX.Element}
 * @constructor
 */
const ListItem = ({items, remove, open, complete, loading}) => {

	/**
	 * Если loading = true, то возвращаем тег с загрузкой
	 */
	if(loading) {
		return (
			<h2>Загрузка...</h2>
		)
	}


	/**
	 * Если задач нет, то выводим соответсвующий элемент
	 */
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