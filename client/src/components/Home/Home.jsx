import React from 'react';
import style from './Home.module.css';
import { NavLink } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className={ style.background } >
      <div className={ style.card }>
        <img src="https://i.postimg.cc/Z5J2PQ9Y/Henry-PI-logo-2-free-file.png" alt="logo" />
          <NavLink to="/recipes">
            <button className={ style.button }>Ingresar</button>
          </NavLink>
        <div className={ style.socialDiv }>
          <a target="_blank" href="https://www.linkedin.com/in/bladimir-gerson-parra-bermudez" rel='noreferrer'><img src="https://i.postimg.cc/xThMr2PB/logo-Linkedin.png" alt="github" />LindeIn</a>
          <a target="_blank" href="https://github.com/ipproyectosysoluciones" rel='noreferrer'><img src="https://i.postimg.cc/Vs9NRcSz/logo-Git-Hub.png" alt="github" />GitHub</a>
        </div>
      </div>
    </div>
  )
}