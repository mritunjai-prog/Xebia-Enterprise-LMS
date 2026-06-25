const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Standard fetch wrapper that automatically handles JSON and error states
 */
async function fetchApi(endpoint, options = {}) {
  const token = localStorage.getItem('lms_token'); // Mock token retrieval
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'An error occurred while fetching data';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch (e) {
      // Not JSON
    }
    throw new Error(errorMsg);
  }

  // Handle empty responses (like 204 No Content)
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const CourseService = {
  getCourses: () => fetchApi('/courses'),
  getCourseById: (id) => fetchApi(`/courses/${id}`),
  createCourse: (data) => fetchApi('/courses', { method: 'POST', body: JSON.stringify(data) }),
  addModule: (courseId, data) => fetchApi(`/courses/${courseId}/modules`, { method: 'POST', body: JSON.stringify(data) }),
  addSubmodule: (courseId, moduleId, data) => fetchApi(`/courses/${courseId}/modules/${moduleId}/submodules`, { method: 'POST', body: JSON.stringify(data) }),
};

export const BatchService = {
  getBatches: () => fetchApi('/batches'),
  createBatch: (data) => fetchApi('/batches', { method: 'POST', body: JSON.stringify(data) }),
  enrolStudent: (batchId, data) => fetchApi(`/batches/${batchId}/students`, { method: 'POST', body: JSON.stringify(data) }),
};

export const AuthService = {
  login: (credentials) => fetchApi('/iam/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => fetchApi('/iam/me'),
};

// NOTE: Categories API is missing from the backend spec. 
// It will remain on localStorage until the backend implements /api/categories.
