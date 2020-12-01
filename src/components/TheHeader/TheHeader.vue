<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header__inner">
          <div class="header__left">
            <div class="header__langs">
              <mq-layout mq="tablet+">
                <LocaleSwitcher />
              </mq-layout>
            </div>
            <mq-layout mq="laptop+">
              <div class="header__id">ID 2345098-781-23</div>
            </mq-layout>
          </div>
          <div class="header__center">
            <Logo />
          </div>
          <div class="header__right">
            <mq-layout mq="laptop+">
              <div class="header__fund">
                {{ $t('fund') }}
                <span>FRV LATE STAGE FUND</span>
              </div>
            </mq-layout>
            <mq-layout :mq="['lg', 'md', 'tablet', 'mobile']">
              <burger></burger>
            </mq-layout>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import Burger from '@/components/Burger/Burger';
  import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
  import Logo from '@/components/Logo/Logo';

  export default {
    name: 'TheHeader',
    components: {
      Burger,
      LocaleSwitcher,
      Logo,
    },
  }
</script>

<style lang="scss" scoped>
  @import "TheHeader.scss";
</style>
