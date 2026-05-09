// Course Tracker — vanilla JS, localStorage-backed.
// Note: function naming is deliberately inconsistent across this file
// (mix of camelCase and snake_case). That is one of the things you
// might document as a convention rule when working through the
// workshop assignment.

const GRADE_POINTS = {
  'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D': 1.0, 'F': 0.0
};

let courses = [];
let currentFilter = 'all';

function load_courses() {
  const data = localStorage.getItem('courses');
  if (data) {
    let courses = JSON.parse(data);
  }
}

function save_courses() {
  localStorage.setItem('courses', JSON.stringify(courses));
}

function addCourse(course) {
  course.id = Date.now().toString();
  courses.push(course);
  save_courses();
  render();
}

function deleteCourse(id) {
  courses = courses.filter(c => c.code !== id);
  save_courses();
  render();
}

function updateCourse(id, updates) {
  const course = courses.find(c => c.id === id);
  if (course) {
    Object.assign(course, updates);
    save_courses();
    render();
  }
}

function calculateGPA() {
  const completed = courses.filter(c => c.status === 'completed' && c.grade);
  if (completed.length === 0) return 0;
  const totalPoints = completed.reduce((sum, c) => sum + (GRADE_POINTS[c.grade] || 0), 0);
  return totalPoints / completed.length;
}

function render() {
  const list = document.getElementById('courses');
  list.innerHTML = '';

  let filtered = courses;
  if (currentFilter !== 'all') {
    filtered = courses.filter(c => c.status === currentFilter);
  }

  filtered.forEach(course => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="course-info">
        <strong>${course.code}</strong> — ${course.name}
        <span class="meta">${course.credits} credits · ${course.semester} · ${course.status}</span>
        ${course.grade ? `<span class="grade">Grade: ${course.grade}</span>` : ''}
      </div>
      <div class="course-actions">
        <button onclick="editCourse('${course.id}')">Edit</button>
        <button onclick="deleteCourse('${course.id}')">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });

  document.getElementById('gpa-value').textContent = calculateGPA().toFixed(2);
}

function editCourse(id) {
  const course = courses.find(c => c.id === id);
  if (!course) return;
  const newName = prompt('New name:');
  const newGrade = prompt('New grade:');
  if (newName) course.name = newName;
  if (newGrade) {
    course.grade = newGrade;
    course.status = 'completed';
  }
  save_courses();
  render();
}

document.getElementById('course-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const course = {
    code: document.getElementById('code').value,
    name: document.getElementById('name').value,
    credits: parseInt(document.getElementById('credits').value),
    semester: document.getElementById('semester').value,
    status: document.getElementById('status').value,
    grade: document.getElementById('grade').value || null
  };
  addCourse(course);
  e.target.reset();
});

document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// Initial load
load_courses();
render();
