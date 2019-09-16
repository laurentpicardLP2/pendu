import React from 'react';
import './App.css';
import rabbit from './images/pendu.gif';
import Game from './Game';
import Quotation from './Quotation';

class App extends React.Component {
  quotations = [
    "Mieux vaut tard que jamais",
    "La raison du plus fort est toujours la meilleure",
    "La douleur est toujours moins forte que la plainte",
    "La fin justifie les moyens",
    "On hasarde de perdre en voulant trop gagner"
  ];


    constructor(props){
    super(props);
    
    this.state = { 
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
              'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      usedLetters: [],
      numQuotation: 0,
      guesses: 0,
    };
    
    this.showRowButtons = this.showRowButtons.bind(this);
    this.newGame = this.newGame.bind(this);

  }


  // Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
// (CSS assurera de l’espacement entre les lettres pour mieux
// visualiser le tout).
computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.includes(letter) ? letter : '_')
  )
}

showRowButtons(row){

  return <div style={{
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "backgroundColor": "#222"
      }}>
      
      {this.state.letters.map((letter, index) => {
          return row === 1 ?  
          (index < 13 ? <button key={index} style={{"width": 25, "backgroundColor": this.setBackgroundColor(index)}} onClick={() => this.tryLetter(index)}>{letter.toUpperCase()}</button> : '')
          : (index >= 13 ? <button key={index} style={{"width": 25, "backgroundColor": this.setBackgroundColor(index)}} onClick={() => this.tryLetter(index)}>{letter.toUpperCase()}</button> : '')
      })
      }
  </div>
  }


setBackgroundColor(index){
  return this.state.usedLetters.includes(this.state.letters[index])? "rgb(185, 185, 185)" : "rgb(240, 240, 240)"
}

tryLetter(index){
  let usedLetters = this.state.usedLetters;
  let guesses = this.state.guesses + 1;
  if(!this.state.usedLetters.includes(this.state.letters[index])){
    usedLetters.push(this.state.letters[index])
  }
  this.setState({
    usedLetters:  usedLetters,
    guesses: guesses,
  });
}

checkWon(response){
  return !response.includes('_');
}

newGame(){
  const numQuotation = parseInt((this.state.numQuotation + 1), 10) % this.quotations.length;
  this.setState({
    usedLetters: [],
    numQuotation: numQuotation,
    guesses: 0,
  })
}

  render(){
    const won = this.checkWon(this.computeDisplay(this.quotations[this.state.numQuotation].toLowerCase(), this.state.usedLetters.join().toLowerCase()));

    return (
      <div className="App">
        <header className="App-header">
          <img src={rabbit} className="App-logo" alt="jeu du pendu" />
          <Quotation visuPhrase={this.computeDisplay(this.quotations[this.state.numQuotation].toLowerCase(), this.state.usedLetters.join().toLowerCase())}/>
          <Game showRowButtons = {this.showRowButtons} won = {won} newGame={this.newGame} guesses={this.state.guesses} />
        </header>
      </div>
    );
  }
}

export default App;
