<!--
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 -->
<template>
  <span :class="state.wrapClasses" :disabled="true" tabindex="0" @click="toggle" @keydown.space="toggle"> </span>
</template>

<script lang="tsx">
import { renderless, api } from '@opentiny/vue-renderless/switch/vue'
import { props, setup, defineComponent } from '@opentiny/vue-common'
import '@opentiny/vue-theme-mobile/switch/index.less'

export default defineComponent({
  props: [...props, 'modelValue', 'trueValue', 'falseValue', 'disabled'],
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
