import React, {PropTypes as t, Component} from 'react';
import {connect} from 'react-redux';
import join from 'classnames';
import autobind from 'autobind-decorator';

import markBlock from '../../actions/mark-block';
import Block from './block';
import BlockColumn from './block-column';

@autobind
class PatternDependencies extends Component {
	static propTypes = {
		activeBlock: t.string,
		base: t.string.isRequired,
		className: t.string,
		dispatch: t.func.isRequired,
		id: t.string.isRequired,
		name: t.string.isRequired,
		dependencies: t.arrayOf(t.shape({
			name: t.string.isRequired,
			id: t.string.isRequired
		})).isRequired,
		dependents: t.arrayOf(t.shape({
			name: t.string.isRequired,
			id: t.string.isRequired
		})).isRequired,
		location: t.shape({
			pathname: t.string,
			query: t.any
		})
	};

	static contextTypes = {
		router: t.any
	};

	handleClick(props) {
		const {id, base} = props;
		const {location} = this.props;
		const {router} = this.context;
		router.push({
			pathname: `${base}pattern/${id}`,
			query: location.query
		});
	}

	handleMouseEnter(id) {
		const {dispatch} = this.props;
		dispatch(markBlock({id, active: true}));
	}

	handleMouseLeave(id) {
		const {dispatch} = this.props;
		dispatch(markBlock({id, active: false}));
	}

	render() {
		const {
			activeBlock,
			className: passedClassName,
			dependencies,
			dependents,
			id,
			base,
			name,
			location
		} = this.props;

		const className = join('pattern-dependencies', passedClassName);

		const blockHeight = 4;
		const center = 50;
		const rootWidth = Math.max(5, name.length * 1.25);
		const paddingX = 1;
		const rootY = 1;
		const columnY = 2;
		const offsetY = Math.max(rootY, columnY);
		const rootHeight = blockHeight;
		const rootYCenter = rootY + rootHeight / 2;
		const blockSpace = blockHeight + 1;
		const viewBoxHeight = Math.max(Math.max(dependencies.length, dependents.length) * blockSpace + offsetY + 2, blockSpace + offsetY + 2);

		return (
			<div className={className}>
				<svg viewBox={`0 0 100 ${viewBoxHeight}`} className="pattern-dependencies__stage">
					<BlockColumn
						activeBlock={activeBlock}
						items={dependencies}
						base={base}
						y={columnY}
						x={paddingX}
						height={blockHeight}
						onClick={this.handleClick}
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}
						description="provides for"
						location={location}
						connect={{x: center - rootWidth / 2, y: rootYCenter}}
						/>
					<BlockColumn
						activeBlock={activeBlock}
						items={dependents}
						base={base}
						y={columnY}
						x={100}
						height={blockHeight}
						onClick={this.handleClick}
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}
						align="right"
						description="provides for"
						location={location}
						connect={{x: center + rootWidth / 2, y: rootYCenter}}
						/>
					<Block
						type="root"
						name={name}
						id={id}
						x={50 - rootWidth / 2}
						y={rootY}
						height={rootHeight}
						width={rootWidth}
						location={location}
						base={base}
						/>
				</svg>
			</div>
		);
	}
}

export default connect(({activeBlock}) => {
	return {activeBlock};
})(PatternDependencies);
