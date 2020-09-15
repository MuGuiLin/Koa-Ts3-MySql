<template>
  <div class="about">
    <h1>This is an about page</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h2>{{res}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "News",
  components: {
    HelloWorld
  },
  data() {
    return {
      res: {}
    };
  },
  // 注：只有设置了<keep-alive></keep-alive> 才有效
  activated() {
    console.log("keep-alive 进入视图钩子，1、activated");
  },
  // 注：只有设置了<keep-alive></keep-alive> 才有效
  deactivated() {
    console.log("keep-alive 离开视图钩子，2、deactivated");
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      await this.$store.dispatch("user/userinfo", { id: 3 }).then(res => {
        console.log(res);
        this.res = JSON.stringify(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: left;
}
</style>
