<template>
  <div class="demo-input">
    <tiny-input placeholder="请输入内容" v-model="input">
      <template #suffix>
        <icon-calendar class="tiny-svg-size" />
      </template>
    </tiny-input>
  </div>
</template>

<script lang="jsx">
import { Input } from '@opentiny/vue'
import { IconCalendar } from '@opentiny/vue-icon'

export default {
  components: {
    IconCalendar: IconCalendar(),
    TinyInput: Input
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style scoped>
.demo-input .tiny-input {
  width: 250px;
}
</style>
