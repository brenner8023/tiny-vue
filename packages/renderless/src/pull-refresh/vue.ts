/**
* Copyright (c) 2022 - present TinyVue Authors.
* Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
*
* Use of this source code is governed by an MIT-style license.
*
* THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
* BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
* A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
*
*/

import { mountedHandler, beforeUnmountHandler, handlerModelValue, onTouchstart, onTouchmove, onTouchend, initPullRefresh, clearPullRefresh } from './index'

export const api = ['state']

export const renderless = (props, { watch, onMounted, computed, reactive, onBeforeUnmount }, { t, refs }) => {
  const api = {}
  const state = reactive({
    pullUpReplaces: '',
    pullDownReplaces: '',
    refreshStyle: {},
    translate3d: 0,
    draggposition: 0,
    pullUpLoading: false,
    pullDownLoading: false,
    loosingText: computed(() => props.loosingText || t('ui.pullRefresh.loosing')),
    successText: computed(() => props.successText || t('ui.pullRefresh.success')),
    failedText: computed(() => props.failedText || t('ui.pullRefresh.failed')),
    noMoreText: computed(() => !props.hasMore ? t('ui.pullRefresh.noMore') : ''),
    pullUp: null,
    pullDown: null,
    successDuration: props.successDuration,
    animationDuration: props.animationDuration
  })

  Object.assign(api, {
    state,
    onTouchstart: onTouchstart(state),
    onTouchmove: onTouchmove({ props, state, refs }),
    onTouchend: onTouchend({ api, props, state }),
    mountedHandler: mountedHandler({ api, refs }),
    beforeUnmountHandler: beforeUnmountHandler({ api, refs }),
    handlerModelValue: handlerModelValue({ api, state }),
    initPullRefresh: initPullRefresh({ t, props, state }),
    clearPullRefresh: clearPullRefresh(state),
  })

  watch(
    () => props.hasMore,
    (value) => {
      if (!value) {
        state.pullUpLoading = false
        // 没有更多了
        api.clearPullRefresh()
      }
    },
  )

  onMounted(() => {
    api.mountedHandler({ api, refs, state })
    api.initPullRefresh({ t, props, state })
  })
  onBeforeUnmount(api.beforeUnmountHandler)

  return api
}
