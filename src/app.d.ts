/// <reference types="@sveltejs/kit" />

import { Prisma } from '@prisma/client';

type User = Prisma.UserGetPayload<{ [K in keyof Prisma.UserSelect]: true }>;

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  namespace App {
    interface Locals {
      user: Omit<User, 'passwordHash'> | null;
    }
  }
}
