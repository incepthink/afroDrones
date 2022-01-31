import React from 'react';
import drone from '../assests/001.gif'

const Welcome = () => {
  return (
            <section className='welcome-col'>
                <div className="drone-col">
                    <img src={drone} alt="drone" />
                </div>
                <div className="drone-gist-col">
                    <h1>MINTING GOES LIVE 27TH -JAN. 5PM EST</h1>
                    <button> <a target='_blank' href='https://opensea.io/collection/afrodroids-by-owo'>
                        VIEW AFRODROIDS ON OPENSEA  </a>
                        </button>
                    <p>
                    Humanity's carelessness, disregard and refusal to nurture 
                    the earth as it had nurtured us, has led to the total annihilation 
                    of mankind. Not a single human was left. Except AfroDroids and Drones
                    </p>
                </div>
            </section>
            
        );
};

export default Welcome;
