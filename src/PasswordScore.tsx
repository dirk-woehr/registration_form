import React from 'react'
import { PassWordVariations } from './types';

export default function PasswordScore(props: {
	password: string
}) {
	
	// score password for status bar
	function scorePassword(password:string) {
		let score:number = 0;
		if (!password)
			return score;
	
		// award every unique letter until 5 repetitions
		let letters = new Map();
		for (var i=0; i<password.length; i++) {
			if(letters.has(password[i])) {
				letters.set(password[i], letters.get(password[i]) + 1);
			} else {
				letters.set(password[i], 1);
			}
			score += 5.0 / letters.get(password[i]);
		}
		console.log(letters);
	
		// bonus points for mixing it up
		var variations:PassWordVariations = {
			digits: /\d/.test(password),
			lower: /[a-z]/.test(password),
			upper: /[A-Z]/.test(password),
			nonWords: /\W/.test(password)
		}
	
		let variationCount = 0;

		const keys = Object.keys(variations)
		const values:Array<boolean> = keys.map(key => Reflect.get(variations,key));
		values.forEach( check => {
			variationCount += check ? 1 : 0;
		});
    	score += (variationCount - 1) * 10;
	
		return score;
	}

	let passStrength = scorePassword(props.password);
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
