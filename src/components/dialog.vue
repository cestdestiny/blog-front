<template>
  <div class="zDialog">
    <el-dialog :title="title"
               :size="size"
               :top="top"
               :visible.sync="dialogVisible" @open="openDialog" @close="closeDialog">
      <slot name="content"></slot>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    size: String,
    top: String
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    openDialog () {
      this.$nextTick(() => {
        document.getElementsByClassName('el-dialog_body')[0].scollTop = 0
      })
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}

</script>
