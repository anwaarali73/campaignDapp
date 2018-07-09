import React from 'react';
import { Menu } from 'semantic-ui-react';
// Link: Anchor tag rendering for in-app rendering
import { Link } from '../routes';

// <Link></Link> is sort of a wraper and around its children: click event
// handler

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route='/'>
        <a className='item'>
          Crowded_coin
        </a>
      </Link>

      <Menu.Menu position="right">
        <Link route='/'>
          <a className='item'>
            Ongoing_campaigns
          </a>
        </Link>

          <Link route='/campaigns/new'>
            <a className='item'>
              +
            </a>
          </Link>
      </Menu.Menu>
    </Menu>
  );
};
