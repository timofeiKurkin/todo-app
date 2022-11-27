import React from "react";
import "../../styles/ui/CheckMark.css"

const CheckMark = ({handleCheck, status}) => {
	return (
		<button
			onClick={handleCheck}
			className={!status ? "no-active" : "is-active"}
		>
			✓
		</button>
	);
};

export default CheckMark;