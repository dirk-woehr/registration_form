import React, { useState } from 'react'
import ValidatedInput from './ValidatedInput';
import LdsRoller from './LdsRoller';
import LdsHeart from './LdsHeart';
import { RegisterSetting, ValidationField } from './types';
import './RegisterForm.css';
import './LdsRoller.css';
import './LdsHeart.css';
import logo from './gog_logo.png';

export default function RegisterForm() {
	// initial State
	const setValidValues = true;
	const initialSettings:RegisterSetting = {
		fieldsToValidate: [
			{
				id: '1',
				value: setValidValues ? 'asdefre8' : '',
				inputType: 'text',
				validationType: 'userName',
				isValidated: true,
				placeholder: 'Please enter a username',
				minLength: 8,
				messages: {
					error: 'Must be at least 8 characters long'
				}
			},
			{
				id: '2',
				value: setValidValues ? '1!aAaaaa' : '',
				inputType: 'password',
				validationType: 'password',
				isValidated: true,
				placeholder: 'Please enter a password',
				minLength: 8,
				messages: {
					error: 'Must be 8 characters or more and contain at least one of each: Upper- and lowercase characters, number, special characters'
				}
			},
			{
				id: '3',
				value: setValidValues ? '1!aAaaaa' : '',
				compareToId: '2',
				inputType: 'password',
				validationType: 'compare',
				isValidated: true,
				placeholder: 'Please repeat your password',
				minLength: 0,
				messages: {
					error: 'Must match password'
				}
			},
			{
				id: '4',
				value: setValidValues ? 'tester.testington@example.org' : '',
				inputType: 'email',
				validationType: 'email',
				isValidated: true,
				placeholder: 'Please enter your e-mail-address',
				minLength: 0,
				messages: {
					error: 'E-mail address must be a valid e-mail'
				}
			}
		],
		registrationSent: false,
		registrationComplete: false

	}

	// set initial state
	const [registerState, setRegisterState] = useState(initialSettings);
	
	// validate fields by validation type
	const validateField = (fieldToValidate:ValidationField) => {
		let hasMinLength = false;
		switch (fieldToValidate.validationType) {
			case 'userName':
				// only check for length
				hasMinLength = fieldToValidate.value.length >= fieldToValidate.minLength;
				// set field status
				fieldToValidate.isValidated = hasMinLength;
				break;
			case 'password':
				// check for length
				hasMinLength = fieldToValidate.value.length >= fieldToValidate.minLength;
				// check if all necessary characters exist
				let hasAllCharacters = validatePassword(fieldToValidate.value);
				// set field status
				fieldToValidate.isValidated = hasMinLength && hasAllCharacters;
				break;
			case 'compare':
				// get field to compate to from state
				let fieldToCompare = registerState.fieldsToValidate.find( field => {
					return field.id === fieldToValidate.compareToId;
				});
				if(typeof fieldToCompare !== 'undefined') {
					// set field status
					fieldToValidate.isValidated = fieldToCompare.value === fieldToValidate.value;			
				}
				break;
			case 'email':
				// set field status with validation result
				fieldToValidate.isValidated = validateEmail(fieldToValidate.value);
				break;
			default:
				break;
		}
	};

	// regex-check for email
	function validateEmail(email:string) {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	// regex check for password
	function validatePassword(password:string) {
		let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
		return re.test(String(password));
	}

	// pass through method for event calls from form fields
	const liveCheckField = (id:string, newValue:string) => {
		let newState = {...registerState};
		
		// get field object from duplicated state
		let fieldToCheck = newState.fieldsToValidate.find( field => {
			return field.id === id;
		});

		if(typeof fieldToCheck !== 'undefined') {
			// set field value to current value
			fieldToCheck.value = newValue;
			// validate updated field
			validateField(fieldToCheck);			
		}
		// update state
		setRegisterState(newState);
	}

	// dummy method to simulate server response
	const completeRagistration = (dummy:any) => {
		let newState = {...registerState};
		newState.registrationComplete = true;
		setRegisterState(newState);
	}

	// async method to simulate API call
	async function simulateAPIcall() {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => resolve("done!"), 3000)
		});
		
		let result = await promise;
		// simulate success response
		completeRagistration(result);
	}

	// complete form
	const sendRegistration = (e:any) => {
		e.preventDefault();
		let newState = {...registerState};
		// validate all fields
		newState.fieldsToValidate.forEach(field => {
			validateField(field);
		});
		// check there are still invalid fields
		let invalidelement = newState.fieldsToValidate.find( field => {
			return !field.isValidated;
		});

		// if no invalid fields have been found, update state status
		if(typeof invalidelement === 'undefined') {
			newState.registrationSent = true;
			simulateAPIcall();
		}
		
		// set new state
		setRegisterState(newState);
	}

	// define class for state status
	let statusClass = '';
	if(registerState.registrationSent && !registerState.registrationComplete) {
		statusClass = ' status-sent';
	} else if(registerState.registrationComplete) {
		statusClass = ' status-complete';
	}

	return (
		<div className="main-wrapper">
			<div className={"form-wrapper" + statusClass}>
				<div id="logo-container">
					<img
						src={logo}
						alt="GOG Logo"
						id="logo"
					></img>
				</div>
				<form>
					{
						registerState.fieldsToValidate.map( (fieldSetting, index) => {
							return <ValidatedInput 
								key={fieldSetting.id}
								tabIndex={index+1}
								fieldSetting={fieldSetting}
								liveCheckField={liveCheckField}
							/>
						})
					}
					<button 
						tabIndex={registerState.fieldsToValidate.length + 1}
						onClick={sendRegistration}
					>
						<span>Submit registration</span>
					</button>
				</form>
				<div className="contact-server-slider">
					<div className="contact-server-wrapper">
						<LdsRoller />
						<div className="contact-server-text">Contacting server</div>
					</div>
				</div>
				<div className="success-slider">
					<div className="success-wrapper">
						<LdsHeart />
						<div className="success-text">Great success!</div>
					</div>
				</div>
			</div>
		</div>
	)
}
