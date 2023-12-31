import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

ClickOutsideHandler.propTypes = {
	children: PropTypes.node,
	outsideFunction: PropTypes.func,
	className: PropTypes.string,
};

function ClickOutsideHandler({ children, outsideFunction, className }) {
	const wrapperRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				outsideFunction && outsideFunction();
			}
		};
		document.addEventListener('click', handleClickOutside, true);
		return () =>
			document.removeEventListener('click', handleClickOutside, true);
	}, [outsideFunction]);
	return (
		<div className={className} ref={wrapperRef}>
			{children}
		</div>
	);
}

export default ClickOutsideHandler;
