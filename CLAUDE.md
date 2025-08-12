# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Better-chatbot is a Next.js 15 application built with TypeScript that implements a modern AI chatbot with support for the Model Context Protocol (MCP), multi-provider AI models, and visual workflow creation. The app uses PostgreSQL for data persistence, supports multiple AI providers, and includes a comprehensive tool system for enhanced conversational capabilities.

## Development Commands

### Core Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm dev:https` - Start development server with experimental HTTPS
- `pnpm build` - Production build
- `pnpm build:local` - Local build without HTTPS requirements
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run ESLint and Biome linter with auto-fix
- `pnpm lint:fix` - Fix linting issues
- `pnpm format` - Format code with Biome
- `pnpm check-types` - TypeScript type checking
- `pnpm check` - Run all checks (lint, types, tests)

### Testing
- `pnpm test` - Run tests with Vitest
- `pnpm test:watch` - Run tests in watch mode
- Test files use `.test.ts` suffix and are co-located with source files

### Database Operations
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:reset` - Drop and recreate database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio

### Docker Operations
- `pnpm docker-compose:up` - Start all services with Docker Compose
- `pnpm docker-compose:down` - Stop Docker services
- `pnpm docker:redis` - Start Redis container
- `pnpm docker:app` - Build and run app container

## Architecture Overview

### App Router Structure
The application uses Next.js 15 App Router with a clear separation between authenticated and unauthenticated routes:

- `src/app/(auth)/` - Authentication pages (sign-in, sign-up)
- `src/app/(chat)/` - Main application routes (chat, agents, workflows, MCP management)
- `src/app/api/` - API routes for all backend functionality

### Core Systems

#### AI Model Integration (`src/lib/ai/models.ts`)
- Multi-provider support: OpenAI, Anthropic, Google, xAI, OpenRouter, Ollama
- Dynamic model configuration with tool support detection
- OpenAI-compatible provider integration via configuration

#### MCP (Model Context Protocol) System (`src/lib/ai/mcp/`)
- Dynamic MCP server management with database or file-based configuration
- OAuth flow support for MCP server authentication
- Tool customization per user and server
- Real-time MCP client management with connection pooling

#### Database Layer (`src/lib/db/pg/`)
- Drizzle ORM with PostgreSQL
- Repository pattern for data access
- Comprehensive schema for chat threads, messages, agents, workflows, and MCP configurations
- Migration system for schema evolution

#### Workflow System (`src/lib/ai/workflow/`)
- Visual workflow builder with node-based editor
- Workflow execution engine with dependency resolution
- LLM, Tool, HTTP, Template, Input, Output, and Condition node types
- Workflow publishing and sharing system

### Key Components Architecture

#### Chat System
- Real-time chat with streaming responses
- Tool invocation and result display
- Message threading and persistence
- Voice chat integration with OpenAI Realtime API

#### Agent System
- Custom AI agents with specific instructions and tool access
- Agent sharing with visibility controls (public/private/readonly)
- Icon customization and description management

#### Tool Integration
- Built-in tools: web search, JavaScript execution, data visualization
- MCP tool integration with mention system (@tool syntax)
- Tool customization with per-user instructions
- Tool mode selection (auto/manual/none)

## Import Path Conventions

The project uses custom TypeScript path mapping:
- `ui/*` → `./src/components/ui/*` (UI components)
- `auth/*` → `./src/lib/auth/*` (Authentication utilities)
- `app-types/*` → `./src/types/*` (Type definitions)
- `lib/*` → `./src/lib/*` (Library functions)
- `@/*` → `./src/*` (General source files)

## Environment Setup

Key environment variables (`.env` file is auto-generated on `pnpm i`):
- **LLM Providers**: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`, `OPENROUTER_API_KEY`, `XAI_API_KEY`
- **Database**: `POSTGRES_URL` (Supabase recommended for development)
- **Authentication**: `BETTER_AUTH_SECRET` (generate with: `npx @better-auth/cli@latest secret`)
- **Tools**: `EXA_API_KEY` (for web search functionality)
- **MCP Config**: `FILE_BASED_MCP_CONFIG=false` (use database-based MCP config by default)

## Testing Strategy

- Vitest for unit testing with TypeScript path support
- Test files use `.test.ts` suffix
- Key areas with test coverage: AI utilities, workflow system, MCP configuration

## Code Quality Standards

- Biome for formatting and linting (with ESLint)
- Strict TypeScript configuration with custom path mapping
- Pre-commit hooks with lint-staged for automated formatting
- Type safety with Zod schemas for runtime validation

## MCP Development Notes

When working with MCP servers:
1. Server configurations are stored in database (McpServerSchema)
2. OAuth flows are supported for server authentication
3. Tool customizations are per-user (McpToolCustomizationSchema)
4. Server and tool customizations allow additional prompts/instructions

## Workflow Development Notes

When working with workflows:
1. Workflows are versioned with semantic versioning
2. Nodes and edges are stored separately with foreign key relationships
3. Workflow execution uses a graph-based dependency resolver
4. UI configuration is stored separately from business logic configuration

## Archive System

The project includes an archive system for content organization:
- Users can create named archive collections with descriptions
- Chat conversations and other content can be saved to archives
- Each archive item is tracked with timestamps for organization
- Archives are user-specific with cascade deletion support

## Key Architecture Patterns

### Repository Pattern
- All data access is abstracted through repository interfaces
- PostgreSQL implementation using Drizzle ORM
- Type-safe database operations with schema inference

### Tool System Architecture
- Built-in tools (web search, JS execution, data visualization)
- MCP tool integration with @mention syntax
- Per-user tool customization support
- Tool mode selection (auto/manual/none)

### Real-time Features
- Streaming chat responses with AI SDK
- Voice chat using OpenAI Realtime API
- Real-time tool invocation and result display