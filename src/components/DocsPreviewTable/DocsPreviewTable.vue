<template>
  <div class="docs-preview-table">
    <div class="docs-preview-table__title">{{ title }}</div>
    <div class="docs-preview-table__note" v-if="note">
      Подписанные документы просьба отправлять на следующие адреса:
      <a href="mailto:LP@moneytime.ventures">LP@moneytime.ventures</a>,
      <a href="mailto:investorservicesiom@ocorian.com">investorservicesiom@ocorian.com</a>
    </div>
    <div class="docs-preview-table__list">
      <div class="docs-preview-table__row" v-for="(item, index) in list" :key="index">
        <div class="docs-preview-table__link">
          <DownloadFile />
        </div>
        <v-clamp class="docs-preview-table__text" autoresize :max-lines="1">
          {{ item.description }}
          <template #after="{ toggle, expanded, clamped }">
            <button
                v-if="expanded || clamped"
                class="toggle-clamp"
                @click="toggle"
            >
              <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM12 2C12 3.10457 11.1046 4 10 4C8.89543 4 8 3.10457 8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2ZM18 4C19.1046 4 20 3.10457 20 2C20 0.895431 19.1046 0 18 0C16.8954 0 16 0.895431 16 2C16 3.10457 16.8954 4 18 4Z"
                      fill="currentColor" />
              </svg>
            </button>
          </template>
        </v-clamp>
        <div class="docs-preview-table__date">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import DownloadFile from '@/components/DownloadFile/DownloadFile';
  import VClamp from 'vue-clamp'

  export default {
    name: 'DocsPreviewTable',
    components: {
      DownloadFile,
      VClamp,
    },
    props: {
      title: {
        type: String,
      },
      note: {
        type: Boolean,
      },
      list: {
        type: Array,
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "DocsPreviewTable";
</style>
