<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span=2 class="el-col-router"><router-link to="/article">文章管理</router-link></el-col>
        <el-col :span=13>
          <el-input v-model="article.title" placeholder="输入文章标题"></el-input>
        </el-col>
        <el-col :span=2>
          <el-button @click="submit">保存草稿</el-button>
        </el-col>
        <el-col :span=4>
          <el-button @click="publish">发布文章</el-button>
        </el-col>
        <el-col :span=3>
          <el-dropdown @command="handleCommand">
            <el-avatar class="el-dropdown-link" :size="40" :src="url" @error="errorHandler" @click="toArticle">
            </el-avatar>
            <el-dropdown-menu slot="dropdown" class="article-md-menu" placement="bottom-start">
              <el-dropdown-item command="">黄金糕</el-dropdown-item>
              <el-dropdown-item command="">狮子头</el-dropdown-item>
              <el-dropdown-item command="">螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-main id="mavonEditor">
      <mavon-editor v-model="article.content" @save="submit" style="min-height: 490px"></mavon-editor>
    </el-main>
    <div>
      <zDialog title="发布文章" ref="publishArticle">
        <div slot="content">
          <el-form ref="articleForm" :model="article">
            <el-form-item label="文章标签">
              <el-input v-model="article.systemClass" style="width: 50%"></el-input>
            </el-form-item>
            <el-form-item label="分类专栏">
              <el-tag
                :key="tag"
                v-for="tag in article.userClass"
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
                style="width: 50px"
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
                           :value="item.category"
                           :label="item.category">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布形式">
              <el-radio-group v-model="article.publishType">
                <el-radio label="公开"></el-radio>
                <el-radio label="私密"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
            <el-button type="primary" @click="submit()">发布文章</el-button>
        </div>
      </zDialog>
    </div>
  </el-container>
</template>
<script>
import zDialog from '../components/dialog'
import http from '../util/http'
import router from '../router'

export default {
  name: 'articleManagement',
  components: {
    zDialog
  },
  data () {
    return {
      article: {
        content: '',
        title: '',
        systemClass: '', // 文章标签
        userClass: [], // 分类专栏
        type: '', // 文章类型
        publishType: '' // 发布形式
      },
      types: '',
      inputVisible: false,
      inputValue: '',
      url: ''
    }
  },
  mounted () {
    this.loadArticleType()
  },
  methods: {
    loadArticleType () {
      // http.request('/article/type', 'GET', null, (response) => {
      //   this.$data.types = response.data
      // })
    },
    handleClose (tag) {
      this.article.userClass.splice(this.article.userClass.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      if (this.inputValue) {
        this.article.userClass.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submit () {
      http.request('/article/save', 'POST', null, (response) => {
        console.log('保存成功')
      })
    },
    publish () {
      this.$refs.publishArticle.dialogVisible = true
    },
    errorHandler () {
      this.url = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    mdMenu () {
    },
    toArticle () {
      router.push({ path: '/home' })
    },
    handleCommand (command) {
    }
  }
}

</script>
<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
  a {
    text-decoration: none;
    font-size: 20px;
    color: #555555;
  }
  .el-col-router {
    padding-top: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    position: relative;
    left: 20px
  }
  .el-dropdown {
    width: 80px;
  }
</style>
