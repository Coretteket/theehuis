<div {...$$restProps}>
  <div class="sk-chase">
    {#each Array(6).fill(0) as _}
      <div class="sk-chase-dot" />
    {/each}
  </div>
</div>

<style lang="scss">
  .sk-chase {
    width: 40px;
    height: 40px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
  }

  .sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2s infinite ease-in-out both;
  }

  .sk-chase-dot:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: #920075;
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
  }

  @for $i from 1 through 6 {
    .sk-chase-dot:nth-child(#{$i}),
    .sk-chase-dot:nth-child(#{$i}):before {
      animation-delay: -1.2s + 0.1s * $i;
    }
  }

  @keyframes sk-chase {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
</style>
