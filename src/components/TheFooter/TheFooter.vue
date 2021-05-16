<template>
  <div class="footer-wrapper">
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">
          <p class="footer__copy">© Fort Ross Ventures 2020</p>
          <a href="https://www.fortross.vc/privacy/" class="footer__privacy">Privacy Policy</a>
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
      /*justify-content: space-between;*/
      min-height: 100px;
      @include xs {
        /*flex-direction: column-reverse;*/
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        min-height: 158px;
      }
    }

    &__privacy {
      margin-left: 20px;
      font-size: 12px;
      color: #ababab;
      text-decoration: none;
      transition: color $easing-default;
      @include xs {
        margin-left: 0;
        margin-top: 10px;
        order: 3;
      }

      &:hover {
        color: #ffffff;
      }
    }

    &__socials {
      margin-left: auto;
      @include xs {
        margin-left: 0;
        order: 1;
      }
    }

    &__copy {
      color: #ffffff;
      @include FMont;
      @include xs {
        margin-top: 30px;
        order: 2;
      }
    }
  }
</style>
