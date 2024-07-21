export function debounce(fn: (...args: any[]) => void, delay: number) {
	let timeoutID: ReturnType<typeof setTimeout>;
	return (...args: any[]) => {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
