<template>
  <div>
    <tiny-button @click="click">setAllRowExpansion</tiny-button>
    <tiny-grid :data="tableData" ref="grid" border :edit-config="{ trigger: 'click', mode: 'cell', showStatus: true }">
      <tiny-grid-column type="index" width="60"></tiny-grid-column>
      <tiny-grid-column type="selection" width="60"></tiny-grid-column>
      <tiny-grid-column type="expand" title="操作" width="60">
        <template #default>
          <tiny-grid :data="tableData">
            <tiny-grid-column field="name" title="名称" sortable></tiny-grid-column>
            <tiny-grid-column field="createdDate" title="创建日期" sortable></tiny-grid-column>
            <tiny-grid-column field="city" title="城市" sortable></tiny-grid-column>
          </tiny-grid>
        </template>
      </tiny-grid-column>
      <tiny-grid-column field="employees" title="员工数"></tiny-grid-column>
      <tiny-grid-column field="createdDate" :editor="{ component: 'input', autoselect: true }" title="创建日期"></tiny-grid-column>
      <tiny-grid-column field="city" :editor="{ component: 'input', autoselect: true }" title="城市"></tiny-grid-column>
      <tiny-grid-column field="boole" title="布尔值" align="center" format-text="boole" :editor="checkboxEdit"></tiny-grid-column>
    </tiny-grid>
  </div>
</template>

<script lang="jsx">
import { Grid, GridColumn, Button } from '@opentiny/vue'

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyButton: Button
  },
  data() {
    const tableData = [
      {
        id: '1',
        name: 'GFD科技YX公司',
        city: '福州',
        employees: 800,
        createdDate: '2014-04-30 00:56:00',
        boole: false
      },
      {
        id: '2',
        name: 'WWW科技YX公司',
        city: '深圳',
        employees: 300,
        createdDate: '2016-07-08 12:36:22',
        boole: true
      },
      {
        id: '3',
        name: 'RFV有限责任公司',
        city: '中山',
        employees: 1300,
        createdDate: '2014-02-14 14:14:14',
        boole: false
      },
      {
        id: '4',
        name: 'TGB科技YX公司',
        city: '龙岩',
        employees: 360,
        createdDate: '2013-01-13 13:13:13',
        boole: true
      },
      {
        id: '5',
        name: 'YHN科技YX公司',
        city: '韶关',
        employees: 810,
        createdDate: '2012-12-12 12:12:12',
        boole: true
      }
    ]
    return {
      tableData
    }
  },
  methods: {
    click() {
      this.$refs.grid.setAllRowExpansion(true)
    },
    checkboxEdit(h, { row, column }) {
      return (
        <input
          type="checkbox"
          checked={row.boole}
          onChange={(event) => {
            row[column.property] = event.target.checked
          }}
        />
      )
    }
  }
}
</script>
