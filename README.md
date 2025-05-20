# Vapi AI Assistant - Next.js Integration

This project demonstrates a minimalist Next.js application that integrates with Vapi AI for voice conversations.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with your Vapi credentials:
   ```
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=5942b814-e98b-47a6-b984-9d81d400b06a
   NEXT_PUBLIC_ASSISTANT_ID=b6c8c7e5-2f60-4c71-88ce-4726cd1c9863
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Features

- One-click AI assistant calling
- Visual call status indicators
- Error handling and status monitoring
- Comprehensive event tracking with console logs

## Deployment

Deploy to Vercel by connecting this repository to your Vercel account.

Remember to add the environment variables in the Vercel dashboard:
- NEXT_PUBLIC_VAPI_PUBLIC_KEY
- NEXT_PUBLIC_ASSISTANT_ID 