const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8084';
import { enrolledCourses as mockCourses, categories as mockCategories } from '../lib/dummy-data';

// Detect if we are running in a Node/SSR environment (no real browser fetch to backend)
const IS_SSR = typeof window === 'undefined';

/**
 * Standard fetch wrapper that automatically handles JSON and error states.
 * In SSR mode we skip the network entirely and throw so callers fall back to mock.
 */
async function fetchApi(endpoint, options = {}) {
  // During SSR there is no backend available — skip straight to the mock fallback
  if (IS_SSR) throw new Error('SSR: skipping backend fetch');

  const headers = {
    'Content-Type': 'application/json',
    'X-Tenant-Id': '123e4567-e89b-12d3-a456-426614174000',
    'X-User-Id': '123e4567-e89b-12d3-a456-426614174000',
    ...options.headers,
  };

  try {
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
  } catch (err) {
    // Re-throw so callers can handle / fall back to mock
    throw err;
  }
}

export const CourseService = {
  getCourses: async () => {
    try {
      return await fetchApi('/courses');
    } catch (err) {
      console.warn("Falling back to mock for getCourses", err);
      return mockCourses;
    }
  },
  getCourseById: (id) => fetchApi(`/courses/${id}`),
  getCourseHierarchy: async (id) => {
    try {
      const dto = await fetchApi(`/courses/${id}/hierarchy`);
      if (!dto) return null;
      const mappedCourse = { ...dto.course };
      mappedCourse.modules = (dto.modules || []).map(mDto => ({
        ...mDto.module,
        submodules: (mDto.submodules || []).map(sDto => ({
          ...sDto.submodule,
          contentBlocks: sDto.contentBlocks || []
        }))
      }));
      mappedCourse.modulesCount = mappedCourse.modules.length;
      mappedCourse.submodulesCount = mappedCourse.modules.reduce((acc, m) => acc + (m.submodules?.length || 0), 0);
      return mappedCourse;
    } catch (err) {
      console.warn("Falling back to mock for getCourseHierarchy", err);
      const mockCourse = mockCourses.find(c => String(c.id) === String(id));
      if (!mockCourse) throw new Error("Course not found");
      return mockCourse;
    }
  },
  getCourseBySlug: async (slug) => {
    try {
      const all = await fetchApi('/courses');
      const course = all.find(c => c.slug === slug || (c.title && c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) || c.id === slug);
      if (!course) throw new Error("Course not found");
      return course;
    } catch (err) {
      console.warn("Falling back to mock for getCourseBySlug", err);
      const mockCourse = mockCourses.find(c => c.slug === slug || c.id === slug || (c.title && c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug));
      if (!mockCourse) throw new Error("Course not found");
      return mockCourse;
    }
  },
  createCourse: (data) => fetchApi('/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id, data) => fetchApi(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id) => fetchApi(`/courses/${id}`, { method: 'DELETE' }),
  addModule: (courseId, data) => fetchApi(`/courses/${courseId}/modules`, { method: 'POST', body: JSON.stringify(data) }),
  addSubmodule: (courseId, moduleId, data) => fetchApi(`/courses/${courseId}/modules/${moduleId}/submodules`, { method: 'POST', body: JSON.stringify(data) }),
  addContentItem: (courseId, data) => fetchApi(`/courses/${courseId}/content-items`, { method: 'POST', body: JSON.stringify(data) }),
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

export const CategoryService = {
  getCategories: async () => {
    try {
      return await fetchApi('/categories');
    } catch (err) {
      console.warn("Falling back to mock for getCategories", err);
      return mockCategories;
    }
  },
  getCategoryById: async (id) => {
    try {
      const all = await fetchApi('/categories');
      const cat = all.find(c => String(c.id) === String(id));
      if (!cat) throw new Error("Category not found");
      return cat;
    } catch (err) {
      console.warn("Falling back to mock for getCategoryById", err);
      throw err;
    }
  },
  getCategoryBySlug: async (slug) => {
    try {
      const all = await fetchApi('/categories');
      // Some categories might have actual slug fields. If not, match by name.
      const cat = all.find(c => c.slug === slug || (c.name && c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) || c.id === slug);
      if (!cat) throw new Error("Category not found");
      return cat;
    } catch (err) {
      console.warn("Falling back to mock for getCategoryBySlug", err);
      const mockCat = mockCategories.find(c => c.slug === slug || c.id === slug || (c.name && c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug));
      if (!mockCat) throw new Error("Category not found");
      return mockCat;
    }
  },
  createCategory: async (data) => {
    return await fetchApi('/categories', { method: 'POST', body: JSON.stringify(data) });
  },
  updateCategory: async (id, data) => {
    return await fetchApi(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  deleteCategory: async (id) => {
    await fetchApi(`/categories/${id}`, { method: 'DELETE' });
    return true;
  },
};
