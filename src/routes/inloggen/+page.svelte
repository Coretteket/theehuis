<script lang="ts">
  import { TextField, Button } from 'attractions';
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import { loginSchema } from '$lib/client/schema';
  import { post } from '$lib/util/post';
  import { session } from '$app/stores';
  import type { MutationOutput } from '$lib/client/trpc';
  import { goto } from '$app/navigation';
  import Loading from '$lib/components/Loading.svelte';
  import trpc from '$lib/client/trpc';
  import { getRecaptchaToken } from '$lib/util/getRecaptchaToken';

  let loginLoading = false;

  const { form, errors } = createForm({
    onSubmit: async (values) => {
      loginLoading = true;
      const recaptchaToken = await getRecaptchaToken('login');
      const response = await post('/inloggen/api', { ...values, recaptchaToken });
      loginLoading = false;

      if (response.ok) {
        const data: MutationOutput<'auth:login'> = await response.json();
        if (data.success) {
          const user = await trpc().query('user:get');
          $session.user = { ...$session.user, ...user };
          goto('/overzicht');
        } else if (data.error) {
          throw Error(data.error);
        }
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
    <div class="ml-auto mr-5 w-min"><Loading /></div>
  {:else}
    <Button outline type="submit" class="ml-auto">Log in</Button>
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