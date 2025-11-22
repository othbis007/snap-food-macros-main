# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0bbe10f8-846e-42de-b0ea-9b2783bf3eb3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0bbe10f8-846e-42de-b0ea-9b2783bf3eb3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- OpenAI API (for chatbot)

## Features

- **AI-Powered Nutrition Analysis**: Upload meal photos to get instant nutritional breakdowns
- **Nutrition Chatbot**: Interactive AI assistant specialized in nutrition advice (left sidebar)
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Configuration

### OpenAI API Key (for Chatbot)

To use the nutrition chatbot feature, you'll need to set up an OpenAI API key:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env` file in the root directory
3. Add your API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Restart the development server

**Note**: The chatbot requires a valid OpenAI API key to function. Without it, you'll see an error message when trying to use the chatbot.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0bbe10f8-846e-42de-b0ea-9b2783bf3eb3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
