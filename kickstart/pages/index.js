import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
// Link: Anchor tag rendering for in-app rendering
import { Link } from '../routes';

// export default () => {
//   return <h1>This is the campaigns list page!</h1>;
// };

// Following is the class-based component

class CampaignIndex extends Component {

  // The following creates a class function and we do not need to create an
  // instance of it and can use it directly, the function name that is, to call
  // functions on it

  // This makes fetching of data much economical at the server side as it does
  // not involove rendering a component which is quite expensive

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }


  render() {
    return (
    <Layout>
      <div>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
      <h3>Ongoing_campaigns</h3>

      <Link route='/campaigns/new'>
        <a>
          <Button
            floated="right"
            content="Launch nueva campaign"
            icon="add"
            primary
          />
        </a>
      </Link>
      { this.renderCampaigns() }
      </div>
    </Layout>
  );
  }
}

export default CampaignIndex;
