import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      // The following is to refresh the page with to load the new content
      // after the ContributeForm submittal
      // The following style of back ticks `` is called using the ES2015
      // tempelate string

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
        this.setState({ errorMessage: err.message });
    }

    // Here setting value to '' just clears out the form

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="¡Something went wrong!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          ¡Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
