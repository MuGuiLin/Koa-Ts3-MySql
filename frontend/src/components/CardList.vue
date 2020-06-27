<template>
  <section class="card-list">
    <div class="list" ref="list">
      <Card>
        <router-link :to="{ name: 'Info', params: {id: oData.id}}">
          <img @mousedown.prevent :src="compSrc(oData.cover)" />
          <h3>{{oData.title}}</h3>
          <time>
            <Icon type="ios-time" size="20"></Icon>
            {{oData.createdAt | dateFormat}}
          </time>
          <p class="ios-sum">
            <label>
              <Icon type="md-thumbs-up" />
              {{oData.likeSum}}
            </label>
            <label>
              <Icon type="ios-eye" />
              {{oData.readSum}}
            </label>
          </p>
        </router-link>
      </Card>
    </div>
  </section>
</template>

<script>
import dateFormat from "@/filters/dateTime";

export default {
  name: "CardList",

  components: {},

  props: {
    oData: Object
  },

  data() {
    return {
      drag: {
        isDown: false,
        isDrag: false,
        clientX: 0,
        clientY: 0,
        elementX: 0,
        elementY: 0
      }
    };
  },

  filters: {
    dateFormat
  },

  mounted() {
    this.$refs.list.addEventListener("mousedown", this.dragDown);
    document.addEventListener("mousemove", this.dragMove);
    document.addEventListener("mouseup", this.dragUp);
  },

  methods: {
    compSrc(src) {
      if(src) {
        return "http" == src.slice(0, 4) ? src : this.$store.state.server.staticHost + src;
      }
    },

    dragDown(e) {
      this.drag.isDown = true;
      this.drag.clientX = e.clientX;
      this.drag.clientY = e.clientY;

      let rect = this.$refs["list"].getBoundingClientRect();
      this.drag.elementX = rect.x;
      this.drag.elementY = rect.y;
    },

    dragMove(e) {
      if (this.drag.isDown) {
        let list = this.$refs.list;
        let x = e.clientX - this.drag.clientX;
        let y = e.clientY - this.drag.clientY;

        // 触发拖拽条件
        if (5 < x || 5 < y) {
          if (!this.drag.isDrag) {
            this.drag.isDrag = true;

            list.style.position = "absolute";
            list.style.zIndex = 9999;
            list.style.transform = "rotate(6deg)";

            document.body.appendChild(list);
            this.$emit("dragStart", e, this.$el);
          }

          list.style.top = this.drag.elementY + y + "px";
          list.style.left = this.drag.elementX + x + "px";
          this.$emit("dragMove", e, this.$el);
        }
      }
    },

    dragUp(e) {
      if (this.drag.isDown) {
        if (this.drag.isDrag) {
          let list = this.$refs.list;

          list.style.position = "relative";
          list.style.top = "0px";
          list.style.left = "0px";
          list.style.transform = "rotate(0deg)";

          this.$el.appendChild(list);
          this.$emit("dragEnd", e, this.$el);
        }
        this.drag.isDown = this.drag.isDrag = false;
      }
    }
  }
};
</script>

<style lang="scss" >
.card-list {
  position: relative;
}
.list {
  position: relative;
  width: 300px;
  user-select: none;
  // box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.1);
  .ivu-card-body {
    min-height: 360px;

    a {
      img {
        width: 100%;
        height: 200px;
      }
      h3 {
        height: 60px;
        line-height: 30px;
        text-align: justify;
        text-align: left;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      time {
        display: block;
        line-height: 32px;
        text-align: left;
        color: #0dc326;
      }
      p {
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
        font-size: 16px;
      }
    }
  }
}
</style>
