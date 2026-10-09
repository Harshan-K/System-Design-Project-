import React from 'react';

function About() {
  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>About TECHEDU</h1>
      </section>

      <section className="about-content">
        <div className="about-section">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" alt="Our Mission" />
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>TECHEDU is dedicated to revolutionizing education management through innovative technology solutions. We empower educational institutions to streamline operations, enhance learning experiences, and achieve excellence in academic administration.</p>
          </div>
        </div>

        <div className="about-section reverse">
          <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80" alt="Our Vision" />
          <div className="about-text">
            <h2>Our Vision</h2>
            <p>To be the leading college management system that transforms how educational institutions operate, making education more accessible, efficient, and effective for students, faculty, and administrators worldwide.</p>
          </div>
        </div>

        <div className="about-section">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" alt="Why Choose Us" />
          <div className="about-text">
            <h2>Why Choose Us</h2>
            <p>With cutting-edge technology, user-friendly interfaces, and comprehensive features, TECHEDU provides everything you need to manage your institution efficiently. From student enrollment to graduation, we've got you covered.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
