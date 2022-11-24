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
import throttle from '@opentiny/vue-renderless/common/deps/throttle'
import { hasClass } from '@opentiny/vue-renderless/common/deps/dom'
import { getRowNodes, getCellNodeIndex, getEventTargetNode } from '@opentiny/vue-renderless/grid/utils'

export function onCellMousedownGridEl(args) {
  let { _vm, bodyList, cell, cellFirstElementChild, cellLastElementChild, flag, headStart, headerList, isIndex, startCellNode, targetElem } = args
  if (flag) {
    if (isIndex) {
      let firstCell = targetElem.parentNode.firstElementChild
      _vm.handleChecked(getRowNodes(bodyList, getCellNodeIndex(firstCell.nextElementSibling), getCellNodeIndex(cellLastElementChild)))
      _vm.handleIndexChecked(getRowNodes(bodyList, getCellNodeIndex(firstCell), getCellNodeIndex(cell)))
    } else if (!hasClass(targetElem, 'col__index')) {
      let firstCell = targetElem.parentNode.firstElementChild
      let colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem)
      let head = headerList[0].children[colIndex]
      _vm.handleHeaderChecked(getRowNodes(headerList, getCellNodeIndex(head), getCellNodeIndex(headStart)))
      _vm.handleIndexChecked(getRowNodes(bodyList, getCellNodeIndex(firstCell), getCellNodeIndex(cellFirstElementChild)))
      _vm.handleChecked(getRowNodes(bodyList, startCellNode, getCellNodeIndex(targetElem)))
    }
  }
}

export function handleCellMousedownEvent(args1) {
  let { $el, _vm, bodyList, cell, cellFirstElementChild } = args1
  let { cellLastElementChild, headStart, headerList, isIndex, startCellNode } = args1

  let oldMousemove = document.onmousemove
  let oldMouseup = document.onmouseup

  let updateEvent = (event) => {
    event.preventDefault()

    let { flag, targetElem } = getEventTargetNode(event, $el, 'tiny-grid-body__column')
    let args = {
      _vm,
      bodyList,
      cell,
      cellFirstElementChild,
      cellLastElementChild,
      flag
    }

    Object.assign(args, {
      headStart,
      headerList,
      isIndex,
      startCellNode,
      targetElem
    })

    onCellMousedownGridEl(args)
  }

  let updateEventThrot = throttle(80, false, updateEvent, true)

  document.onmousemove = updateEventThrot
  document.onmouseup = function () {
    document.onmousemove = oldMousemove
    document.onmouseup = oldMouseup
  }
}

export function onCellMousedownSelectEditable(args) {
  let { _vm, actived, cell, checked, column, editConfig } = args
  let { event, isLeftBtn, mouseConfig, params, row } = args
  // 除了双击其他都没有选中状态, 如果不在所有选中的范围之内则重新选中
  if (
    editConfig &&
    (actived.row !== row || !(editConfig.mode === 'cell' && actived.column === column)) &&
    !(isLeftBtn && mouseConfig.checked) &&
    mouseConfig.selected &&
    editConfig.trigger === 'dblclick' &&
    (!checked.rowNodes || !checked.rowNodes.some((list) => ~list.indexOf(cell)))
  ) {
    _vm.handleSelected(params, event)
  }
}

export function onCellMousedownSelect({ _vm, editConfig, event, mouseConfig, params }) {
  if (!editConfig && mouseConfig.selected) {
    _vm.handleSelected(params, event)
  }
}

export function onCellMousedownIndexColumn(args) {
  let { _vm, bodyList, cell, cellLastElementChild, event } = args
  let { headerList, isIndex, params, visibleColumn } = args

  if (isIndex) {
    let firstCell = cell.parentNode.firstElementChild

    params.columnIndex++
    params.column = visibleColumn[params.columnIndex]
    params.cell = cell.nextElementSibling

    _vm.handleSelected(params, event)
    _vm.handleChecked(getRowNodes(bodyList, getCellNodeIndex(firstCell.nextElementSibling), getCellNodeIndex(cellLastElementChild)))
    _vm.handleHeaderChecked([headerList[0].querySelectorAll('.tiny-grid-header__column:not(.col__index)')])
    _vm.handleIndexChecked(getRowNodes(bodyList, getCellNodeIndex(firstCell), getCellNodeIndex(cell)))
  }
}

export function onCellMousedownNotIndexColumn({ _vm, cell, column, event, headerList, isIndex, params }) {
  if (!isIndex) {
    let firstCell = cell.parentNode.firstElementChild

    _vm.handleSelected(params, event)
    _vm.handleHeaderChecked([[headerList[0].querySelector(`.${column.id}`)]])
    _vm.handleIndexChecked([[firstCell]])
  }
}
