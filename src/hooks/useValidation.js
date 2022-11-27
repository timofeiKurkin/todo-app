import {useEffect, useState} from 'react';

const UseValidation = (value, validations) => {
	const [isEmpty, setEmpty] = useState(true)
	const [inputValid, setInputValid] = useState(false)

	const [isEmptyError, setEmptyError] = useState('')

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'isEmpty':
					if (value) {
						setEmpty(false)
						setEmptyError('')
					} else {
						setEmpty(true)
						setEmptyError('Поле не может быть пустым')
					}
					break

				default:
					return
			}
		}
	}, [value, validations])

	useEffect(() => {
		if (isEmpty) {
			setInputValid(false)
		} else {
			setInputValid(true)
		}
	}, [isEmpty])

	return {
		isEmpty,
		isEmptyError,
		inputValid
	}
};

export default UseValidation;