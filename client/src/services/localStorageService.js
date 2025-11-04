// Local Storage Service - stores data in browser instead of backend
class LocalStorageService {
    constructor() {
        this.USERS_KEY = 'medisage_users';
        this.DOCUMENTS_KEY = 'medisage_documents';
        this.CURRENT_USER_KEY = 'medisage_current_user';
    }

    // User Management
    getUsers() {
        const users = localStorage.getItem(this.USERS_KEY);
        return users ? JSON.parse(users) : [];
    }

    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    getCurrentUser() {
        const user = localStorage.getItem(this.CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    setCurrentUser(user) {
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    }

    clearCurrentUser() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    }

    // Auth Methods
    register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = this.getUsers();

                // Check if email already exists
                const existingUser = users.find(u => u.email === userData.email);
                if (existingUser) {
                    reject({ response: { data: { error: 'Email already registered' } } });
                    return;
                }

                // Create new user
                const newUser = {
                    id: Date.now().toString(),
                    ...userData,
                    createdAt: new Date().toISOString(),
                };

                // Remove password from stored user object (security)
                const { password, ...userWithoutPassword } = newUser;

                // Store user with password for login verification
                users.push(newUser);
                this.saveUsers(users);

                // Set as current user
                this.setCurrentUser(userWithoutPassword);

                // Generate fake token
                const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));
                localStorage.setItem('token', token);

                resolve({
                    data: {
                        user: userWithoutPassword,
                        token: token,
                    },
                });
            }, 500); // Simulate network delay
        });
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = this.getUsers();
                const user = users.find(u => u.email === email && u.password === password);

                if (!user) {
                    reject({ response: { data: { error: 'Invalid email or password' } } });
                    return;
                }

                const { password: _, ...userWithoutPassword } = user;
                this.setCurrentUser(userWithoutPassword);

                const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
                localStorage.setItem('token', token);

                resolve({
                    data: {
                        user: userWithoutPassword,
                        token: token,
                    },
                });
            }, 500);
        });
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.getCurrentUser();
                if (!user) {
                    reject({ response: { data: { error: 'Not authenticated' } } });
                    return;
                }
                resolve({ data: user });
            }, 300);
        });
    }

    updateProfile(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currentUser = this.getCurrentUser();
                if (!currentUser) {
                    reject({ response: { data: { error: 'Not authenticated' } } });
                    return;
                }

                const users = this.getUsers();
                const userIndex = users.findIndex(u => u.id === currentUser.id);

                if (userIndex === -1) {
                    reject({ response: { data: { error: 'User not found' } } });
                    return;
                }

                // Update user data
                users[userIndex] = { ...users[userIndex], ...data };
                this.saveUsers(users);

                const { password: _, ...updatedUser } = users[userIndex];
                this.setCurrentUser(updatedUser);

                resolve({ data: updatedUser });
            }, 300);
        });
    }

    logout() {
        this.clearCurrentUser();
        localStorage.removeItem('token');
    }

    // Document Management
    getDocuments() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return [];

        const docs = localStorage.getItem(this.DOCUMENTS_KEY);
        const allDocs = docs ? JSON.parse(docs) : [];
        return allDocs.filter(doc => doc.userId === currentUser.id);
    }

    saveDocument(docData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currentUser = this.getCurrentUser();
                if (!currentUser) {
                    reject({ response: { data: { error: 'Not authenticated' } } });
                    return;
                }

                const docs = localStorage.getItem(this.DOCUMENTS_KEY);
                const allDocs = docs ? JSON.parse(docs) : [];

                const newDoc = {
                    _id: Date.now().toString(),
                    userId: currentUser.id,
                    ...docData,
                    uploadDate: new Date().toISOString(),
                };

                allDocs.push(newDoc);
                localStorage.setItem(this.DOCUMENTS_KEY, JSON.stringify(allDocs));

                resolve({ data: newDoc });
            }, 500);
        });
    }

    getAllDocuments() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const documents = this.getDocuments();
                resolve({ data: documents });
            }, 300);
        });
    }

    getDocumentById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const documents = this.getDocuments();
                const doc = documents.find(d => d._id === id);

                if (!doc) {
                    reject({ response: { data: { error: 'Document not found' } } });
                    return;
                }

                resolve({ data: doc });
            }, 300);
        });
    }

    updateDocument(id, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const docs = localStorage.getItem(this.DOCUMENTS_KEY);
                const allDocs = docs ? JSON.parse(docs) : [];
                const docIndex = allDocs.findIndex(d => d._id === id);

                if (docIndex === -1) {
                    reject({ response: { data: { error: 'Document not found' } } });
                    return;
                }

                allDocs[docIndex] = { ...allDocs[docIndex], ...data };
                localStorage.setItem(this.DOCUMENTS_KEY, JSON.stringify(allDocs));

                resolve({ data: allDocs[docIndex] });
            }, 300);
        });
    }

    deleteDocument(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const docs = localStorage.getItem(this.DOCUMENTS_KEY);
                const allDocs = docs ? JSON.parse(docs) : [];
                const filteredDocs = allDocs.filter(d => d._id !== id);

                if (allDocs.length === filteredDocs.length) {
                    reject({ response: { data: { error: 'Document not found' } } });
                    return;
                }

                localStorage.setItem(this.DOCUMENTS_KEY, JSON.stringify(filteredDocs));
                resolve({ data: { message: 'Document deleted' } });
            }, 300);
        });
    }

    getDocumentsByType(type) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const documents = this.getDocuments();
                const filtered = documents.filter(d => d.documentType === type);
                resolve({ data: filtered });
            }, 300);
        });
    }
}

export const localStorageService = new LocalStorageService();
export default localStorageService;
