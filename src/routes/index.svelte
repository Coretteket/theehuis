<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ session }) => {
    if (session.user) return { status: 302, redirect: '/overzicht' };
    return { status: 302, redirect: '/inloggen' };
  };
</script>
