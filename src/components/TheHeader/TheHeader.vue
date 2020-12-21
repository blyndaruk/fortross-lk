<template>
  <div>
    <header class="header" :class="{ 'is-burger-active': this.isBurgerActive }">
      <div class="container">
        <div class="header__inner">
          <div class="header__left">
            <div class="header__langs">
              <mq-layout mq="tablet+">
                <LocaleSwitcher />
              </mq-layout>
            </div>
            <mq-layout mq="laptop+">
              <div class="header__id">ID {{investorID}}</div>
            </mq-layout>
          </div>
          <div class="header__center">
            <Logo />
          </div>
          <div class="header__right">
            <mq-layout mq="laptop+">
              <div class="header__fund">
                {{ $t('fund') }}
                <span>SBT Fund 2</span>
              </div>
            </mq-layout>
            <mq-layout :mq="['lg', 'md', 'tablet', 'mobile']">
              <Burger @burger-toggle="onBurgerToggle"></Burger>
            </mq-layout>
          </div>
        </div>

        <mq-layout :mq="['lg', 'md', 'tablet']">
          <div class="header__sub-row">
            <div class="header__id">ID {{investorID}}</div>
            <div class="header__fund">
              {{ $t('fund') }}
              <span>SBT Fund 2</span>
            </div>
          </div>
        </mq-layout>

        <mq-layout :mq="['mobile']">
          <div class="header__mob">
            <div class="header__mob-top">
              <div class="header__id">ID {{investorID}}</div>
              <div class="header__fund">
                {{ $t('fund') }}
                <span>SBT Fund 2</span>
              </div>
            </div>
            <div class="header__mob-nav">
              <Nav />
            </div>
          </div>
        </mq-layout>

      </div>
    </header>
  </div>
</template>

<script>
  import Burger from '@/components/Burger/Burger';
  import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
  import Logo from '@/components/Logo/Logo';
  import Nav from '@/components/Nav/Nav';

  export default {
    name: 'TheHeader',
    components: {
      Nav,
      Burger,
      LocaleSwitcher,
      Logo,
    },
    data() {
      return {
       isBurgerActive: false,
      }
    },
    methods: {
      onBurgerToggle(burger) {
        this.isBurgerActive = burger;
      },
    },
    computed: {
      investorID() {
        return document.querySelector('.investor').value;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "TheHeader.scss";
</style>
