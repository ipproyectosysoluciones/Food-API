import React, { Component } from 'react';
import style from './Footer.module.css';

class Footer extends Component {

  render() {
    return (
      <div className={ style.footer }>

        <div className={ style.infoLeft }>
          <h5>Información</h5>
          <span>Proyecto Individual soyHenry <br/>
            por Bladimir Parra Bermudez <br/>
            info@ipproyectosysolucione.com.co <br/>
            Medellín - Colombia 
          </span>
        </div>
        <div className={ style.infoRight }>
          <a href="https://www.linkedin.com/in/bladimir-gerson-parra-bermudez/">LINKEDIN<img src="https://i.postimg.cc/xThMr2PB/logo-Linkedin.png" alt="linkedin" /></a>
          <a href="https://github.com/ipproyectosysoluciones">GITHUB<img src="https://i.postimg.cc/Vs9NRcSz/logo-Git-Hub.png" alt="github" /></a>
        </div>
      </div>
    );
  };
};

export default Footer;