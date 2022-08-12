import React, { useEffect, useState } from 'react'
import Team from '../assets/images/team.png'
import Story from '../assets/images/about.png'
import { Link } from 'react-router-dom'
import axios from '../api/products'

const About = () => {

  const [team,setTeam] = useState([]);
  useEffect(()=>{
    const getTeam = async()=>{
      await axios.get('/team')
      .then(resp=>setTeam(resp.data))
      .catch(err=>console.log(err))
    }
    getTeam()
  })

  return (
    <>
    <div className="container">
  <div className="us-story">
    <div className="story-img">
      <img src={Story} alt="#" />
    </div>
    <div className="story-content">
      <div className="story-header">
        <h1>Elehaus Story, We Craft Awesome With Great Experiences.</h1>
      </div>
      <div className="story-text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minimo veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex eatrl commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptat velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <div className="contact-btn">
        <button>
          <Link to='/contact'>
          Contact Us <i className="fa-solid fa-arrow-right" />
          </Link>
        </button>
      </div>
    </div>
  </div>
  <div className="team-content">
    <h2>OUT TEAM</h2>
    <div className="team-wrap">
      {team.map((team)=>{
        
      return <div className="team-box" key={team.id}>
        <div className="team-img">
          <img src={team.img} alt="#" />
        </div>
        <div className="media">
          <div className="team-info">
            <h4>{team.name}</h4>
            <p>{team.position}</p>
          </div>
          <div className="media-icon">
            <div className="icon-box">
              <i className="fa-brands fa-facebook-f" />
            </div>
            <div className="icon-box">
              <i className="fa-brands fa-twitter" />
            </div>
            <div className="icon-box">
              <i className="fa-brands fa-instagram" />
            </div>
          </div>
        </div>
      </div>
      })}
     
    </div>
  </div>
</div>

    </>
  )
}

export default About