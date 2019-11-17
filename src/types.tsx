export type ValidationField = {
	id: string,
	value: string,
	compareToId?: string,
	passwordStrength?: number,
	inputType: 'password' | 'email' | 'text',
	validationType: 'password' | 'email' | 'compare' | 'userName',
	isValidated: boolean,
	placeholder: string,
	minLength: number,
	messages: {
		error: string,
		warning?: string
	}
}

export type RegisterSetting = {
	fieldsToValidate: Array<ValidationField>,
	registrationSent: boolean,
	registrationComplete: boolean
}

export type PassWordVariations = {
	digits: boolean,
	lower: boolean,
	upper: boolean,
	nonWords: boolean
}