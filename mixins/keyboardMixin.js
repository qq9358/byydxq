import { mobileMixin } from "./mobileMixin.js";

const keyboardMixin = {
  mixins: [mobileMixin],
  data() {
    return {
      clientHeight: 0
    };
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    onFocus(e) {
      if (["input", "textarea"].includes(e.target.localName)) {
        this.keyboardPopup();
      }
    },
    onBlur(e) {
      if (["input", "textarea"].includes(e.target.localName)) {
        if (this.isIphone()) {
          this.keyboardPopdown();
        }
      }
    },
    onResize() {
      if (resizeHeight >= this.clientHeight) {
        if (!this.isIphone()) {
          this.keyboardPopdown();
        }
      }
    },
    keyboardPopup() {
    },
    keyboardPopdown() {
    }
  }
};

export { keyboardMixin };
