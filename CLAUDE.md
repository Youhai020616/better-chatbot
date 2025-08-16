# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
pnpm dev                    # Start development server with Turbopack
pnpm dev:https             # Start with HTTPS (for OAuth testing)
pnpm build                 # Production build
pnpm build:local           # Local build without HTTPS
pnpm start                 # Start production server
```

### Code Quality
```bash
pnpm lint                  # Run Next.js and Biome linting
pnpm lint:fix              # Auto-fix linting issues
pnpm format                # Format code with Biome
pnpm check-types           # TypeScript type checking
pnpm test                  # Run Vitest tests
pnpm test:watch            # Run tests in watch mode
pnpm check                 # Run all quality checks (lint, types, tests)
```

### Database Operations
```bash
pnpm db:generate           # Generate Drizzle migrations
pnpm db:push               # Push schema changes to database
pnpm db:migrate            # Run database migrations
pnpm db:studio             # Open Drizzle Studio
pnpm db:reset              # Drop and recreate database
```

### Setup & Initialization
```bash
pnpm initial:env                    # Generate initial .env file
pnpm openai-compatiable:init        # Initialize OpenAI-compatible providers
pnpm openai-compatiable:parse       # Parse OpenAI-compatible configurations
```

### Docker Development
```bash
pnpm docker-compose:up             # Start all services with Docker Compose
pnpm docker-compose:down           # Stop all services
pnpm docker-compose:logs           # View logs
pnpm docker:redis                  # Start Redis container only
```

## Architecture Overview

### Core Technologies
- **Framework**: Next.js 15 with App Router and Turbopack
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with OAuth providers (GitHub, Google, Microsoft)
- **AI Integration**: AI SDK with multiple providers (OpenAI, Anthropic, Google, xAI, OpenRouter)
- **MCP Integration**: Model Context Protocol for tool calling and server management
- **UI**: React 19, Tailwind CSS 4, Radix UI components
- **Testing**: Vitest for unit testing
- **Code Quality**: Biome for linting and formatting

### Key Architectural Patterns

#### Multi-Provider AI System
The application supports multiple AI providers through a unified interface:
- Static models: Direct provider SDKs (OpenAI, Anthropic, Google, xAI, Ollama)
- OpenRouter: Access to 300+ models through unified API
- OpenAI-compatible providers: Custom provider support
- Tool calling support with automatic unsupported model detection

#### MCP (Model Context Protocol) Integration
Comprehensive MCP server management for extending AI capabilities:
- Dynamic server configuration and OAuth flows
- Tool customization and schema validation
- Multi-server orchestration and client management
- File-based and database-backed configuration storage

#### Workflow System
Visual workflow builder for complex AI tasks:
- Node-based workflow editor using ReactFlow
- Multiple node types: Input, LLM, Tool, HTTP, Condition, Template, Output
- Dependency graph execution with cycle detection
- JSON Schema validation for node configurations

#### Chat System Architecture
- Thread-based conversations with message persistence
- Agent system with custom instructions and tool configurations
- Real-time streaming responses
- Archive system for conversation management
- Voice chat integration with OpenAI Realtime API

### Database Schema Structure
- **Users**: Authentication and preferences
- **Chat Threads & Messages**: Conversation storage with JSON message parts
- **Agents**: Custom AI assistants with tool configurations
- **MCP Servers**: Server configurations and OAuth credentials
- **Workflows**: Visual workflow definitions with nodes and edges
- **Archives**: Conversation archival system

### Authentication Flow
Uses Better Auth with support for:
- Email/password authentication with secure password hashing
- OAuth providers (GitHub, Google, Microsoft) with configurable prompts
- Session management with secure token handling
- Configurable sign-up and social auth enablement

### API Structure
RESTful API endpoints organized by feature:
- `/api/chat/*` - Chat operations and streaming
- `/api/agent/*` - Agent management
- `/api/mcp/*` - MCP server operations and OAuth
- `/api/workflow/*` - Workflow execution and management
- `/api/auth/*` - Authentication operations

### Frontend Organization
- **Components**: Reusable UI components with Radix UI integration
- **Hooks**: Custom React hooks for data fetching and state management
- **Layouts**: App shell with sidebar navigation and responsive design
- **Pages**: Route-based page components following App Router conventions

## Important Implementation Notes

### Environment Configuration
The application requires multiple environment variables for full functionality:
- Database connection (PostgreSQL)
- AI provider API keys (OpenAI, Anthropic, Google, etc.)
- OAuth credentials for social authentication
- Optional Redis for caching
- MCP server configurations

### OpenAI-Compatible Providers
The system supports custom OpenAI-compatible providers through environment variable configuration. Use the initialization scripts to set up new providers.

### MCP Server Management
MCP servers can be configured through the UI with OAuth flows for authentication. Server configurations support both file-based and database storage patterns.

### Tool System
The application includes a comprehensive tool system:
- Built-in tools: Code execution, web search, data visualization
- MCP tools: Dynamically loaded from configured servers
- Tool customization: Schema modification and parameter overrides

### Testing Strategy
- Unit tests with Vitest for utility functions and business logic
- Component testing for React components
- Integration testing for API endpoints
- Manual testing workflows for complex AI interactions

### Internationalization
Built-in support for multiple languages using next-intl:
- Message files in `/messages/` directory
- Supported languages: English, Spanish, French, Japanese, Korean, Chinese
- Locale-based routing and content adaptation

### Performance Considerations
- Turbopack for fast development builds
- Streaming responses for AI chat interactions
- Efficient database queries with Drizzle ORM
- Component-level code splitting
- Image optimization with Next.js built-in features