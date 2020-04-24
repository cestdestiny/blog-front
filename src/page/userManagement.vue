<template>
  <zTab type="border-card" position="left" :items="items">
    <div slot="tab1">

    </div>
  </zTab>
</template>

<script>
import zTab from '../components/tab'
export default {
  // todo 通用组件全局注册
  comments: {
    zTab
  },
  data () {
    return {
      items: [{
        id: '1',
        key: 'tab1',
        content: '个人资料'
      }, {
        id: '2',
        key: 'tab2',
        content: '我的收藏'
      }, {
        id: '3',
        key: 'tab3',
        content: '我关注的人'
      }, {
        id: '4',
        key: 'tab4',
        content: '我的粉丝'
      }]
    }
  },
  methods: {
    loadTabItems () {

    }
  }
}
</script>
<style>
</style>
