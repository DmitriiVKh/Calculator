import './App.css';
import { useState } from 'react';
import { evaluate } from 'mathjs';

export const App = () => {
	const digitButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	const [currentState, setCurrentState] = useState('');
	const [result, setResult] = useState(0);
	const [resultDisplay, setResultDisplay] = useState(false);

	// Обработчики событий
	//Кнопки цифр
	const digitClick = (digit) => {
		setCurrentState(currentState + digit);
	};

	// Кнопка+
	const plusClick = () => {
		setCurrentState(currentState + '+');
		setResultDisplay(false);
	};

	//Кнопка-
	const minusClick = () => {
		setCurrentState(currentState + '-');
		setResultDisplay(false);
	};

	//Кнопка=
	const equalsClick = () => {
		try {
			const calculateResult = evaluate(currentState);
			setResult(calculateResult);
			setResultDisplay(true);
		} catch (error) {
			alert('Ошибка');
		}
	};

	//Кнопка C
	const resetClick = () => {
		setCurrentState('');
		setResult(0);
		setResultDisplay(false);
	};

	return (
		<div className="calculator">
			<div className={resultDisplay ? 'result' : 'display'}>
				<div>Текущее значение: {currentState}</div>
				<div>Результат: {result}</div>
			</div>

			<div className="buttons">
				{digitButtons.map((button, index) => (
					<button
						key={index}
						onClick={() => {
							if (Number.isInteger(button)) {
								digitClick(button.toString());
							}
						}}
					>
						{button}
					</button>
				))}
				<button onClick={plusClick}>+</button>
				<button onClick={minusClick}>-</button>
				<button onClick={equalsClick}>=</button>
				<button onClick={resetClick}>C</button>
			</div>
		</div>
	);
};
