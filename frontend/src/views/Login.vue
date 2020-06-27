<template>
  <Layout>
    <Header>欢 迎 登 录</Header>
    <Content>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="username">
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
// import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
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
          }
          // {
          //   type: "string",
          //   min: 6,
          //   message: "密码长度不能少于6位!",
          //   trigger: "blur"
          // }
        ]
      }
    };
  },
  computed: {
    // 映射 store里面 state 中的变量
    // ...mapState('user', ['userinfo']) 只要1个时
    ...mapState('user', ['userinfo', 'logout'])  // 多个时

    // 通过 mapState, mapMutations, mapActions 的映射，可以减少直接对this.$store.xxx的访问
  },
  mounted() {

    console.log('------', this.$store.state.user.userinfo, this.$store.state.user.logout);

    // 这是对上面代码的简化：用mapState映射后，就可以更方便的获取store中的状态了
    console.log('------',this.userinfo, this.logout);
  },
  methods: {
    // 映射 store里面 actions 中的方法
    ...mapActions(['user/login', 'user/userinfo']),

    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          // axios({
          //   method: "POST",
          //   url: "/user/login",
          //   data: this.formInline
          // })
          //   .then(res => {
          //     this.$Message.success("登录成功!");
          //     this.$router.push({ path: "/" });
          //   })
          //   .catch(err => {
          //     const { message, errorDetails } = err.response.data;
          //     this.$Message.error(message + errorDetails);
          //   });
          try {
            // await this.$store.dispatch("user/login", this.formInline)

            await this['user/login'](this.formInline) // 用mapActions() 来做映射，就可以简化 this.$store.dispatch("user/login", this.formInline)
              .then(res => {
                this.$Message.success("登录成功!");
                // this.$router.push({ name: "Home" });
                this.getUserInfo();
                this.$router.push({ path: "/" });
              });
          } catch (err) {
            const { message, errorDetails } = err.response.data;
            this.$Message.error(message + errorDetails);
          }
        } else {
          this.$Message.error("请正确填写登录信息!");
        }
      });
    },
    async getUserInfo() {
      try {
        // await this.$store.dispatch("user/userinfo", { id: 3 }).then(res => {
        await this['user/userinfo']({id: 2}).then(res => {
          console.log(res);
        });
      } catch (err) {
        console.error(err);
      };
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
