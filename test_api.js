

const API_URL = 'http://localhost:8080/api'; // API Gateway
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbnRlcnByaXNlLWxtcyIsInN1YiI6IjExMTExMTExLTExMTEtMTExMS0xMTExLTExMTExMTExMTExMSIsInRlbmFudElkIjoiMjIyMjIyMjItMjIyMi0yMjIyLTIyMjItMjIyMjIyMjIyMjIyIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdfQ.iPpxpu_kVVj3TQ9nQmcJRX5QXlUIct4Auu9FlqP7cSA'; // From api.js

async function request(endpoint, method = 'GET', body = null) {
    const opts = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    if (body) opts.body = JSON.stringify(body);
    
    const res = await fetch(API_URL + endpoint, opts);
    if (!res.ok) {
        console.error(`Error on ${method} ${endpoint}: ${res.status}`);
        const text = await res.text();
        console.error(text);
        throw new Error(`HTTP ${res.status}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

async function verify() {
    console.log("Starting End-to-End API Verification...");

    // 1. Category CRUD
    console.log("\\n--- 1. Category ---");
    let category = await request('/categories', 'POST', { name: 'Test Category', slug: 'test-category', description: 'Test', isActive: true });
    console.log("Create Category:", category.id);
    let categories = await request('/categories');
    console.log("Read Categories:", categories.length);
    category = await request(`/categories/${category.id}`, 'PUT', { name: 'Updated Category', slug: 'test-category', description: 'Test', isActive: true });
    console.log("Update Category:", category.name);

    // 2. Course CRUD
    console.log("\\n--- 2. Course ---");
    let course = await request('/courses', 'POST', { title: 'Test Course', slug: 'test-course', description: 'Test', categoryId: category.id, difficultyLevel: 'BEGINNER', status: 'DRAFT', imageUrl: '' });
    console.log("Create Course:", course.id);
    let courses = await request('/courses');
    console.log("Read Courses:", courses.length);
    course = await request(`/courses/${course.id}`, 'PUT', { title: 'Updated Course', slug: 'test-course', description: 'Test', categoryId: category.id, difficultyLevel: 'BEGINNER', status: 'DRAFT', imageUrl: '' });
    console.log("Update Course:", course.title);

    // 3. Curriculum Builder
    console.log("\\n--- 3. Curriculum Builder ---");
    let module1 = await request(`/courses/${course.id}/modules`, 'POST', { title: 'Test Module', position: 1 });
    console.log("Create Module:", module1.id);
    module1 = await request(`/courses/modules/${module1.id}`, 'PUT', { title: 'Updated Module', position: 1 });
    console.log("Update Module:", module1.title);

    let submodule = await request(`/courses/${course.id}/modules/${module1.id}/submodules`, 'POST', { title: 'Test Submodule', position: 1 });
    console.log("Create Submodule:", submodule.id);
    submodule = await request(`/courses/submodules/${submodule.id}`, 'PUT', { title: 'Updated Submodule', position: 1 });
    console.log("Update Submodule:", submodule.title);

    let content = await request(`/courses/${course.id}/content-items`, 'POST', { moduleId: module1.id, subModuleId: submodule.id, title: 'Test Video', type: 'VIDEO', position: 1, storageRef: 'http://test.com' });
    console.log("Create Content:", content.id);
    content = await request(`/courses/content-items/${content.id}`, 'PUT', { title: 'Updated Video', type: 'VIDEO', position: 1, storageRef: 'http://test2.com' });
    console.log("Update Content:", content.title);

    // Read full hierarchy
    console.log("\\n--- 4. Validate Hierarchy Retrieval ---");
    let hierarchy = await request(`/courses/${course.id}/hierarchy`);
    console.log(`Hierarchy Loaded: ${hierarchy.modules.length} Modules.`);
    console.log(`Module 1 Submodules: ${hierarchy.modules[0].submodules.length}`);
    console.log(`Submodule 1 Contents: ${hierarchy.modules[0].submodules[0].content.length}`);

    // Cleanup Hierarchy
    console.log("\\n--- 5. Cleanup ---");
    await request(`/courses/content-items/${content.id}`, 'DELETE');
    console.log("Deleted Content");
    await request(`/courses/submodules/${submodule.id}`, 'DELETE');
    console.log("Deleted Submodule");
    await request(`/courses/modules/${module1.id}`, 'DELETE');
    console.log("Deleted Module");
    await request(`/courses/${course.id}`, 'DELETE');
    console.log("Deleted Course");
    await request(`/categories/${category.id}`, 'DELETE');
    console.log("Deleted Category");

    console.log("\\nALL TESTS PASSED: TRUE");
}

verify().catch(console.error);
