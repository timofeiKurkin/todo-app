import React, {useState} from "react";
import "../styles/OpenItem.css"
import CreateInput from "./ui/CreateInput";
import CreateTextarea from "./ui/CreateTextarea";
import Button from "./ui/Button";
import dayjs from "dayjs";
import CheckMark from "./ui/CheckMark";

const OpenItem = ({props, remove, save, toDay}) => {
	const [editToDoStatus, setEditToDoStatus] = useState(false)
	const statusDate = true
	const [editToDo, setEditToDo] = useState({
		idItem: "",
		title: "",
		description: "",
		dateComplete: "",
		completeStatus: false
	})

	const handleOpen = (item) => {
		setEditToDo({
			idItem: item.idItem,
			title: item.title,
			description: item.description,
			dateComplete: item.dateComplete,
			completeStatus: item.completeStatus
		})
		setEditToDoStatus(!editToDoStatus)
	}

	if (!props.length) {
		return (
			<h2 className="open__welcome">
				Добро пожаловать в ваш To-Do список
			</h2>
		)
	}

	const completeStatusHandle = (e) => {
		e.preventDefault()
		setEditToDo({...editToDo, completeStatus: !editToDo.completeStatus})
	}

	const saveHandle = (e) => {
		e.preventDefault()
		setEditToDoStatus(!editToDoStatus)

		const edit = {
			idItem: editToDo.idItem,
			title: editToDo.title,
			description: editToDo.description,
			dateComplete: editToDo.dateComplete,
			completeStatus: (toDay >= editToDo.dateComplete) ? statusDate : editToDo.completeStatus
		}
		save(edit)
	}

	return (
		<div>
			{props.map((item) =>
				!editToDoStatus ?

					item && <div className="open" key={item.id}>
						<div className="open__wrapper">
							<div className="open__complete">
								{item.completeStatus ?
									<div className="open__complete-true">Выполнено</div>
									:
									<div className="open__complete-false">Не выполнено</div>}
							</div>

							<div className="open__content">
								<div className="open__title">
									<h2>{item.title}</h2>
								</div>
								<div className="open__text-wrapper">
									<p className="open__text">{item.description}</p>
								</div>
								{
									item.dateComplete &&
									<div className="open__date-wrapper">
										<p className="open__date">Дата выполнения: <span className="open__date-span">{dayjs(item.dateComplete).format("DD.MM.YYYY")}</span></p>
									</div>
								}

							</div>


							<div className="open__buttons">
								<Button onClick={e => handleOpen(item)}>
									Редактировать
								</Button>

								<div className="open__close" onClick={e => remove(item)}>
									<div className="open__close-text">
										Удалить
									</div>

									<div className="open__close-icon">
										<svg viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 8L148 148" stroke="black" strokeWidth="25"/>
											<path d="M148 8L7.99999 148" stroke="black" strokeWidth="25"/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>

					:

					<div className="open-edit" key={item.id}>
						<div className="open-edit__wrapper">
							<form className="open-edit__text" onSubmit={saveHandle}>
								<div className="open-edit__complete">
									<CheckMark handleCheck={e => completeStatusHandle(e)}
											   status={editToDo.completeStatus}/>
									{editToDo.completeStatus ?
										<div className="open__complete-true">Выполнено</div>
										:
										<div className="open__complete-false">Не выполнено</div>}
								</div>

								<div className="open-edit__content">
									<div className="open-edit__title">
										<CreateInput type="text"
													 value={editToDo.title}
													 onChange={e => setEditToDo({...editToDo, title: e.target.value})}
										/>
									</div>

									<div>
										<input type="date"
											   value={editToDo.dateComplete}
											   onChange={e => setEditToDo({
												   ...editToDo,
												   dateComplete: e.target.value
											   })}
										/>
									</div>

									<div className="open-edit__text-wrapper">
										<CreateTextarea type="text"
														value={editToDo.description}
														onChange={e => setEditToDo({
															...editToDo,
															description: e.target.value
														})}
										/>
									</div>
								</div>

								<div className="open-edit__buttons">
									<Button
										disabled={!editToDo.title || !editToDo.description || !editToDo.dateComplete}
									>
										Сохранить
									</Button>

									<div onClick={e => setEditToDoStatus(!editToDoStatus)}>
										Отмена
									</div>
								</div>
							</form>
						</div>
					</div>
			)}
		</div>
	);
};

export default OpenItem;