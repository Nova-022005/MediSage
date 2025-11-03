const express = require('express');
const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('langchain/prompts');
const { LLMChain } = require('langchain/chains');
const Document = require('../models/Document');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Initialize OpenAI
const getOpenAIModel = () => {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    return null;
  }
  return new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
  });
};

// Analyze medical history and provide lifestyle recommendations
router.post('/analyze-history', authMiddleware, async (req, res) => {
  try {
    const model = getOpenAIModel();
    if (!model) {
      return res.status(503).json({ 
        error: 'AI service not configured. Please set OPENAI_API_KEY in environment variables.' 
      });
    }

    // Fetch user data
    const user = await User.findById(req.userId);
    const documents = await Document.find({ userId: req.userId }).sort({ documentDate: -1 });

    // Prepare medical history summary
    const medicalHistory = {
      age: user.dateOfBirth ? Math.floor((Date.now() - new Date(user.dateOfBirth)) / 31557600000) : 'N/A',
      bloodGroup: user.bloodGroup || 'N/A',
      allergies: user.allergies || [],
      chronicConditions: user.chronicConditions || [],
      documentCount: documents.length,
      recentDocuments: documents.slice(0, 10).map(doc => ({
        type: doc.documentType,
        date: doc.documentDate,
        diagnosis: doc.metadata?.diagnosis,
        medications: doc.metadata?.medications,
      })),
    };

    const prompt = PromptTemplate.fromTemplate(`
You are a medical AI assistant analyzing a patient's medical history. Based on the following information, provide personalized lifestyle recommendations.

Patient Information:
- Age: {age}
- Blood Group: {bloodGroup}
- Allergies: {allergies}
- Chronic Conditions: {chronicConditions}
- Number of Medical Documents: {documentCount}
- Recent Medical Records: {recentDocuments}

Please provide:
1. Health Summary: A brief overview of the patient's health status
2. Lifestyle Recommendations: Specific, actionable recommendations for diet, exercise, and daily habits
3. Preventive Measures: Suggestions to prevent potential health issues
4. Wellness Tips: General wellness advice based on their medical history

Format your response in a clear, structured manner with sections and bullet points.
`);

    const chain = new LLMChain({ llm: model, prompt });
    
    const result = await chain.call({
      age: medicalHistory.age,
      bloodGroup: medicalHistory.bloodGroup,
      allergies: medicalHistory.allergies.join(', ') || 'None',
      chronicConditions: medicalHistory.chronicConditions.join(', ') || 'None',
      documentCount: medicalHistory.documentCount,
      recentDocuments: JSON.stringify(medicalHistory.recentDocuments, null, 2),
    });

    res.json({
      analysis: result.text,
      medicalHistory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recommend medical insurance plans
router.post('/recommend-insurance', authMiddleware, async (req, res) => {
  try {
    const model = getOpenAIModel();
    if (!model) {
      return res.status(503).json({ 
        error: 'AI service not configured. Please set OPENAI_API_KEY in environment variables.' 
      });
    }

    const user = await User.findById(req.userId);
    const documents = await Document.find({ userId: req.userId });

    const medicalProfile = {
      age: user.dateOfBirth ? Math.floor((Date.now() - new Date(user.dateOfBirth)) / 31557600000) : 'N/A',
      chronicConditions: user.chronicConditions || [],
      allergies: user.allergies || [],
      medicalVisits: documents.length,
    };

    const prompt = PromptTemplate.fromTemplate(`
You are an insurance advisor AI. Based on the following patient profile, recommend suitable medical insurance plans.

Patient Profile:
- Age: {age}
- Chronic Conditions: {chronicConditions}
- Allergies: {allergies}
- Medical Visits in Records: {medicalVisits}

Please provide:
1. Insurance Needs Assessment: What coverage this patient should prioritize
2. Recommended Insurance Types: Suggest 3-4 types of insurance plans (e.g., comprehensive, critical illness, family floater)
3. Coverage Recommendations: Minimum coverage amount and key features to look for
4. Cost Considerations: Factors that might affect premium
5. Special Considerations: Any specific riders or add-ons to consider based on their health profile

Be specific and practical in your recommendations.
`);

    const chain = new LLMChain({ llm: model, prompt });
    
    const result = await chain.call({
      age: medicalProfile.age,
      chronicConditions: medicalProfile.chronicConditions.join(', ') || 'None',
      allergies: medicalProfile.allergies.join(', ') || 'None',
      medicalVisits: medicalProfile.medicalVisits,
    });

    res.json({
      recommendations: result.text,
      profile: medicalProfile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get health insights from specific document
router.post('/document-insights/:documentId', authMiddleware, async (req, res) => {
  try {
    const model = getOpenAIModel();
    if (!model) {
      return res.status(503).json({ 
        error: 'AI service not configured. Please set OPENAI_API_KEY in environment variables.' 
      });
    }

    const document = await Document.findOne({ _id: req.params.documentId, userId: req.userId });
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const prompt = PromptTemplate.fromTemplate(`
Analyze this medical document and provide insights:

Document Type: {documentType}
Description: {description}
Diagnosis: {diagnosis}
Medications: {medications}
Date: {date}

Provide:
1. Key Findings: Important points from this document
2. Implications: What this means for the patient's health
3. Follow-up Recommendations: Suggested next steps or monitoring
4. Lifestyle Adjustments: Any lifestyle changes to consider based on this document
`);

    const chain = new LLMChain({ llm: model, prompt });
    
    const result = await chain.call({
      documentType: document.documentType,
      description: document.description || 'N/A',
      diagnosis: document.metadata?.diagnosis || 'N/A',
      medications: document.metadata?.medications?.join(', ') || 'N/A',
      date: document.documentDate,
    });

    res.json({
      insights: result.text,
      document: {
        title: document.title,
        type: document.documentType,
        date: document.documentDate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get personalized activity recommendations
router.post('/activity-recommendations', authMiddleware, async (req, res) => {
  try {
    const model = getOpenAIModel();
    if (!model) {
      return res.status(503).json({ 
        error: 'AI service not configured. Please set OPENAI_API_KEY in environment variables.' 
      });
    }

    const user = await User.findById(req.userId);
    const { activityType } = req.body; // e.g., 'exercise', 'diet', 'meditation'

    const prompt = PromptTemplate.fromTemplate(`
Provide personalized {activityType} recommendations for a patient with the following profile:

Age: {age}
Chronic Conditions: {chronicConditions}
Allergies: {allergies}

Create a detailed plan with:
1. Suitable Activities: 5-7 specific activities appropriate for this profile
2. Duration and Frequency: How often and how long for each activity
3. Precautions: What to avoid or be careful about
4. Progress Tracking: How to monitor improvement
5. Modifications: Easier and harder variations based on fitness level
`);

    const chain = new LLMChain({ llm: model, prompt });
    
    const result = await chain.call({
      activityType: activityType || 'wellness',
      age: user.dateOfBirth ? Math.floor((Date.now() - new Date(user.dateOfBirth)) / 31557600000) : 'N/A',
      chronicConditions: user.chronicConditions?.join(', ') || 'None',
      allergies: user.allergies?.join(', ') || 'None',
    });

    res.json({
      recommendations: result.text,
      activityType: activityType || 'wellness',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
