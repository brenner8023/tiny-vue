<template>
  <tiny-pull-refresh :pullDown="pullDownRefresh" :animation-duration="1000">
    <h3>hello pull-refresh</h3>
  </tiny-pull-refresh>
</template>

<script lang="jsx">
import { PullRefresh } from '@opentiny/vue'

export default {
  components: {
    TinyPullRefresh: PullRefresh
  },
  data() {
    return {
      pullDownRefresh: {
        handler: () => this.handlerPullDownRefresh()
      }
    }
  },
  methods: {
    handlerPullDownRefresh() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    }
  }
}
</script>
