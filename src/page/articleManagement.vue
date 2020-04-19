<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span=3><p>文章管理</p></el-col>
        <el-col :span=12>
          <el-input v-model="article.title" placeholder="输入文章标题"></el-input>
        </el-col>
        <el-col :span=3>
          <el-button>保存草稿</el-button>
        </el-col>
        <el-col :span=3>
          <el-button>发布文章</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main id="mavonEditor">
      <mavon-editor v-model="article.content"></mavon-editor>
    </el-main>
  </el-container>
  <dialog title="发布文章" ref="">
    <div class="dialog-content">
      <el-form ref="publishArticle" :model="article" label-width="80">
        <el-form-item label="文章标签">
          <el-input v-model="article.systemClass"></el-input>
        </el-form-item>
        <el-form-item label="分类专栏">
          <el-tag
            :key="tag"
            v-for="tag in userClassTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">新建分类专栏</el-button>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="article.type" placeholder="请选择">
            <el-option v-for="item in types"
                       :key="item.id"
                       :value="item.category">
            </el-option>

          </el-select>
        </el-form-item>

      </el-form>
    </div>
    <div slot="footer">

    </div>
  </dialog>
</template>
<script>
  import dialog from '../components/dialog'

  export default {
    name: 'articleManagement',
    components: {
      dialog
    },
    data() {
      return {
        article: {
          content: '',
          title: '',
          systemClass: '',  // 文章标签
          userClass: '', // 分类专栏
          type: '', // 文章类型
          publishType: '' // 发布形式
        },
        userClassTags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      handleClose(tag) {
        this.userClassTags.splice(this.userClassTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.userClassTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      loadArticleType() {

      }
    }
  }

</script>
<style scoped>
  .el-row {
    margin-bottom: 10px;
  }

  p {
    margin-top: 4px;
  }
</style>
