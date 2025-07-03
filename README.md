t# Gemini AI Code Reviewer

## Overview
Gemini AI Code Reviewer is a project that provides an AI-powered code review service. It uses Google Gemini AI to analyze and review code snippets, providing detailed feedback on code quality, bugs, suggestions, and improvements.

## Project Structure
- **Backend/**: Contains the Express.js backend API service.
- **Frontend/**: Contains the frontend React application.
- **README.md**: Project documentation.
- **package.json**: Root project configuration.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- Google Gemini AI API key (set as environment variable `GOOGLE_GEMINI_KEY`)

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set the environment variable for Google Gemini API key:
   ```bash
   export GOOGLE_GEMINI_KEY=your_api_key_here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
5. The backend API will be available at `http://localhost:3000/ai`.

### Frontend Setup
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. The frontend app will be available at `http://localhost:5173` (or as indicated in the terminal).

## Usage
- Use the frontend UI to input code snippets for review.
- The frontend sends the code to the backend API `/ai/get-review` endpoint.
- The backend uses Google Gemini AI to generate a detailed code review and returns it to the frontend.

## Testing
- Backend tests are located in `Backend/test/`.
- Run backend tests with:
  ```bash
  npm test
  ```
- Frontend testing instructions to be added.

## Contributing
Contributions are welcome. Please open issues or pull requests for improvements or bug fixes.

## License
MIT License
