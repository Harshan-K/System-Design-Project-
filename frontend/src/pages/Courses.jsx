import React from 'react';

function Courses() {
  const courses = [
    { id: 1, name: 'Computer Science', students: 450, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80', searchQuery: 'Computer Science degree courses' },
    { id: 2, name: 'Business Administration', students: 380, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80', searchQuery: 'Business Administration degree courses' },
    { id: 3, name: 'Engineering', students: 520, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80', searchQuery: 'Engineering degree courses' },
    { id: 4, name: 'Medicine', students: 290, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', searchQuery: 'Medicine degree courses' },
    { id: 5, name: 'Arts & Humanities', students: 310, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80', searchQuery: 'Arts and Humanities degree courses' },
    { id: 6, name: 'Science', students: 405, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80', searchQuery: 'Science degree courses' }
  ];

  return (
    <div className="page-container">
      <section className="page-hero">
        <h1>Our Courses</h1>
        <p>Explore our comprehensive academic programs</p>
      </section>

      <section className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.name} />
            <div className="course-info">
              <h3>{course.name}</h3>
              <p>{course.students} Students Enrolled</p>
              <a href={`https://www.google.com/search?q=${encodeURIComponent(course.searchQuery)}`} target="_blank" rel="noopener noreferrer">
                <button className="btn-secondary">Learn More</button>
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Courses;
