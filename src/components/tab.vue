<template>
  <div class="zTab">
    <el-tabs :tab-position="position" :type="type">
      <el-tab-pane v-for="item in items" :key="item.id" :label="item.content">
        <slot name="item.key"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
    position: String,
    type: String
  },
  data () {
    return {
      // items: []
    }
  }
}
</script>
