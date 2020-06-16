<template>
  <Layout>
    <Header>欢 迎 注 册</Header>
    <Content>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.username" placeholder="账户名">
            <Icon type="ios-person-outline" size="20" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" size="20" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.rePassword" placeholder="确认密码">
            <Icon type="ios-lock-outline" size="20" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="logo-windows" @click="handleSubmit('formInline')">注 册</Button>
          <Button type="success" icon="md-exit" @click="openLogin()">登 录</Button>
        </FormItem>
      </Form>
    </Content>
    <Footer>
      MuGuiLin 2020
      <Icon type="logo-github" />
      <Icon type="logo-html5" />
      <Icon type="logo-twitter" />
    </Footer>
  </Layout>
</template>

<script>
export default {
  name: "Regist",
  components: {},
  data() {
    return {
      formInline: {
        username: "",
        password: "",
        rePassword: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请填写用户名称!",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写用户密码!",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能少于6位!",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
        if (valid) {
          this.$Message.success("登录成功!");
        } else {
          this.$Message.error("登录失败!");
        }
      });
    },
    openLogin() {
      this.$router.push({ path: "/login", query: { id: 666 } });
    }
  }
};
</script>

<style lang="scss" scoped>
.ivu-layout {
  background: linear-gradient(115deg, #56d8e4 5%, #9f01ea 95%);

  .ivu-layout-header {
    font-size: 24px;
    color: white;
  }
  .ivu-layout-content {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .ivu-form {
      padding: 50px;
      width: 500px;
      background: rgba($color: #fff, $alpha: 0.5);
      border-radius: 4px;
      border: 1px solid white;
      .ivu-btn {
        margin: auto 20px;
      }
    }
  }
  .ivu-layout-footer {
    border-top: 2px solid #19be6b;
    font-size: 18px;
    color: #9f01ea;
    i {
      margin: auto 10px;
    }
  }
}
</style>
