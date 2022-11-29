import React, {useEffect} from "react";
import "../styles/ItemToDo.css"
import dayjs from "dayjs";
import CheckMark from "./ui/CheckMark";
import {doc, updateDoc} from "firebase/firestore";
import {getOneData, TODOS_PATH} from "../firebase";

/**
 *
 * @param {{file, dateComplete: (string|*), description: string, completeStatus: (boolean|*), id: number, title: string, idItem: string}} props
 * @param {function} remove
 * @param db
 * @param {function} setSelectToDo
 * @param items
 * @returns {JSX.Element}
 * @constructor
 */
const ItemToDo = ({props, remove, db, setSelectToDo, items}) => {

	/**
	 * Парсим дату в нужный вид.
	 * @type {string}
	 */
	const dateParse = dayjs(props.dateComplete).format("DD.MM.YYYY")

	/**
	 * Переменные для парсинга даты в нужный вид
	 *
	 * @type {string}
	 */
	const dateParseSecond = dayjs(props.dateComplete).format("YYYY-MM-DD")
	const unixDate = dayjs().unix()
	const dateCompleteUnix = dayjs(dateParseSecond).unix()
	const dateTimeOut = (dateCompleteUnix - unixDate) * 1000

	/**
	 * Если статус !false => сработает setTimeout, а как время передаю dateTimeOut, который является разницей двух дат
	 */
	useEffect(() => {
		if(!props.completeStatus && dateTimeOut > 0) {
			setTimeout(() => {
				completeTask().then()
			}, dateTimeOut)
		}
	}, [])

	/**
	 * Функция для открытия определенного to-do.
	 * @param {{file, dateComplete: (string|*), description: string, completeStatus: (boolean|*), id: number, title: string, idItem: string}} item
	 */
	const openToDo = (item) => {
		setSelectToDo(items.filter(i => i.idItem === item.idItem))
	}

	/**
	 * Функция для обозначения выполненного to-do.
	 // * @param {{file, dateComplete: (string|*), description, completeStatus: (boolean|*), id, title, idItem}} props - Конкретный объект.
	 * @param {ChangeEvent<HTMLSelectElement>} e - Событие
	 * @returns {Promise<void>}
	 */
	const completeTask = async () => {
		/**
		 * Переменная с idItem - данный id соответствует, тому что на сервере.
		 * @type {string}
		 */
		const idItem = props.idItem

		/**
		 * Создаем пустой объект в который запишем изменения.
		 * @type {{}}
		 */
		let todo = {
			...props,
			id: props.id,
			completeStatus: !props.completeStatus
		}

		/**
		 * Вызываем функцию для записи изменения определенного to-do по его idItem.
		 */
		await updateDoc(doc(db, TODOS_PATH, idItem), todo)

		/**
		 * Получаем данные определенного to-do, для визуального обновления открытого to-do.
		 */
		getOneData(idItem, setSelectToDo)
	}

	/**
	 * В переменную помещаем объект с полем file.
	 */
	const file = [props.file]

	return (
		<div className={props.completeStatus ? "item-todo is-active-item" : "item-todo no-active-item"}>
			<div className="item-todo__wrapper">
				<div className="item-todo__text">
					<div className="item-todo__complete">
						<CheckMark handleCheck={completeTask} status={props.completeStatus}/>
					</div>

					<div className="item-todo__content" onClick={() => openToDo(props)}>
						<div className="item-todo__title">
							<h2>{props.title}</h2>
						</div>

						<div className="item-todo__text-wrapper">
							<p className="item-todo__p">{props.description}</p>
						</div>

						{props.dateComplete &&
							<div className="item-todo__date-wrapper">
								<p>Дата выполнения: <span>{dateParse}</span></p>
							</div>}

						{!!props.file && file.map((item, index) =>
							<div key={index}>
								Прикрепленный файл: {item.name}
							</div>
						)
						}

					</div>
				</div>

				<div className="item-todo__close" onClick={() => remove(props)}>
					<svg viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8 8L148 148" stroke="white" strokeWidth="25"/>
						<path d="M148 8L7.99999 148" stroke="white" strokeWidth="25"/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default ItemToDo;