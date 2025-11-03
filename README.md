# MediSage - Medical Document Management System with AI Analysis

MediSage is a comprehensive DigiLocker-like medical document management system that allows users to securely store medical documents, prescriptions, and reports while leveraging AI to provide personalized health insights, lifestyle recommendations, and insurance suggestions.

## Features

### Core Functionality
- **Secure Document Storage**: Upload and manage medical documents (prescriptions, lab reports, scans, discharge summaries)
- **User Authentication**: Secure registration and login system
- **Medical History Timeline**: View all your medical documents chronologically
- **Document Organization**: Categorize documents by type with metadata (doctor, hospital, diagnosis, medications)

### AI-Powered Features
- **Medical History Analysis**: AI agent analyzes your complete medical history and provides personalized lifestyle recommendations
- **Insurance Recommendations**: Get tailored insurance plan suggestions based on your health profile
- **Activity Recommendations**: Personalized exercise, diet, and wellness plans
- **Document Insights**: AI-powered analysis of individual medical documents

## Tech Stack

### Backend (MERN)
- **Node.js & Express.js**: REST API server
- **MongoDB**: Database for storing user data and document metadata
- **Mongoose**: ODM for MongoDB
- **JWT**: Secure authentication
- **Multer**: File upload handling
- **Langchain**: AI agent framework
- **OpenAI**: LLM for medical analysis and recommendations

### Frontend (MERN)
- **React**: User interface
- **React Router**: Navigation
- **Axios**: API communication
- **CSS3**: Styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- OpenAI API Key (for AI features)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Nova-022005/MediSage.git
cd MediSage
```

2. **Install dependencies**
```bash
# Install root and backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. **Configure Environment Variables**
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medisage
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

4. **Start MongoDB**
Ensure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod
```

5. **Run the application**

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

### Getting Started

1. **Register**: Create a new account with your email and basic health information
2. **Upload Documents**: Add your medical records, prescriptions, and lab reports
3. **AI Analysis**: Get personalized health insights and recommendations
4. **Insurance**: Receive AI-powered insurance plan recommendations

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

#### Documents
- `POST /api/documents/upload` - Upload medical document
- `GET /api/documents` - Get all user documents
- `GET /api/documents/:id` - Get specific document
- `PUT /api/documents/:id` - Update document metadata
- `DELETE /api/documents/:id` - Delete document
- `GET /api/documents/type/:type` - Get documents by type

#### AI Services
- `POST /api/ai/analyze-history` - Analyze medical history and get lifestyle recommendations
- `POST /api/ai/recommend-insurance` - Get insurance recommendations
- `POST /api/ai/document-insights/:documentId` - Get insights from specific document
- `POST /api/ai/activity-recommendations` - Get personalized activity recommendations

## Project Structure

```
MediSage/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Document.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── documents.js
│   │   └── ai.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   └── server.js
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── Upload.js
│       │   ├── AIInsights.js
│       │   └── Insurance.js
│       ├── context/
│       │   └── AuthContext.js
│       ├── services/
│       │   └── api.js
│       └── App.js
├── package.json
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- File upload validation
- Secure file storage

## Future Enhancements

- OCR for extracting text from scanned documents
- Health metrics tracking
- Appointment scheduling
- Family account management
- Mobile application
- Telemedicine integration
- Export medical history as PDF
- Voice-based document search

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Disclaimer

MediSage is a document management and information system. AI-generated recommendations are for informational purposes only and should not replace professional medical advice. Always consult with healthcare providers for medical decisions.

## Support

For issues, questions, or contributions, please open an issue on GitHub.
