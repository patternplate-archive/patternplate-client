import React from 'react';
import styled, {injectGlobal} from 'styled-components';

const Dot = styled.div`
	position: relative;
	flex-grow: 0;
	flex-shrink: 0;
	height: 7.5px;
	width: 7.5px;
	margin: 0 10px;
	border-radius: 50%;
	background: #42A5F5;
	transition: background .4s ease-in-out, opacity .5s ease-in;
	${props => getGlow(props)}
`;

const Indicator = styled.div`
	display: flex;
	align-items: center;
`;

const Label = styled.div`
	${props => getOut(props)}
`;

export default props => {
	return (
		<Indicator>
			<Label status={props.status}>{getLabel(props)}</Label>
			<Dot status={props.status}/>
		</Indicator>
	);
};

function getGlow(props) {
	return `
		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			height: 12px;
			width: 12px;
			filter: blur(3px);
			background: ${props.status === 'stale' ? 'grey' : 'inherit'};
			transform: translate(-50%, -50%);
			opacity: .6;
			${getPulse(props)};
		}
	`;
}

function getOut(props) {
	if (props.status !== 'loaded') {
		return;
	}

	injectGlobal`
		@keyframes out {
			to {
				opacity: 0;
			}
		}
	`;

	return `
		animation: out 1s .15s;
		animation-fill-mode: forwards;
	`;
}

function getLabel(props) {
	return props.status === 'loaded' ? 'synced' : 'syncing';
}

function getPulse(props) {
	if (props.status !== 'loading') {
		return;
	}

	injectGlobal`
		@keyframes pulse {
			from {
				opacity: .6;
				transform: translate(-50%, -50%) scale(1);
			}
			50% {
				opacity: 0;
				transform: translate(-50%, -50%) scale(.75);
			}
			to {
				opacity: .6;
				transform: translate(-50%, -50%) scale(1);
			}
		}
	`;

	return `
		animation: pulse 1s infinite;
	`;
}
