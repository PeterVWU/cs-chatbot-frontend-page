# Customer Service Chatbot Frontend Page

This project is a responsive, interactive frontend for a customer service chatbot. The chatbot simulates an engaging conversation between a user and an automated assistant. It supports sending messages, receiving bot responses, and presenting action options (such as feedback or creating a ticket).

## Features

- **Interactive Chat Interface:** Engage in real-time conversation via a clean, card-based UI.
- **Actionable Responses:** The bot can prompt for additional actions like feedback or ticket creation.
- **Responsive Design:** Built with Tailwind CSS and ShadcnUI to look great on all devices.
- **Real-Time Data Handling:** Uses TanStack React Query for efficient data fetching and caching.
- **Cloudflare Workers Integration:** Binding with other Cloudflare Workers (and Wrangler) to process incoming messages.

## Tech Stack

- **React & TypeScript:** For building a modern, type-safe user interface.
- **Vite:** A lightning-fast build tool and development server.
- **Tailwind CSS:** For rapidly building custom, responsive designs.
- **Cloudflare Workers & Wrangler:** Handle backend messaging functions and deployment.
- **React Query:** For managing server state and asynchronous data.
- **ShadcnUI & Lucide React:** Provide accessible UI components and elegant icons.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) (or your preferred package manager)
- (Optional) [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) if you plan on deploying locally or to Cloudflare Pages
- Runing the cd-chatbot-backend-worker locally [link](https://github.com/PeterVWU/cs-chatbot-backend-worker)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://git@github.com:PeterVWU/cs-chatbot-frontend-page.git
   cd cs-chatbot-frontend-page
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running Locally

There are a few npm scripts to help you during development:

- **Start the Frontend (Vite Dev Server):**

  ```bash
  npm run dev:frontend
  ```

  This command starts the Vite development server with hot module replacement.

- **Run the Cloudflare Worker Locally:**

  ```bash
  npm run dev:worker
  ```

  This command starts the Cloudflare Worker locally using Wrangler Pages.

- **Run Both Frontend and Worker Concurrently:**

  ```bash
  npm run dev:all
  ```

  This command uses `npm-run-all` to run both the frontend and worker servers in parallel.

### Building and Deployment

- **Build the Project:**

  ```bash
  npm run build
  ```

  This command runs the TypeScript compiler and then builds the project with Vite.

- **Preview the Built Project:**

  ```bash
  npm run preview
  ```

  Use this command to run a local preview of the production build.

- **Deploy to Cloudflare Pages:**

  ```bash
  npm run deploy
  ```

  This command builds the project and deploys it using Wrangler Pages.

## Project Structure

- **src/**: Contains the React application source code.
  - **components/**: UI components such as the Chat Interface, Card, Button, Input, etc.
  - **types/**: TypeScript interfaces for conversation and messaging.
  - **lib/**: Utility functions.
- **functions/**: Contains the Cloudflare Worker function (e.g., `send-message.ts`).
- **public/index.html**: The main HTML file that loads the React app.
- **tailwind.config.js**: TailwindCSS configuration file.
- **vite.config.ts**: Vite configuration for development and proxy settings.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
