export const isArray = Array.isArray;

export const isObject = (arg: any): arg is Record<PropertyKey, any> => {
	if (typeof arg !== 'object') return false;
	if (arg === null) return false;
	if (isArray(arg)) return false;

	return true;
};
