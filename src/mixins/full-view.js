export default {
  created() {
    this.html = window.document.querySelector("html");
    this.body = window.document.querySelector("body");
    this.app = window.document.querySelector("#app");
    this.page = window.document.querySelector("#page");
    this.setHeight(this.html);
    this.setHeight(this.body);
    this.setHeight(this.app);
    this.setHeight(this.page);
    this.setOverflow(this.html);
    this.setOverflow(this.body);
    this.setOverflow(this.app);
    this.setOverflow(this.page);
  },
  mounted() {
    this.html = window.document.querySelector("html");
    this.body = window.document.querySelector("body");
    this.app = window.document.querySelector("#app");
    this.page = window.document.querySelector("#page");
    this.setHeight(this.html);
    this.setHeight(this.body);
    this.setHeight(this.app);
    this.setHeight(this.page);
    this.setOverflow(this.html);
    this.setOverflow(this.body);
    this.setOverflow(this.app);
    this.setOverflow(this.page);
  },
  beforeDestroy() {
    this.setHeight(this.html, "auto");
    this.setHeight(this.body, "auto");
    this.setHeight(this.app, "auto");
    this.setHeight(this.page, "auto");
    this.setOverflow(this.html, "auto");
    this.setOverflow(this.body, "auto");
    this.setOverflow(this.app, "auto");
    this.setOverflow(this.page, "auto");
  },
  data() {
    return {
      html: undefined,
      body: undefined,
      app: undefined,
      page: undefined
    };
  },
  methods: {
    setHeight: function(el, height = "100%") {
      el.style.height = height;
    },
    setOverflow: function(el, overflow = "hidden") {
      el.style.overflow = overflow;
    }
  }
};
