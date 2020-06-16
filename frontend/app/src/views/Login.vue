<template>
  <Layout>
    <Header>欢 迎 登 录</Header>
    <Content>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.username" placeholder="账户">
            <Icon type="ios-person-outline" size="20" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" size="20" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="logo-windows" @click="handleSubmit('formInline')">登 录</Button>
          <Button type="success" icon="md-exit" @click="openRegist()">注 册</Button>
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
import axios from "axios";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      formInline: {
        username: "",
        password: ""
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
      // this.$refs[name].validate(valid => {
      // console.log(valid);
      // if (valid) {
      axios({
        method: "POST",
        url: "/Api/user/login",
        data: {
          username: this.formInline.username,
          password: this.formInline.password
        }
      })
        .then(response => {
          console.log(response);
          this.$Message.success("登录成功!");
        })
        .catch(error => {
          console.log(error);
          this.$Message.error("登录失败!");
        });

      // } else {
      //   this.$Message.error("登录失败!");
      // }
      // });
    },
    openRegist() {
      this.$router.push({ path: "/regist", query: { id: 666 } });
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
