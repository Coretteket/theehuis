<script lang="ts">
  import Button from 'attractions/button/button.svelte';
  import TextField from 'attractions/text-field/text-field.svelte';
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import { registerSchema } from '$lib/client/schema';
  import trpc from '$lib/client/trpc';
  import { showSnackbar } from '$lib/client/snackbar';
  import Loading from '$lib/components/Loading.svelte';
  import { goto } from '$app/navigation';
  import { getRecaptchaToken } from '$lib/util/recaptchaToken';

  let registerLoading = false;

  const { form, errors } = createForm({
    onSubmit: async (values) => {
      registerLoading = true;
      const recaptchaToken = await getRecaptchaToken('register');
      const data = await trpc().mutation('auth:register', { ...values, recaptchaToken });
      registerLoading = false;
      if (data.success) {
        $showSnackbar({ text: 'Account succesvol aangemaakt, je kunt nu inloggen.' });
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
    <div class="ml-auto mr-5 w-min"><Loading /></div>
  {:else}
    <Button outline type="submit" class="ml-auto">Registreer</Button>
  {/if}
</form>

<footer class="text-gray-400 text-sm mt-6">Theehuis maakt gebruik van reCAPTCHA voor het afvangen van spam.</footer>

<style>
  form {
    max-width: 500px;
  }

  form > :global(div) {
    margin-bottom: 1.5rem;
  }
</style>
