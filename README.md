# Thinkr - AI-Powered Google Cloud Certification Assistant

A hybrid Next.js + Python application that helps with Google Cloud Certifications using advanced AI and vector search capabilities.

## 🏗️ Architecture

This is a **hybrid architecture** that combines the best of both worlds:

```
┌─────────────────┐    HTTP API     ┌─────────────────┐
│   Next.js       │ ──────────────> │   FastAPI       │
│   Frontend      │                 │   Backend       │
│   (Port 3000)   │ <────────────── │   (Port 8000)   │
└─────────────────┘                 └─────────────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │   BigQuery      │
                                    │   Vector Store  │
                                    │   + Gemini AI   │
                                    └─────────────────┘
```

## ✨ Features

- 🤖 **Advanced AI**: Google Gemini 2.5-flash with conversation context
- 📚 **Vector Search**: BigQuery Vector Store with VertexAI embeddings
- 🎨 **Modern UI**: Beautiful dark-themed chat interface with markdown support
- 💬 **Real-time Chat**: Interactive conversation with message history
- 🔄 **Context Awareness**: AI remembers previous messages in conversation
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Fast Performance**: Next.js frontend + Python backend optimization

## 🛠️ Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.8+ (for backend)
- **Google Cloud Project** with:
  - BigQuery API enabled
  - Vertex AI API enabled
  - Service account with appropriate permissions
- **Google API Key** for Gemini

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo>
cd thinkr-js
```

### 2. Environment Configuration

Copy the example environment file:
```bash
cp .env.example backend/.env
```

Edit the backend/.env file with your credentials:
```env
PROJECT="your-gcp-project-id"
DATASET="your-bigquery-dataset-name"
TABLE="your-bigquery-table-name"
REGION="us-central1"
GOOGLE_API_KEY="your-google-api-key"
```

### 3. Frontend Setup (Next.js)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

### 4. Backend Setup (Python/FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py
```

Backend API will be available at: **http://localhost:8000**

### 5. Access the Application

- **Main App**: http://localhost:3000
- **API Documentation**: http://localhost:8000/docs
- **API Health Check**: http://localhost:8000/health

## 📁 Project Structure

```
thinkr-js/
├── app/                    # Next.js app directory
│   ├── api/               # Frontend API routes (unused in hybrid)
│   ├── globals.css        # Global styles
│   └── page.tsx          # Main page component
├── components/            # React components
│   └── ChatInterface.tsx # Main chat interface
├── backend/              # Python FastAPI backend
│   ├── main.py          # FastAPI application
│   ├── ai.py            # AI helper with vector search
│   ├── requirements.txt # Python dependencies
│   └── .env            # Backend environment variables
├── lib/                 # Utility libraries
├── .env.local          # Frontend environment variables
├── .env.example        # Environment template
└── README.md           # This file
```

## 🔧 Configuration

### Google Cloud Setup

1. **Create a Google Cloud Project**
2. **Enable APIs**:
   - BigQuery API
   - Vertex AI API
   - AI Platform API
3. **Create BigQuery Dataset and Table** for vector storage
4. **Get Google API Key** for Gemini
5. **Set up authentication** (service account or application default credentials)

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PROJECT` | Google Cloud Project ID | `my-gcp-project` |
| `DATASET` | BigQuery dataset name | `certification_data` |
| `TABLE` | BigQuery table name | `documents_vector` |
| `REGION` | Google Cloud region | `us-central1` |
| `GOOGLE_API_KEY` | Google AI API key | `AIza...` |

## 💡 Usage Examples

### Basic Questions
- "Tell me about the Google Associate Cloud Engineer certification"
- "What are the exam requirements for Professional Cloud Architect?"
- "How much does the certification cost?"

### Follow-up Questions (with context)
- "What career paths can I take with this?" (after asking about a specific cert)
- "How does it compare to AWS certifications?" (contextual comparison)
- "What study materials do you recommend?" (follows previous certification discussion)

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Backend (Google Cloud Run)
1. Build Docker container from backend/
2. Deploy to Cloud Run
3. Update frontend API endpoint to production URL

## 🛠️ Development

### Adding New Features
1. **Frontend changes**: Modify components in `/components` or pages in `/app`
2. **Backend changes**: Update `/backend/main.py` or `/backend/ai.py`
3. **AI improvements**: Enhance prompts and vector search in `ai.py`

### API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health status
- `POST /api/chat` - Main chat endpoint
  ```json
  {
    "query": "Your question here",
    "chatHistory": [/* previous messages */]
  }
  ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

**Frontend not connecting to backend:**
- Ensure backend is running on port 8000
- Check CORS configuration in `backend/main.py`

**BigQuery connection issues:**
- Verify Google Cloud credentials
- Check BigQuery dataset/table exists
- Ensure proper IAM permissions

**Dependencies issues:**
- Use `--legacy-peer-deps` flag with npm install
- Ensure Python virtual environment is activated

### Getting Help

- Check the API docs at http://localhost:8000/docs
- Review console logs in browser developer tools
- Check backend logs in terminal

---

**Built with ❤️ using Next.js, FastAPI, LangChain, and Google Cloud AI**