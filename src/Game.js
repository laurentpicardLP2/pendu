import React from 'react';
import './Game.css';

const Game = ({showRowButtons, won, newGame, guesses}) => (
        <div>
            {won ? 
              <div className="Container">
                <div>
                    Bravo, vous avez gagné en {guesses} coups.
                    <br /><button onClick={()=>newGame()}>Rejouer</button>
                </div>
            </div>
            :
            <div className="Container">
                <div>
                    {showRowButtons(1)} 
                    {showRowButtons(2)}
                    <br />Nombre de coups : {guesses}
                </div>
            </div> }
            
        </div>
)


export default Game