<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header__inner">
          <div class="header__left">
            <div class="header__langs">
              <LocaleSwitcher />
            </div>
            <div class="header__id">ID 2345098-781-23</div>
          </div>
          <div class="header__center">
            <Logo />
          </div>
          <div class="header__right">
            <div class="header__fund">
              {{ $t('fund') }}
              <span>FRV LATE STAGE FUND</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
  import Logo from '@/components/Logo/Logo';

  export default {
    name: 'TheHeader',
    components: {
      LocaleSwitcher,
      Logo,
    },
  }
</script>

<style lang="scss" scoped>
  @import "TheHeader.scss";
</style>
