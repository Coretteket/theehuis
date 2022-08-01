<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ session }) => {
    if (session.user) return { status: 302, redirect: '/overzicht' };
  };
</script>

<script lang="ts">
  import { TextField, Button } from 'attractions';
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import { loginSchema } from '$lib/client/schema';
  import { post } from '$lib/util/post';
  import { session } from '$app/stores';
  import type { MutationOutput } from '$lib/client/trpc';
  import { goto } from '$app/navigation';
  import { loading } from '$lib/client/stores';
  import Loading from '$lib/components/Loading.svelte';

  let loginLoading = false;

  const { form, errors } = createForm({
    onSubmit: async (values) => {
      loginLoading = true;
      const response = await post('/inloggen/api', values);
      loginLoading = false;
      if (response.ok) {
        const data: MutationOutput<'auth:login'> = await response.json();
        if (data.success) {
          $session.user = data.user;
          goto('/overzicht');
        } else if (data.error) {
          throw Error(data.error);
        }
        console.log(data.user);
      } else {
        throw Error('Er is iets misgegaan. Probeer het opnieuw.');
      }
    },
    onError: (error) => ({ password: (error as Error).message }),
    extend: validator({ schema: loginSchema }),
  });
</script>

<svelte:head>
  <title>Inloggen ∙ Theehuis</title>
</svelte:head>

<h2 class="text-2xl mb-4">Inloggen</h2>
<p>Nog geen account? <a href="/registreren">Registreer hier</a>.</p>

<form class="my-7" use:form>
  <TextField outline label="E-mailadres" type="email" name="email" error={$errors.email} />
  <TextField outline label="Wachtwoord" type="password" name="password" error={$errors.password} />
  {#if loginLoading}
    <div class="float-right mr-5"><Loading /></div>
  {:else}
    <Button outline type="submit" class="float-right">Log in</Button>
  {/if}
</form>

<style>
  form {
    max-width: 500px;
  }

  form > :global(div) {
    margin-bottom: 1.5rem;
  }
</style>
