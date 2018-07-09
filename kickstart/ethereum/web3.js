import Web3 from 'web3';


// The following window variable is a global one which is
// accessible only in the browser

// With Next.js's server-side rendering we do not have access to it

// const web3 = new Web3(window.web3.currentProvider);

// Following is for the server vs client web3 instances

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running
  // Hijack and the current provider and set it to ours
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
  );
  
  web3 = new Web3(provider);
}

export default web3;
