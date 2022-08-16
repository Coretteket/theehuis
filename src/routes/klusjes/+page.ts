throw new Error("@migration task: Update load function (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");

import { protect } from '$lib/util/protect';
export const load = protect();
