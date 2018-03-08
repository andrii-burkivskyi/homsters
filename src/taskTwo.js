const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const isPrimitive = (value) => typeof value === 'string' ||
																typeof value === 'number' ||
																value == null ||
																typeof value === 'boolean';
const isArray = (arr) => Array.isArray(arr);

const isArrayWithPrimitives = (arr) => arr.every((item) => isPrimitive(item));

export const handleData = (data, name='') => {
	if (isPrimitive(data)) {
		return { [name]: data };
	}

	if (isArray(data)) {
		if (isArrayWithPrimitives(data)) {
			return { [name]: data }
		} 

		return data.reduce((acc, item) => {
			if (isPrimitive(item)) {
				return { ...acc, [(name && `${name}${name ? capitalize(String(item)) : String(item)}`)]: item }
			}

			if (isArray(item)) {
				return { ...acc, ...handleData(item, `${name}[]`) };
			} 

			return { ...acc, ...handleData(item, name) }
		}, {});
	}

	return Object.keys(data).reduce((acc, key) => ({
			...acc,
			...handleData(data[key], (`${name}${name ? capitalize(key) : key}`) )
		}), {})
}

