import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';

// Important This head component moves whatever is wrapped inside it to the
// head tag of the resultant HTML

import Head from 'next/head';

// In the following the props.children will keep on changing depending upon the
// context where <Layout>*Stuff that become a child*</Layout> is included

export default (props) => {
  return (
    <Container>
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
