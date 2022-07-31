<script lang="ts">
  import { TextField, Button } from 'attractions';
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-zod';
  import { loginSchema } from '$lib/client/schema';
  import trpc from '$lib/client/trpc';

  const { form, errors } = createForm({
    onSubmit: async (values) => {
      const response = await trpc().mutation('auth:login', values);
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
    extend: validator({ schema: loginSchema }),
  });
</script>

<form use:form>
  <TextField outline label="E-mailadres" type="email" name="email" error={$errors.email} />
  <TextField outline label="Wachtwoord" type="password" name="password" error={$errors.password} />
  <Button outline type="submit" class="float-right">Log in</Button>
</form>

<style>
  form {
    max-width: 500px;
  }

  form > :global(div) {
    margin-bottom: 1.5rem;
  }
</style>
