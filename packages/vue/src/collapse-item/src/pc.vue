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
  <div class="tiny-collapse-item" :class="{ 'is-active': state.isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="state.isActive"
      :aria-controls="`tiny-collapse-content-${state.id}`"
      :aria-describedby="`tiny-collapse-content-${state.id}`"
    >
      <div
        class="tiny-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`tiny-collapse-head-${state.id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          focusing: state.focusing,
          'is-active': state.isActive
        }"
        @focus="handleFocus"
        @blur="state.focusing = false"
      >
        <slot name="icon">
          <icon-chevron-right class="tiny-collapse-item__arrow tiny-svg-size" :class="{ 'is-active': state.isActive }" />
        </slot>
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <collapse-transition>
      <div
        v-show="state.isActive"
        class="tiny-collapse-item__wrap"
        role="tabpanel"
        :aria-hidden="!state.isActive"
        :aria-labelledby="`tiny-collapse-head-${state.id}`"
        :id="`tiny-collapse-content-${state.id}`"
      >
        <div class="tiny-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script lang="tsx">
import { renderless, api } from '@opentiny/vue-renderless/collapse-item/vue'
import { props, setup, defineComponent } from '@opentiny/vue-common'
import CollapseTransition from '@opentiny/vue-collapse-transition'
import { iconChevronRight } from '@opentiny/vue-icon'

export default defineComponent({
  props: [...props, 'title', 'name', 'disabled'],
  components: {
    CollapseTransition,
    IconChevronRight: iconChevronRight()
  },
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
