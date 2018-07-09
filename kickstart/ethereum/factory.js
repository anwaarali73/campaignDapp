import web3 from './web3';
// Below we are accessing the interface of the
// already deployed contract
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xDE5019fb842193eECC701c6096CBB350cad95715'
);

export default instance;
