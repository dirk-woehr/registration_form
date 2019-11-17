import React from 'react';
import './ValidatedInput.css';
import PasswordScore from './PasswordScore';
import { ValidationField } from './types';
export default function ValidatedInput( props: {
	tabIndex: number,
	fieldSetting: ValidationField,
	liveCheckField:Function
}) {

	// set status booleans and classes
	const isValidated = props.fieldSetting.isValidated;
	const inValidClass = isValidated ? '' : ' invalid';
	const hasMinLength = props.fieldSetting.value.length >= props.fieldSetting.minLength;
	const validClass = (isValidated && hasMinLength) ? ' valid' : '';
	const isPassword = props.fieldSetting.validationType === 'password';
	// set password score if needed
	const passwordScore = isPassword ? <PasswordScore password={props.fieldSetting.value} /> : <></>;
	
	return (
		<div className={"input-wrapper" + inValidClass}>
			<div className="input-border-start"></div>
			<div className="input-center">
				<input 
					className={validClass}
					type={props.fieldSetting.inputType}
					value={props.fieldSetting.value}
					tabIndex={props.tabIndex}
					placeholder={props.fieldSetting.placeholder}
					onChange={e => {
						props.liveCheckField( 
							props.fieldSetting.id,
							e.target.value
						)
					}}
					onFocus={e => {
						props.liveCheckField( 
							props.fieldSetting.id,
							e.target.value
						)
					}}
				></input>
				<div className="input-message-slider">
					<div className="input-message-box">
						<span className="input-message-error">
							{props.fieldSetting.messages.error}
						</span>
					</div>
				</div>
				{passwordScore}
			</div>
			<div className="input-border-end"></div>
		</div>
	)
}
