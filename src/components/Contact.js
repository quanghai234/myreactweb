import React from 'react'

const Contact = () => {
  return (
    <>
    <div className="container">
  <div className="contact-area">
    <div className="contact-form">
      <div className="contact">
        <div className="contact-form-header">
          <h3>Contact Info</h3>
        </div>
        <div className="contact-item">
          <div className="contact-img">
            <img src="./images/pin2.png" alt="" />
          </div>
          <div className="contact-info">
            <h4>Head Office</h4>
            <p>Your address here 54/X, New Down City</p>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-img">
            <img src="./images/pin2.png" alt="" />
          </div>
          <div className="contact-info">
            <h4>Head Office</h4>
            <p>Your address here 54/X, New Down City</p>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-img">
            <img src="./images/pin2.png" alt="" />
          </div>
          <div className="contact-info">
            <h4>Head Office</h4>
            <p>Your address here 54/X, New Down City</p>
          </div>
        </div>
      </div>
      <div className="get-in-touch">
        <div className="contact-form-header">
          <h3>Get In Touch</h3>
        </div>
        <div className="form-content">
          <div className="first-row">
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Your Mail" />
          </div>
          <input
            type="text"
            className="full-width"
            placeholder="Your Subject"
          />
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="Your Message"
            defaultValue={""}
          />
        </div>
        <button className="submit-btn">SUBMIT NOW</button>
      </div>
    </div>
  </div>
  <div className="map">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4780284949557!2d105.80913811501254!3d21.013550586006676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab438bbafeeb%3A0xb97ca6f7e88ba308!2sDevmaster!5e0!3m2!1svi!2s!4v1655909391678!5m2!1svi!2s"
      width={600}
      height={450}
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>

    </>
  )
}

export default Contact