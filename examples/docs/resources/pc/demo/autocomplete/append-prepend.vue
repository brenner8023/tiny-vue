<template>
  <div class="demo-autocomplete">
    <tiny-autocomplete v-model="value" placeholder="请输入内容" :fetch-suggestions="querySearch">
      <template #prepend>前置内容</template>
      <template #append>后置内容</template>
    </tiny-autocomplete>
  </div>
</template>

<script lang="jsx">
import { Autocomplete } from '@opentiny/vue'

export default {
  components: {
    TinyAutocomplete: Autocomplete
  },
  data() {
    return {
      restaurants: [],
      value: ''
    }
  },
  methods: {
    querySearch(queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants

      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    },
    loadAll() {
      return [
        {
          value: 'GFD科技YX公司',
          address: '福州'
        },
        {
          value: 'WWWW科技YX公司',
          address: '深圳福田区'
        },
        {
          value: 'RFV有限责任公司',
          address: '中山市'
        },
        {
          value: 'TGBYX公司',
          address: '梅州'
        },
        {
          value: 'YHN科技YX公司',
          address: '韶关'
        },
        {
          value: '康康物业YX公司',
          address: '广州天河区'
        }
      ]
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>

<style scoped>
.demo-autocomplete .tiny-autocomplete {
  width: 270px;
}
</style>
