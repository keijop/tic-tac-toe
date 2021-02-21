

function Board(props) {

	//cells arr populated with numbered items 1 to 9 (board cells)
	//return board div with 9 cell div, each with cross and circle div elements inside (these are for css)
	let cells = [];
	for (var i = 1; i <= 9; i++) {
		
			cells.push(
				<div className={`cell no${i}`} key={i} onClick={props.cellClick}>
		        	<div className="mark cross axis1"/>
		        	<div className="mark cross axis2"/>
		        	<div className="mark circle outer"/>
		        	<div className="mark circle inner"/>
      			</div>
      		);
		};

	return(
		<div className="board">
			{cells}
		</div>
		);
};

export default Board;
