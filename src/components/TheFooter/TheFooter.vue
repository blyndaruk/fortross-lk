<template>
  <div class="footer-wrapper">
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">
          <p class="footer__copy">© Fort Ross Ventures 2020</p>
          <div class="footer__socials">
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import Socials from '@/components/Socials/Socials';

  export default {
    name: 'TheFooter',
    components: {
      Socials,
    },
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
      @include xs {
        flex-direction: column-reverse;
        align-items: flex-start;
        justify-content: center;
        min-height: 158px;
      }
    }

    &__copy {
      color: #ffffff;
      @include FMont;
      @include xs {
        margin-top: 30px;
      }
    }
  }
</style>
