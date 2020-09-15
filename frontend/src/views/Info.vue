<template>
  <section class="info-page">
    <h1>{{info.title}}</h1>
    <Icon type="ios-time" size="20"></Icon>
    <Time :time="info.createdAt" />
    <hr />
    <br />
    <Row>
      <Col span="4">
        <Tag type="border" color="primary">
          <Icon type="ios-eye" />
          阅读:{{info.readSum}}
        </Tag>
        <Tag color="success">
          <Icon type="md-thumbs-up" />
          点赞:{{info.likeSum}}
        </Tag>
      </Col>
      <Col span="20">
        <article class="content" v-html="info.content"></article>
      </Col>
    </Row>

    <BackTop :height="200" :bottom="50">
      <Icon type="md-arrow-round-up" />
    </BackTop>

    <h2>评论</h2>
    <Row>
      <Col span="24">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="评分：" prop="score">
            <Rate show-text allow-half v-model="formValidate.score">
              <span style="color: #f5a623">{{ formValidate.score}}星</span>
            </Rate>
          </FormItem>
          <FormItem label="昵称：" prop="name">
            <Input v-model="formValidate.name" placeholder="在这里输入你的昵称！"/>
          </FormItem>
          <FormItem label="内容：" prop="content">
            <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 3,maxRows: 20}" placeholder="在这里输入评论内容！"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交评论</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重新填写</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </section>
</template>

<script>
import { addComment } from "@/api";
export default {
  name: "Info",
  data() {
    return {
      id: null,
      info: {},
      formValidate: {
        score: 0,
        name: "",
        content: "",
      },
      ruleValidate: {
        score: [
          {
            required: true,
            message: "评分不能为0！",
          },
        ],
         name: [
          {
            required: true,
            message: "昵称不能为空！",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入评论内容！",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "评论内容不少于6字！",
            trigger: "blur",
          },
        ],
      },
    };
  },

  // 组件路由守卫 【进入路由时，组件实例还没渲染，this还不能用哦，要用next((vc)=>{})回调函数传回来的 vc === VueComponent】
  beforeRouteEnter(to, from, next) {
    next((vc) => {
      console.log(vc); // 这里的vc就相当于this
      vc.id = vc.$route.params.id;
      if (vc.id) {
        vc.getInfo(); // 在导航前获取数据
      }
    });
  },

  // 组件路由守卫 【变化路由时，组件实例已渲染，this可用】
  beforeRouteUpdate(to, from, next) {
    console.log("路由发生变化了！");
    next();
  },

  // 组件路由守卫 【离开路由时，组件实例已渲染，this可用】
  beforeRouteLeave(to, from, next) {
    console.log(to.fullPath);
    next();
  },

  watch: {
    // 进入路由后，监听路由变化并执行逻辑
    // $route: {
    //   immediate: true, //中首次绑定的时候，是否执行handler
    //   handler: (newVal, oldVal) => {
    //     this.id = this.$route.params.id;
    //     if (this.id) {
    //       this.getInfo();
    //     }
    //   }
    // }
  },
  mounted() {
    // this.id = this.$route.params.id;
    // if (this.id) {
    //   this.getInfo();
    // }
  },
  methods: {
    getInfo() {
      try {
        this.$store.dispatch("news/getOne", { id: this.id }).then((res) => {
          this.info = res.data;
        });
      } catch (error) {
        const { message, errorDetails } = error.response.data;
        this.$Message.error(message + errorDetails);
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            try {
              this.formValidate.newsId= parseInt(this.id);
              addComment(this.formValidate).then((res) => {
                console.log(res);
              })
            } catch (error) {
              const { message, errorDetails } = error.response.data;
              this.$Message.error(message + errorDetails);
            }
          } else {
            this.$Message.error('Fail!');
          }
      });
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  },
};
</script>

<style lang="scss" scoped>
.info-page {
  margin: auto;
  padding: 50px;
  max-width: 1000px;
  background: white;
  box-shadow: 1px 5px 20px 0 rgba(0, 0, 0, 0.1);
  h1 {
    line-height: 100px;
  }
  article.content {
    width: 100%;
    text-align: justify;
    overflow: hidden;
    img {
      max-width: 100% !important;
    }
    iframe {
      width: 100%;
      min-height: 600px;
    }
  }
  .ivu-back-top.ivu-back-top-show {
    background: #2d8cf0;
    border-radius: 4px;
    box-shadow: 0px 0px 20px 0 white;
  }
  h2 {
    text-align: left;
  }
}
</style>