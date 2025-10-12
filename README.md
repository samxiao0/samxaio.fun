# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f2dc3741-0dea-417e-8c4c-c1f6cbac3933

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f2dc3741-0dea-417e-8c4c-c1f6cbac3933) and start prompting.

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

## Using a GitHub token locally (to avoid API rate limits)

If you see GitHub API rate limit errors (403), you can provide a personal access token for local development.

1. Copy `.env.example` to `.env` at the project root (do NOT commit `.env`).
2. Replace the placeholder with your token value:

```env
VITE_GITHUB_TOKEN=ghp_your_personal_access_token_here
```

3. Restart the dev server (`npm run dev`).

Security note: never commit `.env` or your token. In production, proxy requests via a server so the token stays secret.

IMPORTANT: If you accidentally committed or pasted a token (for example into `.env.example` or a chat), revoke it immediately in your GitHub settings and generate a new token. Do not share tokens in public channels.


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

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f2dc3741-0dea-417e-8c4c-c1f6cbac3933) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
