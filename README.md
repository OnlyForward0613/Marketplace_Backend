# NestJS NFT Marketplace

Welcome to the NestJS NFT Marketplace project! This is a full-stack application built using NestJS, Prisma, and PostgreSQL. The project provides user authentication, NFTs collection, and a launchpad for new collections. It's designed to help you get started with building your own NFT marketplace.

## Features

- User Authentication: Secure user registration and login using JWT tokens.
- NFTs Collection: Create, manage, and showcase your unique NFTs.
- Launchpad: Introduce new NFT collections to the market with pre-sales and auctions.

## Prerequisites

- Node.js (v18 or higher)
- Docker (for PostgreSQL)
- Prisma CLI (installed globally)
- Yarn package manager

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/sasuke0601/ink-backend
   cd nestjs-nft-marketplace
  ```
2. Install dependencies:
  ```sh
  yarn install
  ```
3. Set up your PostgreSQL database using Docker:
  ```sh
  docker-compose up -d
  ```
4. Set up your Prisma schema and generate the Prisma client:
  ```sh
  npx prisma migrate dev
  npx prisma generate
  ```
5. Start the development server:
```sh
yarn start:dev
```

# Usage
- Register a new user account.
- Log in to your account.
- Create and manage your NFT collections.
- Explore the marketplace and participate in launchpad events.

