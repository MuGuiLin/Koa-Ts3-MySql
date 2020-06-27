<template>
  <Layout>
    <Header>欢 迎 注 册</Header>
    <Content>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="username">
          <Input type="text" v-model="formInline.username" placeholder="账户">
            <Icon type="ios-person-add-outline" size="20" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-unlock-outline" size="20" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="rePassword">
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
        ],
        rePassword: [
          {
            required: true,
            message: "请填写确认密码!",
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
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            await this.$store
              .dispatch("user/register", this.formInline)
              .then(res => {
                this.$Message.success("注册成功!");
                if (200 == res.status && res.data.id) {
                  this.$router.push({ path: "/login" });
                }
              })
              // .catch(err => {
              //   console.error('catch', err)
              // });
          } catch (err) {
            console.error('err', err)
            const { message, errorDetails } = err.response.data;
            this.$Message.error(message + errorDetails);
          }
        } else {
          this.$Message.error("请正确填写注册信息!");
        }
      });
    },

    openLogin() {
      this.$router.push({ path: "/login" });
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
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .ivu-form {
      padding: 50px;
      width: 400px;
      background: rgba($color: #fff, $alpha: 0.5);
      border-radius: 4px;
      border: 1px solid white;
      .ivu-form-item {
        .ivu-icon {
          color: #2d8cf0;
          font-weight: bold;
        }
        .ivu-btn {
          margin: auto 20px;
        }
      }
      :last-child {
        margin: 0;
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
