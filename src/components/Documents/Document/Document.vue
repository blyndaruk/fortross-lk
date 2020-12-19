<template>
  <div class="document">
    <div class="document__inner">
      <div class="document__date">{{ document.file_date_small || document.date }}</div>
      <v-clamp class="document__content" autoresize :max-lines="maxLines">
        {{ document.file_name || document.text }}
        <template #after="{ toggle, expanded, clamped }">
          <button
              v-if="expanded || clamped"
              class="document__toggle"
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
    </div>

    <div class="document__download">
      <DownloadFile :fileType="document.file_type" />
    </div>
  </div>
</template>

<script>
  import DownloadFile from '@/components/DownloadFile/DownloadFile';
  import VClamp from 'vue-clamp'

  export default {
    name: 'Document',
    components: {
      DownloadFile,
      VClamp,
    },
    props: {
      document: {
        type: Object,
      },
    },
    computed: {
      maxLines() {
        return this.$mq === 'tablet' || this.$mq === 'mobile' ? 4 : 6;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "Document";
</style>
