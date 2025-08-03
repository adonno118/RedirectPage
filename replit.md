# Overview

This is a modern full-stack web application built with React frontend and Express.js backend. The project uses a monorepo structure with shared schema definitions between client and server. It features a clean, modern UI built with shadcn/ui components and Tailwind CSS, with PostgreSQL database integration via Drizzle ORM. The application is currently in a minimal state with basic routing and a loading page that includes Google Analytics integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation resolvers

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **API Design**: RESTful API structure with `/api` prefix
- **Development**: Hot reload with tsx for TypeScript execution

## Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless driver
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Schema Location**: Shared schema in `/shared/schema.ts` for type consistency
- **Storage Interface**: Abstracted storage layer with both memory and database implementations

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **User Schema**: Basic user model with username/password fields
- **Storage Abstraction**: Prepared for both in-memory and persistent user storage

## External Dependencies
- **Database Hosting**: Neon Database (PostgreSQL-compatible serverless)
- **Analytics**: Google Analytics 4 with conversion tracking
- **UI Components**: Radix UI primitives for accessible component foundation
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build Process**: esbuild for server bundling, Vite for client bundling

The architecture follows a clear separation of concerns with shared types between frontend and backend, making it easy to maintain consistency across the full stack. The storage layer is abstracted to allow for easy switching between development (memory) and production (database) implementations.