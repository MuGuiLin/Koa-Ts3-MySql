<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <h3>{{res}}</h3>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      res: {}
    };
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
h3{
  font-size: 18px;
  text-align: left;
  line-height: 36px;
}
</style>
