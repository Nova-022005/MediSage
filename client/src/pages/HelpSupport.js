import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import './HelpSupport.css';

const HelpSupport = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const faqCategories = [
        { id: 'all', name: 'All Topics', icon: '📚' },
        { id: 'account', name: 'Account', icon: '👤' },
        { id: 'documents', name: 'Documents', icon: '📄' },
        { id: 'security', name: 'Security', icon: '🔒' },
        { id: 'insurance', name: 'Insurance', icon: '🏥' },
    ];

    const faqs = [
        {
            id: 1,
            category: 'account',
            question: 'How do I create an account?',
            answer: 'Click on the "Register" button on the homepage, fill in your details including name, email, and password, then verify your email address to activate your account.'
        },
        {
            id: 2,
            category: 'account',
            question: 'How do I reset my password?',
            answer: 'Click "Forgot Password" on the login page, enter your registered email address, and follow the instructions sent to your email to reset your password.'
        },
        {
            id: 3,
            category: 'documents',
            question: 'What types of documents can I upload?',
            answer: 'You can upload various medical documents including prescriptions, lab reports, X-rays, MRI scans, discharge summaries, vaccination records, and insurance documents. Supported formats include PDF, JPEG, PNG, and DICOM.'
        },
        {
            id: 4,
            category: 'documents',
            question: 'How do I organize my documents?',
            answer: 'Documents are automatically categorized by type. You can also add custom tags, dates, and descriptions to make them easier to find. Use the search and filter options on your dashboard to quickly locate specific documents.'
        },
        {
            id: 5,
            category: 'documents',
            question: 'Is there a limit to document uploads?',
            answer: 'Free accounts can upload up to 100 documents with a total size of 5GB. Premium accounts have unlimited document uploads with 50GB of storage.'
        },
        {
            id: 6,
            category: 'security',
            question: 'How is my data protected?',
            answer: 'Your data is protected with end-to-end encryption, secure cloud storage, and HIPAA-compliant security measures. We use industry-standard SSL/TLS protocols and regular security audits.'
        },
        {
            id: 7,
            category: 'security',
            question: 'Can I enable two-factor authentication?',
            answer: 'Yes! Go to Settings > Security and enable Two-Factor Authentication. You can use SMS or authenticator apps like Google Authenticator for an extra layer of security.'
        },
        {
            id: 8,
            category: 'security',
            question: 'Who can access my medical records?',
            answer: 'Only you have access to your medical records. You can choose to share specific documents with healthcare providers or family members through secure sharing links with expiration dates.'
        },
        {
            id: 9,
            category: 'insurance',
            question: 'How does the insurance integration work?',
            answer: 'Link your insurance provider account to automatically import coverage details, track claims, and verify what treatments are covered. We support major insurance providers and update information in real-time.'
        },
        {
            id: 10,
            category: 'insurance',
            question: 'Can I submit insurance claims through MediSage?',
            answer: 'Yes, you can submit claims directly through the Insurance section. Upload the required documents, fill in the claim form, and track your claim status in real-time.'
        },
        {
            id: 11,
            category: 'documents',
            question: 'How do I share documents with my doctor?',
            answer: 'Select the document(s) you want to share, click "Share", enter your doctor\'s email, and set an expiration date. Your doctor will receive a secure link to view the documents.'
        },
        {
            id: 12,
            category: 'account',
            question: 'How do I delete my account?',
            answer: 'Go to Settings > Privacy, scroll to the bottom, and click "Delete Account". Note that this action is permanent and will delete all your data after a 30-day grace period.'
        }
    ];

    const quickLinks = [
        {
            title: 'Getting Started Guide',
            description: 'Learn the basics of using MediSage',
            icon: '🚀',
            action: 'guide'
        },
        {
            title: 'Video Tutorials',
            description: 'Watch step-by-step video guides',
            icon: '🎥',
            action: 'videos'
        },
        {
            title: 'Community Forum',
            description: 'Connect with other users',
            icon: '💬',
            action: 'forum'
        },
        {
            title: 'System Status',
            description: 'Check service availability',
            icon: '📊',
            action: 'status'
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
            setContactForm({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const handleContactChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <DashboardNavbar />
            <div className="help-container">
                <div className="help-header">
                    <h1>Help & Support</h1>
                    <p>We're here to help you get the most out of MediSage</p>
                </div>

                {/* Quick Links */}
                <div className="quick-links">
                    {quickLinks.map((link, index) => (
                        <div key={index} className="quick-link-card">
                            <div className="quick-link-icon">{link.icon}</div>
                            <h3>{link.title}</h3>
                            <p>{link.description}</p>
                        </div>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <div className="search-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for help articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="faq-categories">
                    {faqCategories.map(category => (
                        <button
                            key={category.id}
                            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <span>{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map(faq => (
                                <div key={faq.id} className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}>
                                    <button
                                        className="faq-question"
                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    >
                                        <span>{faq.question}</span>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="faq-arrow"
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                    {expandedFaq === faq.id && (
                                        <div className="faq-answer">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No articles found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-section">
                    <h2>Still need help?</h2>
                    <p className="contact-subtitle">Send us a message and we'll get back to you within 24 hours</p>

                    {formSubmitted && (
                        <div className="success-message">
                            ✓ Message sent successfully! We'll get back to you soon.
                        </div>
                    )}

                    <form onSubmit={handleContactSubmit} className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={contactForm.name}
                                    onChange={handleContactChange}
                                    required
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={contactForm.email}
                                    onChange={handleContactChange}
                                    required
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={contactForm.subject}
                                onChange={handleContactChange}
                                required
                                placeholder="What do you need help with?"
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={contactForm.message}
                                onChange={handleContactChange}
                                required
                                rows="6"
                                placeholder="Describe your issue or question in detail..."
                            />
                        </div>
                        <button type="submit" className="btn-submit">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Methods */}
                <div className="contact-methods">
                    <div className="contact-method">
                        <div className="method-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <h3>Email</h3>
                        <p>support@medisage.com</p>
                    </div>
                    <div className="contact-method">
                        <div className="method-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <h3>Phone</h3>
                        <p>1-800-MEDISAGE</p>
                    </div>
                    <div className="contact-method">
                        <div className="method-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <h3>Live Chat</h3>
                        <p>Available 24/7</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HelpSupport;
