<template>
  <section class="home">
    <Row>
      <Col span="6">
        <Card style="width:320px">
          <div style="text-align:center">
            <img src="https://inews.gtimg.com/newsapp_ls/0/11964458854_294195/0" />
            <h3>A high quality UI Toolkit based on Vue.js</h3>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card style="width:320px">
          <div style="text-align:center">
            <img src="https://inews.gtimg.com/newsapp_ls/0/11964458854_294195/0" />
            <h3>A high quality UI Toolkit based on Vue.js</h3>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card style="width:320px">
          <div style="text-align:center">
            <img src="https://inews.gtimg.com/newsapp_ls/0/11964458854_294195/0" />
            <h3>A high quality UI Toolkit based on Vue.js</h3>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card style="width:320px">
          <div style="text-align:center">
            <img src="https://inews.gtimg.com/newsapp_ls/0/11964458854_294195/0" />
            <h3>A high quality UI Toolkit based on Vue.js</h3>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card style="width:320px">
          <div style="text-align:center">
            <img src="https://inews.gtimg.com/newsapp_ls/0/11964458854_294195/0" />
            <h3>A high quality UI Toolkit based on Vue.js</h3>
          </div>
        </Card>
      </Col>
    </Row>
  </section>
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
</style>
