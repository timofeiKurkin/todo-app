import React from "react";
import useInput from "../hooks/useInput";
import CreateInput from "./ui/CreateInput";
import CreateTextarea from "./ui/CreateTextarea";
import Button from "./ui/Button";
import "../styles/FormInput.css"

const FormInputs = ({createToDo}) => {
	const title = useInput("", "title", {isEmpty: true})
	const description = useInput("", "description", {isEmpty: true})
	const date = useInput("", "date", {isEmpty: true})
	const statusDate = false

	const clearLocalStorage = () => {
		localStorage.clear()
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const newToDo = {
			id: Date.now(),
			title: title.value,
			description: description.value,
			dateComplete: date.value,
			completeStatus: statusDate
		}
		createToDo(newToDo)
	}

	return (
		<div className="form">
			<div className="form__title">
				<h1>Создать To-Do...</h1>
			</div>
			<form className="form__body" onSubmit={handleSubmit}>

				<div className="form__inputBody">

					<div className="form__input">
						<CreateInput onChange={title.onChange}
									 onBlur={title.onBlur}
									 value={title.value}
									 name="title"
									 place="Название"
						/>
					</div>

					<div>
						<input type="date"
							   value={date.value}
							   onChange={e => date.onChange(e)}
						/>
					</div>

					<div className="form__textarea">
						<CreateTextarea
							onChange={description.onChange}
							onBlur={description.onBlur}
							value={description.value}
							name="description"
							type="text"
							place="Описание"

						/>
					</div>
				</div>

				<Button
					disabled={!title.inputValid || !description.inputValid || !date.value}
					onClick={e => clearLocalStorage()}
				>Добавить
				</Button>
			</form>
		</div>
	);
};

export default FormInputs;