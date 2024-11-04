import React from "react";
import Heading from "../../common/Heading";
// Import the FontAwesomeIcon component and specific icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faLocationDot, faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { team } from "../../data/Data";
import "./team.css";

const Team = () => {
  return (
    <>
      <section className='team background'>
        <div className='container'>
          <Heading
            title='Our Featured Agents'
            subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
          />

          <div className='content mtop grid3'>
            {team.map((val, index) => (
              <div className='box' key={index}>
                <button className='btn3'>{val.list} Listings</button>
                <div className='details'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    {/* Use FontAwesomeIcon for check-circle icon */}
                    <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
                  </div>
                  {/* Use FontAwesomeIcon for location-dot icon */}
                  <FontAwesomeIcon icon={faLocationDot} />
                  <label>{val.address}</label>
                  <h4>{val.name}</h4>

                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul>
                  <div className='button flex'>
                    <button>
                      {/* Use FontAwesomeIcon for envelope icon */}
                      <FontAwesomeIcon icon={faEnvelope} /> Message
                    </button>
                    <button className='btn4'>
                      {/* Use FontAwesomeIcon for phone-alt icon */}
                      <FontAwesomeIcon icon={faPhoneAlt} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
