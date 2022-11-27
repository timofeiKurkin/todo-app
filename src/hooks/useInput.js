import {useState} from 'react';
import useLocalStorage from "./useLocalStorage";
import useValidation from "./useValidation";

/**
 *
 * @param {string} initialValue - Начальное значение.
 * @param {string} key - Ключ для поиска в локальном хранилище браузера.
 * @param {{isEmpty: true}} validations - Объект с ключом для валидации, проверяет пустое ли поле.
 * @returns {{onBlur: onBlur, isDirty: boolean, onChange: onChange, isEmpty: boolean, value: *, inputValid: boolean, isEmptyError: string}}
 * @constructor
 */
const UseInput = (initialValue, key, validations) => {

	/**
	 * Получаем данные из локального хранилища с помощью самописного хука. В хук передаем наш ключ, и начальное значение, а из него получаем value.
	 */
	const [value, setValue] = useLocalStorage(key, initialValue)

	/**
	 * Состояние, отслеживающие кликнули ли мы по инпуту или нет.
	 */
	const [isDirty, setDirty] = useState(false)
	/**
	 * Переменная хранящая весь наш возвращаемый объект из хука валидации. Передаем в параметры value из хранилища, и объект с ключом валидации.
	 * @type {{isEmpty: boolean, inputValid: boolean, isEmptyError: string}}
	 */
	const inputValid = useValidation(value, validations)

	/**
	 * Записываем полученные данные в локальное хранилище.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - Событие.
	 */
	const onChange = (e) => {
		setValue(e.target.value)
	}

	/**
	 * Кликаем по инпуту и меняем состояние.
	 */
	const onBlur = () => {
		setDirty(true)
	}

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...inputValid
	}
};

export default UseInput;