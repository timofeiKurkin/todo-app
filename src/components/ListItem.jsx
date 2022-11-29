import React from "react";
import ItemToDo from "./ItemToDo";
import "../styles/ListItem.css"

/**
 * Функциональный компонент ListItem - выводит список to-do.
 *
 * @param {{file, dateComplete: string, description: string, completeStatus: boolean, id: number, title: string, idItem: string, length: number, map}} items
 * @param {function} remove
 * @param {boolean} loading
 * @param {function} setSelectToDo
 * @param db
 * @returns {JSX.Element}
 * @constructor
 */
const ListItem = ({items, remove, loading, setSelectToDo, db}) => {

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
						  items={items}
						  props={item}
						  remove={remove}
						  setSelectToDo={setSelectToDo}
						  db={db}
				/>
			)}
		</div>
	);
};

export default ListItem;