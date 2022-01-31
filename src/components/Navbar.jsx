import React from 'react';
import logo from '../assests/logo.png'
import twitter from '../assests/twitter.png'
import slash from '../assests/slash.png'
import discord from '../assests/discord.png'

import './component.css'

const Navbar = () => {
  return ( 
  <section className='nav-col'>
      <img src={logo} alt="logo" />
      <ul className='nav-links'>
          <li className='nav-item'>  <img src={slash} alt="slash" /> </li>
          <li className='nav-item'> <a target='blank' href="https://twitter.com/AfroDroids"> <img src={twitter} alt="" /> </a> </li>
          <li className='nav-item'> <a target='blank' href="https://discord.gg/wTYfJ7pdht"> <img src={discord} alt="" /> </a> </li>
      </ul>
  </section>
  );
};

export default Navbar;
