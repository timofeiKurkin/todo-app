import React from "react";
import "../styles/ItemToDo.css"
import dayjs from "dayjs";
import CheckMark from "./ui/CheckMark";

const ItemToDo = ({props, remove, open, complete}) => {
	const dateParse = dayjs(props.dateComplete).format("DD.MM.YYYY")

	const handleCheck = () => {
		complete(props, props.completeStatus)
	}

	return (
		<div className={props.completeStatus ? "item-todo is-active-item" : "item-todo no-active-item"}>
			<div className="item-todo__wrapper">
				<div className="item-todo__text">
					<div className="item-todo__complete">
						<CheckMark handleCheck={handleCheck} status={props.completeStatus}/>
					</div>

					<div className="item-todo__content" onClick={() => open(props)}>
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