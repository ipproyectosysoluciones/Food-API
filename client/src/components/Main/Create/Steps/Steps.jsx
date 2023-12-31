import React, { useState, useEffect } from "react";
import style from './Steps.module.css';

export default function Steps( props ) {

	const { currentSteps, addStep, deleteStep, resetStep, deleteStepByN } = props;
	const [ step, setStep ] = useState("");
	const [ disabledAdd, setDisabledAdd ] = useState( true );
	const [ disabledRD, setDisabledRD ] = useState( false );

	useEffect( () => {
		( currentSteps.length ) 
		? setDisabledRD( false ) 
		: setDisabledRD( true );
	}, [ setDisabledRD, currentSteps ] );

	useEffect( () => {
		( (!/^\s*$/.test( step )) ) 
		?  setDisabledAdd( false ) 
		: setDisabledAdd( true )
	}, [ step ] );

	const changeHandler = ( event ) => {
		setStep( event.target.value );
	}

	const pressAdd = ( event ) => {
		event.preventDefault();

		if ( step !== "" ) {
			addStep( step );
			setStep( "" );
		}
	}

	const pressReset = ( event ) => {
		event.preventDefault();
		resetStep();
	}

	const pressDelete = ( event ) => {
		event.preventDefault();
		deleteStep();
	}

	const pressDeleteStep = ( event ) => {
		event.preventDefault();

		deleteStepByN( event.target.value );
	}

	return (
		<div className={ style.stepsConteiner }>
			<label>
				<h3>Pasos</h3>

				<textarea 
					className={ style.textarea }
					value={ step }
					onChange={ changeHandler }
					onKeyDown={ event => ( event.key === "Enter" ) ? pressAdd( event ) : null }
				/>
				<div>
					<button 
						className={ `${style.button} ${ !disabledRD? null : style.buttonDisable }` } 
						onClick={ pressReset }
					>Borrar Todo
					</button>
					<button 
						className={ `${ style.button } ${ !disabledRD ? null : style.buttonDisable }` }
						disabled={ disabledRD } 
						onClick={ pressDelete }
					>Borrar Ultima
					</button>
					<button 
						className={ `${ style.button } ${ !disabledAdd ? null : style.buttonDisable }` } 
						disabled={ disabledAdd } 
						onClick={ pressAdd }
					>Agregar
					</button>
				</div>
			</label>

			<div className={ style.currentSteps }>
				<h3>Lista de pasos:</h3>
				<div >
					{
						currentSteps[ 0 ] ? currentSteps.map( ( [ key, value ] ) => 
							<span key={ key }>
							<button 
								className={ style.buttonSteps } 
								value={ key } 
								onClick={ pressDeleteStep }
							>X
							</button>
							{ key + " - " + value }
						</span> ) :
						<span>No hay pasos</span>
					}
				</div>
			</div>
		</div>
	)
};