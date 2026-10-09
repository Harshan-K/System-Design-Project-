import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="hero">
        <div className="hero-overlay">
          <h1>Welcome to TECHEDU</h1>
          <p>Empowering Education Through Technology</p>
          <button className="cta-btn" onClick={() => navigate('/admissions')}>Get Started</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80" alt="Student Portal" />
          <h3>📚 Student Portal</h3>
          <p>Access courses, grades, and schedules. View assignments, submit work, and communicate with faculty.</p>
        </div>
        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80" alt="Faculty Management" />
          <h3>👨🏫 Faculty Management</h3>
          <p>Manage classes and student records. Create assignments, grade submissions, and track attendance.</p>
        </div>
        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" alt="Analytics" />
          <h3>📊 Analytics</h3>
          <p>Track performance and attendance with detailed reports. Monitor academic progress and trends.</p>
        </div>
        <div className="feature-card">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80" alt="Administration" />
          <h3>💼 Administration</h3>
          <p>Complete college management tools for admissions, finance, scheduling, and resource allocation.</p>
        </div>
      </section>

      <section className="infrastructure">
        <h2>Our Campus Infrastructure</h2>
        <div className="infrastructure-grid">
          <div className="infra-card">
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80" alt="Library" />
            <div className="infra-content">
              <h3>Modern Library</h3>
              <p>Our state-of-the-art library houses over 100,000 books, journals, and digital resources. With comfortable reading spaces, computer labs, and 24/7 access, students can explore vast knowledge repositories. The library features dedicated research sections, group study rooms, and access to international databases for comprehensive academic support.</p>
            </div>
          </div>
          <div className="infra-card">
            <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80" alt="Campus Building" />
            <div className="infra-content">
              <h3>Campus Buildings</h3>
              <p>Our campus features architecturally designed buildings equipped with modern classrooms, smart boards, and audio-visual systems. Each building is designed to provide optimal learning environments with proper ventilation, natural lighting, and accessibility features. The infrastructure supports both traditional and innovative teaching methodologies.</p>
            </div>
          </div>
          <div className="infra-card">
            <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" alt="Labs" />
            <div className="infra-content">
              <h3>Research Labs</h3>
              <p>Advanced laboratories equipped with cutting-edge technology for science, engineering, and computer studies. Our labs provide hands-on experience with industry-standard equipment, fostering innovation and research. Students have access to specialized facilities for experiments, projects, and collaborative research initiatives under expert guidance.</p>
            </div>
          </div>
          <div className="infra-card">
            <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80" alt="Sports" />
            <div className="infra-content">
              <h3>Sports Complex</h3>
              <p>A comprehensive sports complex featuring indoor and outdoor facilities including basketball courts, tennis courts, football fields, and a fully-equipped gymnasium. We promote physical fitness and sportsmanship through regular tournaments, training programs, and professional coaching. The complex also includes yoga and meditation centers for holistic wellness.</p>
            </div>
          </div>
          <div className="infra-card">
            <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80" alt="Auditorium" />
            <div className="infra-content">
              <h3>Auditorium</h3>
              <p>Our spacious auditorium with a seating capacity of 1000+ features advanced acoustics, lighting systems, and multimedia facilities. It serves as the venue for seminars, conferences, cultural events, and guest lectures. The auditorium is equipped with modern presentation technology, making it ideal for both academic and entertainment purposes.</p>
            </div>
          </div>
          <div className="infra-card">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" alt="Cafeteria" />
            <div className="infra-content">
              <h3>Cafeteria</h3>
              <p>A spacious and hygienic cafeteria offering a wide variety of nutritious meals, snacks, and beverages. With multiple food counters serving diverse cuisines, comfortable seating arrangements, and a pleasant ambiance, it's the perfect place for students and faculty to relax and socialize. We maintain high standards of food quality and cleanliness.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default Home;
