import {useState} from 'react';
import useLocalStorage from "./useLocalStorage";
import useValidation from "./useValidation";

const UseInput = (initialValue, key, validations) => {

	const [value, setValue] = useLocalStorage(key, initialValue)
	const [isDirty, setDirty] = useState(false)
	const inputValid = useValidation(value, validations)

	const onChange = (e) => {
		setValue(e.target.value)
	}

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