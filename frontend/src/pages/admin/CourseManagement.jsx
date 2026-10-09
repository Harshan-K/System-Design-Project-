import React, { useState, useEffect } from 'react';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'beginner',
    price: '',
    image: '',
    category: ''
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    if (storedCourses.length === 0) {
      const mockCourses = [
        {
          id: 1,
          title: 'React Development Fundamentals',
          description: 'Learn the basics of React development including components, state, and props.',
          instructor: 'John Smith',
          duration: '8 weeks',
          level: 'beginner',
          price: '$299',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
          category: 'Web Development',
          students: 45,
          rating: 4.8,
          isActive: true
        },
        {
          id: 2,
          title: 'Advanced JavaScript Concepts',
          description: 'Deep dive into advanced JavaScript concepts including closures, promises, and async/await.',
          instructor: 'Sarah Johnson',
          duration: '6 weeks',
          level: 'advanced',
          price: '$399',
          image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
          category: 'Programming',
          students: 32,
          rating: 4.9,
          isActive: true
        },
        {
          id: 3,
          title: 'UI/UX Design Principles',
          description: 'Master the fundamentals of user interface and user experience design.',
          instructor: 'Mike Davis',
          duration: '10 weeks',
          level: 'intermediate',
          price: '$349',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
          category: 'Design',
          students: 28,
          rating: 4.7,
          isActive: false
        }
      ];
      localStorage.setItem('courses', JSON.stringify(mockCourses));
      setCourses(mockCourses);
    } else {
      setCourses(storedCourses);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCourse) {
      // Update existing course
      const updatedCourses = courses.map(course =>
        course.id === editingCourse.id
          ? { ...course, ...formData }
          : course
      );
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
    } else {
      // Add new course
      const newCourse = {
        id: Date.now(),
        ...formData,
        students: 0,
        rating: 0,
        isActive: true
      };
      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      instructor: '',
      duration: '',
      level: 'beginner',
      price: '',
      image: '',
      category: ''
    });
    setEditingCourse(null);
    setShowModal(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: course.price,
      image: course.image,
      category: course.category
    });
    setShowModal(true);
  };

  const handleDelete = (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const toggleCourseStatus = (courseId) => {
    const updatedCourses = courses.map(course =>
      course.id === courseId
        ? { ...course, isActive: !course.isActive }
        : course
    );
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  return (
    <div className="course-management">
      <div className="page-header">
        <h1>Course Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add New Course
        </button>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-image">
              <img src={course.image} alt={course.title} />
              <div className={`status-badge ${course.isActive ? 'active' : 'inactive'}`}>
                {course.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            
            <div className="course-content">
              <h3>{course.title}</h3>
              <p className="course-description">{course.description}</p>
              
              <div className="course-meta">
                <span className="instructor">👨‍🏫 {course.instructor}</span>
                <span className="duration">⏱️ {course.duration}</span>
                <span className="level">{course.level}</span>
              </div>
              
              <div className="course-stats">
                <span className="students">👥 {course.students} students</span>
                <span className="rating">⭐ {course.rating}</span>
                <span className="price">{course.price}</span>
              </div>
            </div>

            <div className="course-actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(course)}
              >
                Edit
              </button>
              <button
                className={`btn-toggle ${course.isActive ? 'deactivate' : 'activate'}`}
                onClick={() => toggleCourseStatus(course.id)}
              >
                {course.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(course.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => resetForm()}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
              <button className="modal-close" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Instructor *</label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 8 weeks"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Level *</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., $299"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Course Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseManagement;