import React from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";

const Contact = () => {
  
  const generateRandomUser = () => {
    const firstNames = ["John", "Jane", "Michael", "Emily", "Chris", "Sarah", "David", "Laura", "James", "Jessica"];
    const lastNames = ["Smith", "Doe", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris"];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomName = `${randomFirstName} ${randomLastName}`;

    const randomEmail = randomFirstName.toLowerCase() + randomLastName.toLowerCase() + Math.floor(Math.random() * 100) + '@example.com';

    return { name: randomName, email: randomEmail };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = generateRandomUser();
    alert(`Response Submitted Successfully!\n\nContact Info:\nName: ${user.name}\nEmail: ${user.email}`);
  };

  return (
    <>
      <section className="contact mb">
        <Back name="Contact Us" title="Get Helps & Friendly Support" cover={img} />
        <div className="container">
          <form className="shadow" onSubmit={handleSubmit}>
            <h4>Fill up The Form</h4> <br />
            <div>
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea cols="30" rows="10" placeholder="Message" required></textarea>
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
