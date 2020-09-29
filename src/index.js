import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
   
     
      return (
          <button className="square" 
          onClick= { props.onClick }>
          {props.value}
        </button>
      );
    }
  


  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares : Array(9).fill(null),
        leBoolean : true,
      };
      }
      
    handleClick(i){
      const squaress = this.state.squares.slice()
      if (calculateWinner(squaress) || squaress[i]) {
        return;
      }
          squaress[i]= this.state.leBoolean ? "X" : "O"
          this.setState({squares : squaress,
                        leBoolean : !this.state.leBoolean,}  /*Passer le boolean de true a false et inversement : https://stackoverflow.com/questions/11604409/how-to-toggle-a-boolean*/
          
        )
    }  

    renderSquare(i) {
      return (<Square value={this.state.squares[i]}
        onClick={()=>this.handleClick(i)}
      />);
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);

      let status; /* Affiche Message Vainqueur et prochain joueur */

        winner ? status = "le gagnant est " + winner : status = "Le prochain est "+ (this.state.leBoolean ? "X" : "O");
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  /* fonction pour definir le Vainqueur */
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  