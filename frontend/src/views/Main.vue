<template>
  <Layout>
    <Header></Header>
    <Content>
      <router-view />
    </Content>
    <Footer></Footer>
  </Layout>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Main",
  components: {
    Header,
    Footer,
    HelloWorld
  },
  data() {
    return {
      res: {}
    };
  },
  mounted() {

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
.ivu-layout {
  .ivu-layout-content {
    min-height: 90vh;
  }
}

h3 {
  font-size: 18px;
  text-align: left;
  line-height: 36px;
}
</style>
