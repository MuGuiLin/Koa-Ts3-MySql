<template>
  <section class="news-page">
    <Row>
      <Col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" :xxl="4" v-for="(o) in list" :key="o.id">
        <!-- <Card>
          <router-link :to="{ name: 'Info', params: {id: o.id}}">
            <img :src="compSrc(o.cover)" />
            <h3>{{o.title}}</h3>
            <time>
              <Icon type="ios-time" size="20"></Icon>
              {{o.createdAt | dateFormat}}
            </time>
          </router-link>
        </Card>-->
        <CardList :oData="o" @dragStart="dragStart" @dragMove="dragMove" @dragEnd="dragEnd"></CardList>
      </Col>
    </Row>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import dateFormat from "@/filters/dateTime";
import CardList from "@/components/CardList";

export default {
  name: "News",

  components: {
    CardList
  },

  data() {
    return {};
  },

  filters: {
    dateFormat
  },

  computed: {
    ...mapState("news", {
      list: state => state.newsArr
    })
  },
  mounted() {
    if (!this.list) {
      this.$store.dispatch("news/getAll");
    }
  },
  methods: {
    compSrc(src) {
      return "http" == src.slice(0, 4)
        ? src
        : this.$store.state.server.staticHost + src;
    },
    dragStart(e) {},
    dragMove(e, el) {
      let news = el.parentNode.parentNode;
      let list = [...news.querySelectorAll(".card-list")];
      let index = list.findIndex(item => item == el);

      list.forEach((o, i) => {
        if (i != index) {
          let rect = o.getBoundingClientRect();
          if (
            e.x >= rect.left &&
            e.x <= rect.right &&
            e.y >= rect.top &&
            e.y <= rect.bottom
          ) {
            console.log("鼠标已进入卡片交换区！", i);
            if (index < i) {
              news.insertBefore(el, o.nextElementSibling);
            } else {
              news.insertBefore(el, o);
            }
          }
        }
      });
    },
    dragEnd(e) {}
  }
};
</script>

<style lang="scss" scoped>
.news-page {
  .news-box {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .ivu-row {
    .ivu-col {
      padding: 20px;
    }
  }
}
</style>
