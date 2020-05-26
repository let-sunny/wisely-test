export default {
  created() {
    this.html = window.document.querySelector("html");
    this.body = window.document.querySelector("body");
    this.app = window.document.querySelector("#app");
    this.page = window.document.querySelector("#page");
    this.setHeight(this.html, "100%");
    this.setHeight(this.body, "100%");
    this.setHeight(this.app, "100%");
    this.setHeight(this.page, "100%");
  },
  mounted() {
    this.html = window.document.querySelector("html");
    this.body = window.document.querySelector("body");
    this.app = window.document.querySelector("#app");
    this.page = window.document.querySelector("#page");
    this.setHeight(this.html, "100%");
    this.setHeight(this.body, "100%");
    this.setHeight(this.app, "100%");
    this.setHeight(this.page, "100%");
  },
  beforeDestroy() {
    this.setHeight(this.html);
    this.setHeight(this.body);
    this.setHeight(this.app);
    this.setHeight(this.page);
  },
  data() {
    return {
      html: undefined,
      body: undefined,
      app: undefined,
      page: undefined,
    };
  },
  methods: {
    setHeight: function(el, height = "") {
      el.style.height = height;
    }
  }
};
