<template>
  <section class="info-page">
    <h1>{{info.title}}</h1>
    <hr />
    <br />
    <article class="content" v-html="info.content"></article>
    <BackTop :height="200" :bottom="50">
      <Icon type="md-arrow-round-up" />
    </BackTop>
  </section>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      id: null,
      info: {}
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.getInfo();
    }
  },
  methods: {
    getInfo() {
      try {
        this.$store.dispatch("news/getOne", { id: this.id }).then(res => {
          this.info = res.data;
        });
      } catch (error) {
        const { message, errorDetails } = err.response.data;
        this.$Message.error(message + errorDetails);
      }
    }
  }
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
}
</style>