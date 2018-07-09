import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
// Link: Anchor tag rendering for in-app rendering
// Router: Programmatically redirect people from one page to another
//import { Link, Router } from '../../routes';
import { Router } from '../../routes';

class CampaignNew extends Component {

  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

// Important: If we referencing without executing the function like below from
// render we use this.onSubmit and not this.onSubmit(). Also, we can only
// make use of this.function if we write function like function = () => and
// not function() =>

  onSubmit = async (event) => {
    // The following keeps the browser from attempting to submit the form
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0]
      });
      // Right after the successful creation of a campaign reroute the user to
      // the root directory
      Router.pushRoute('/');
    } catch (err) {
        this.setState({ errorMessage: err.message });
    }
      this.setState({ loading: false });
  };

  // !! Is just to make the value a boolean. Otherwise it keeps gives you a
  // warning

  render () {
    return (
      <Layout>
        <h3>¡Launch un nueva campaign!</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="¡Something went wrong!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>¡Launch!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
