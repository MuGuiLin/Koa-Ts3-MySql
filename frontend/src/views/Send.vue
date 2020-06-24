<template>
  <section class="send-page">
    <Row>
      <Col span="24">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="在这里填写标题" />
          </FormItem>
          <FormItem label="作者" prop="author">
            <Input v-model="formValidate.author" placeholder="在这里填写作者" />
          </FormItem>
          <FormItem label="正文" prop="content">
            <section class="content" id="content"></section>
          </FormItem>
          <FormItem label="类型" prop="typeId">
            <Select v-model="formValidate.typeId" placeholder="请选择新闻类型" prefix="ios-home">
              <Option v-for="item in typeArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="封面" prop="cover">
            <Col span="12">
              <Upload
                multiple
                type="drag"
                :format="['jpg','jpeg','png']"
                name="muFile"
                action="/Api/upload/file"
                :max-size="2048"
                :on-success="handleSuccess"
                :on-exceeded-size="handleExceeded"
              >
                <div style="padding: 20px 0">
                  <Icon type="md-cloud-upload" size="56" style="color: #3399ff"></Icon>
                  <p>单击这里 或 拖动图片到这里进行上传！</p>
                </div>
              </Upload>
            </Col>

            <Col span="11" offset="1">
              <div class="cover-box">
                <img v-if="formValidate.cover" :src="this.$store.state.server.staticHost + formValidate.cover" />
                <img v-else src="../assets/default.png" />
              </div>
            </Col>
          </FormItem>
          <!-- <FormItem label="Date">
            <Row>
              <Col span="11">
                <FormItem prop="date">
                  <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <FormItem prop="time">
                  <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
              <Radio label="male">Male</Radio>
              <Radio label="female">Female</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>-->
          <FormItem label="关键字">
            <Input v-model="formValidate.keyword" placeholder="在这里输入关键字，多个中间用逗号隔开！" />
          </FormItem>
          <FormItem label="摘要" prop="summary">
            <Input
              v-model="formValidate.summary"
              type="textarea"
              :autosize="{minRows: 5, maxRows: 5}"
              placeholder="请在这里输入新闻摘要！。。。"
            />
          </FormItem>
          <FormItem label="原文链接">
            <Input v-model="formValidate.link" placeholder="在这里输入原文链接！" />
          </FormItem>
          <FormItem>
            <Button
              type="info"
              size="large"
              icon="ios-paper-plane"
              @click="handleSubmit('formValidate')"
            >发 布</Button>
            <Button
              type="warning"
              size="large"
              icon="md-refresh"
              @click="handleReset('formValidate')"
              style="margin-left: 8px"
            >重 置</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import wangEditor from "wangeditor";

export default {
  name: "Send",
  components: {},
  data() {
    return {
      editor: Object,
      formValidate: {
        userId: this.$store.state.user.userinfo.id,
        title: "",
        author: "",
        content: "",
        typeId: "0",
        cover: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        keyword: "",
        summary: "",
        link: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "标题不能为空！",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "作者不能为空！",
            trigger: "blur"
          }
          // { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        // typeId: [
        //   {
        //     required: true,
        //     message: "请选择新闻类型！",
        //     trigger: "change"
        //   }
        // ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        summary: [
          {
            required: true,
            message: "请输入新闻摘要！",
            trigger: "blur"
          },
          {
            type: "string",
            min: 2,
            message: "新闻摘要字数不能少于2字",
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    ...mapState("news", {
      typeArr: state => state.newsType
    })
  },
  mounted() {
    if (null === this.typeArr) {
      this.$store.dispatch("news/getType");
    }

    this.editor = new wangEditor("#content");
    const config = this.editor.customConfig;

    // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
    config.zIndex = 1; //工具菜单编辑区域的z-index默认为10000
    config.uploadImgShowBase64 = true; // 使用 base64 保存图片
    config.uploadImgServer = "/upload"; // 上传图片到服务器
    config.pasteFilterStyle = false; // 粘贴样式的过滤。
    config.pasteIgnoreImg = false; // 忽略外域图片。
    config.onchange = html => {
      // html 即变化之后的内容
      this.formValidate.content = html;
    };

    this.editor.create();
    this.editor.txt.html("<p>请在这里输入新闻内容！。。。</p>");
    // this.editor.txt.clear(); //清空编辑器内容
    // this.editor.txt.append("<p>追加的内容</p>");
    this.editor.txt.html(); // 获取取 html
    this.editor.txt.text(); // 获取 text
  },

  methods: {
    handleSuccess(res, file) {
      this.formValidate.cover = res.path;
    },
    handleExceeded(res, file) {
      this.$Message.info({
        content: "文件不能大于2M",
        duration: 3
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          console.log(this.formValidate);
          try {
            await this.$store
              .dispatch("news/addNews", this.formValidate)
              .then(res => {
                if (204 == res.status) {
                  this.$Message.success("新闻发布成功!");
                  window.location.href = '/';
                }
              });
          } catch (err) {
            const { message, errorDetails } = err.response.data;
            this.$Message.error(message + errorDetails);
          }
        } else {
          this.$Message.error("请正确填写新闻发布信息!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.send-page {
  margin: auto;
  padding: 50px;
  max-width: 1000px;
  background: white;
  box-shadow: 1px 5px 20px 0 rgba(0, 0, 0, 0.1);
  .ivu-row {
    .ivu-col {
      .content {
        text-align: left;
        height: 360px !important;
      }
      .ivu-select {
        text-align: left;
      }
      .cover-box {
        padding: 10px;
        width: 100%;
        height: 200px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border: 1px solid #ebebeb;
        }
      }
    }
  }
}
</style>
