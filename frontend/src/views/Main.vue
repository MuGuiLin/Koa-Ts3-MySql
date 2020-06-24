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

export default {
  name: "Main",
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.ivu-layout {
  .ivu-layout-content {
    min-height: 88vh;
  }
}
</style>
