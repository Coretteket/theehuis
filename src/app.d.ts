/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    user: Omit<User, 'passwordHash'> | null;
  }
  // interface Platform {}
  interface Session {
    user: Omit<User, 'passwordHash'> | null;
  }
  // interface Stuff {}
}
