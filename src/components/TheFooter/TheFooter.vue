<template>
  <div class="footer-wrapper">
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">
          <p class="footer__copy">© Fort Ross Ventures 2020</p>
          <div class="footer__socials">Socials</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'TheFooter',
  }
</script>

<style lang="scss" scoped>
  .footer-wrapper {
    margin-top: auto;
  }

  .footer {
    background-color: $primary;

    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 100px;
    }

    &__copy {
      color: #ffffff;
      @include FMont;
    }
  }
</style>
