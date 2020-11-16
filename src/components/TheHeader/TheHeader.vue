<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header__inner">
          <div class="header__left">
            <div class="fund-id">
              ID 2345098-781-23
            </div>
          </div>
          <div class="header__center">
            <Logo />
          </div>
          <div class="header__right">FUND</div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import Logo from '@/components/Logo/Logo';

  export default {
    name: 'TheHeader',
    components: {
      Logo,
    },
  }
</script>

<style lang="scss" scoped>
  @import "TheHeader.scss";
</style>
