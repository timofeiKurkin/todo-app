import React from "react";
import "../../styles/ui/Button.css"

const Button = ({children, onClick, disabled}) => {
	return (
		<button disabled={disabled}
				onClick={onClick && onClick}
				className="button"
		>
			{children}
		</button>
	);
};

export default Button;