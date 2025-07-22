# AI Image Analyzer

A web application that uses AI to analyze and describe images using the Imagga API.

## Features

- Upload images through a web interface
- AI-powered image analysis and description
- MongoDB storage for analyzed images
- Modern, responsive UI
- Real-time image preview

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Imagga API account (free tier available)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd image-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/image-ai
   IMAGGA_API_KEY=your_imagga_api_key_here
   IMAGGA_API_SECRET=your_imagga_api_secret_here
   PORT=5000
   ```

4. **Get Imagga API credentials**
   - Sign up at [Imagga](https://imagga.com/)
   - Get your API key and secret from the dashboard
   - Add them to your `.env` file

5. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud instance.

6. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

7. **Access the application**
   Open your browser and go to `http://localhost:5000`

## API Endpoints

- `POST /analyze` - Upload and analyze an image
- `GET /` - Serve the main application page
- `GET /uploads/:filename` - Serve uploaded images

## Project Structure

```
image-ai/
├── config/
│   └── db.js          # MongoDB connection
├── frontend/
│   ├── index.html     # Main application page
│   └── style.css      # Styling
├── Model/
│   └── image.js       # MongoDB schema
├── uploads/           # Uploaded images (auto-created)
├── index.js           # Main server file
├── package.json       # Dependencies
└── README.md          # This file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer
- **AI Service**: Imagga API
- **Frontend**: HTML, CSS, JavaScript
- **Development**: Nodemon

## Troubleshooting

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGO_URI` in the `.env` file

2. **Imagga API Error**
   - Verify your API credentials in the `.env` file
   - Check your Imagga account status

3. **Upload Directory Error**
   - The `uploads` directory is automatically created
   - Ensure the application has write permissions

## License

ISC 