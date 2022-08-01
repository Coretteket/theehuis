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
  import { registerSchema } from '$lib/client/schema';
  import trpc from '$lib/client/trpc';
  import { showSnackbar } from "$lib/client/snackbar";
showSnackbar } from '$lib/client/stores';
  import Loading from '$lib/components/Loading.svelte';

  let registerLoading = false;

  const { form, errors } = createForm({
    onSubmit: async (values) => {
      registerLoading = true;
      const data = await trpc().mutation('auth:register', values);
      registerLoading = false;
      if (data.success) {
        $showSnackbar({
          text: 'Account succesvol aangemaakt, je kunt nu inloggen.',
        });
        goto('/inloggen');
      } else if (data.error) {
        throw Error(data.error);
      }
    },
    onError: (error) => ({ email: (error as Error).message }),
    extend: validator({ schema: registerSchema }),
  });
</script>

<svelte:head>
  <title>Registreren ∙ Theehuis</title>
</svelte:head>

<h2 class="text-2xl mb-4">Registreren</h2>
<p>Al een account? <a href="/inloggen">Log hier in</a>.</p>

<form class="my-7" use:form>
  <TextField outline label="Voornaam" type="test" name="name" error={$errors.name} />
  <TextField outline label="E-mailadres" type="email" name="email" error={$errors.email} />
  <TextField outline label="Wachtwoord" type="password" name="password" error={$errors.password} />
  {#if registerLoading}
    <div class="float-right mr-5"><Loading /></div>
  {:else}
    <Button outline type="submit" class="float-right">Registreer</Button>
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
