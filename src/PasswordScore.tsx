import React from 'react'

export default function PasswordScore(props: {
	passwordStrength: number | undefined
}) {
	let passStrength = props.passwordStrength || 0;
		// slower status bar progression
		passStrength = passStrength * 0.85;
		// limit strength to 1 and 100		
		passStrength = passStrength < 1 ? 1 : passStrength;
		passStrength = passStrength > 100 ? 100 : passStrength;
		// set red & green values
		let redValue = passStrength < 50 ? 255 : 255 - (passStrength - 50) * 5.1;
		let greenValue = 200 * passStrength / 100;
		// set dynamic tyles for password bar
		const passwordBarStyle = {
			backgroundColor: 'rgb(' + redValue + ',' + greenValue + ',0)',
			width: passStrength + '%'
		}
	return (
		<div className={"password-score-slider"}>
			<div className="password-score-wrapper">
				<div className="password-score-bar" style={passwordBarStyle}></div>
			</div>
		</div>
	)
}
