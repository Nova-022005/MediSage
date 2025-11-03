# MediSage Quick Start Guide

This guide will help you get MediSage up and running quickly.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v14 or higher) installed: `node --version`
- ✅ MongoDB installed and running: `mongod --version`
- ✅ Git installed: `git --version`

## Installation Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Nova-022005/MediSage.git
cd MediSage

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medisage
JWT_SECRET=your_super_secret_jwt_key_change_this
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
```

**Note:** 
- Change `JWT_SECRET` to a random secure string
- Get your OpenAI API key from https://platform.openai.com/api-keys
- AI features will not work without a valid OpenAI API key

### 3. Start MongoDB

Ensure MongoDB is running:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# Or run directly
mongod
```

### 4. Run the Application

**Option A: Development Mode (Recommended)**
Runs both frontend and backend concurrently:
```bash
npm run dev
```

**Option B: Separate Terminals**
Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/

## First Use

1. **Register a New Account**
   - Go to http://localhost:3000
   - Click "Register here"
   - Fill in your details
   - Submit

2. **Upload a Document**
   - Click "Upload New Document"
   - Select a medical document (PDF, JPG, PNG)
   - Fill in metadata
   - Upload

3. **Get AI Insights** (requires OpenAI API key)
   - Click "AI Insights"
   - Choose from Medical History, Exercise, Diet, or Wellness
   - Click the button to generate recommendations

4. **Insurance Recommendations** (requires OpenAI API key)
   - Click "Insurance"
   - Get personalized insurance recommendations

## Testing

### Test Backend API
```bash
npm run test:api
```

This will test:
- Health check
- User registration
- User login
- Profile management
- Document retrieval
- AI endpoint availability

## Common Issues

### MongoDB Connection Error
```
Error: MongoDB connection failed
```
**Solution:** Make sure MongoDB is running: `sudo systemctl start mongod` or `brew services start mongodb-community`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using port 5000: `lsof -ti:5000 | xargs kill -9`

### OpenAI API Error
```
Error: AI service not configured
```
**Solution:** Add your OpenAI API key to `.env` file

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install` in the root directory

## Production Build

To build for production:

```bash
# Build frontend
npm run build

# The build files will be in client/build/
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize the UI
- Add your medical documents
- Try the AI features

## Support

For issues or questions:
- Check the [README.md](README.md)
- Open an issue on GitHub
- Review the code documentation

## Security Notes

⚠️ **Important Security Reminders:**
- Change the default `JWT_SECRET` in production
- Never commit `.env` file to version control
- Keep your OpenAI API key secret
- Use HTTPS in production
- Regularly backup your MongoDB database

Happy health tracking with MediSage! 🏥
