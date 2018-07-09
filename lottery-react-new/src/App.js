import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {manager: ''};
  // }   // This block of code can be replaced by the Following

  state = {
    manager: '',
    players: [],
    balance: '',   // Going to be a number in wei
    value: '',
    message: ''
  };

  // We use async with componentDidMount() because we are using await afterwards
  async componentDidMount() {
    // Following because of imported ./lottery we can basically enter into the
    // ethereum world and use same functions in the way we used and wrote in
    // the original lottery.sol contract.
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    // Following we are going to get an object in the form of balance
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, players, balance});
  }

  onSubmit = async (event) => {
    event.preventDefault();   // This is so that form doesn't get submitted on it own by default
    // Following is going to the code for making the transaction; and we do need to specify the list of accounts here

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting for transaction to success ...'});

   // The following is going to take some time so we might as well
   // keep users in the loop about it; that is why above state is set

    await lottery.methods.enter().send({
      from: accounts[0],
      // Coming from the form down below from the HTML from
      // The following line of code takes about 15-30 s to be processed
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'Transaction success, you have been entered into the lottery!'})
  };

onClick = async () => {
  const accounts = await web3.eth.getAccounts();

  // In the following method we do not need to send any Amount
  // we just need to specify which account is sendig the transaction

  this.setState({message: 'Waiting for the transaction to succeed ...'});

  await lottery.methods.pickWinner().send({
    from: accounts[0]
  });

  this.setState({message: 'Transaction successful, a winner has been picked!'});

};

  render() {
    //console.log(web3.version);
    //web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>This is the test lottery contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          So far {this.state.players.length} number of people have entered, competing
          to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />

        <form onSubmit = {this.onSubmit}>
          <h4>Try your luck!</h4>
          <div>
            <label>Amount of ether to bet (or to enter)</label>
            <input
              value = {this.state.value}
              onChange = {event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick = {this.onClick}>Pick a winner!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
