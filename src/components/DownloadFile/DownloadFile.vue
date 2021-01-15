<template>
  <component
      class="download-file"
      :is="url ? 'a' : 'span'"
      :href="url ? url : false"
      :target="url ? '_blank' : false"
      @click="onClick"
  >
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M16.0015 15C16.0015 15.5523 15.5537 16 15.0015 16L1.00146 16C0.44918 16 0.00146485 15.5523 0.00146486 15C0.00146486 14.4477 0.44918 14 1.00146 14L6.51452 14L1.82836 9.74006C1.41969 9.36856 1.38956 8.73611 1.76105 8.32744C2.13255 7.91878 2.765 7.88865 3.17367 8.26014L7.00102 11.7394L7.00102 -2.01468e-06L9.00102 -1.99083e-06L9.00102 11.7397L12.8283 8.26018C13.237 7.88866 13.8694 7.91876 14.2409 8.32741C14.6125 8.73606 14.5824 9.36851 14.1737 9.74002L9.48796 14L15.0015 14C15.5537 14 16.0015 14.4477 16.0015 15Z"
            fill="#24DBAF" />
    </svg>
    <span>{{ fileType.toLocaleUpperCase() }}</span>
  </component>
</template>

<script>
  import httpClient from '@/utils/httpClient';

  export default {
    name: 'DownloadFile',
    props: {
      fileType: {
        type: String,
        default: 'XLS'
      },
      url: {
        type: String,
        default: ''
      },
      downloadLink: {
        type: String,
        default: ''
      },
      downloadable: {
        type: Boolean,
        default: false
      },
      forecast: {
        type: String,
        default: ''
      },
      dateFrom: {
        type: String,
        default: ''
      },
      dateTo: {
        type: String,
        default: ''
      },
    },
    methods: {
      onClick(e) {
        if (this.downloadable) {
          e.preventDefault();
          const investor = document.querySelector('.investor').value;

          if (this.forecast) {
            httpClient
              .get(this.downloadLink, {
                params: {
                  investor,
                  quarters: this.forecast,
                },
              })
              .then((response) => {
                if (!response) return;
                this.downloadURL(response);
              });
          } else {
            httpClient
              .get(this.downloadLink, {
                params: {
                  investor,
                  date_from: this.dateFrom,
                  date_to: this.dateTo,
                },
              })
              .then((response) => {
                if (!response) return;
                this.downloadURL(response);
              });
          }
        }
      },
      downloadURL(url) {
        const save = document.createElement('a');
        // const newUrl = window.URL.createObjectURL(new Blob([url]));
        const filename = url.substring(url.lastIndexOf('/') + 1);
        save.href = url;
        save.style.display = 'none';
        save.target = '_blank';
        save.download = filename;
        save.setAttribute('download', filename);
        console.log('url: ' + url, 'filename: ' + filename);
        document.body.appendChild(save);
        save.click();
        setTimeout(() => {
          save.parentNode.removeChild(save);
        }, 5000);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "DownloadFile";
</style>
