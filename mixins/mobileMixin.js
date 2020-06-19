const mobileMixin = {
  data() {
    return {
      isLoading: false,
      pageLoaded: false
    };
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    isIphone() {
      return /iphone|ipod|ipad/i.test(navigator.appVersion);
    },
    loading() {
      uni.showLoading({
        duration: 0,
        title: "加载中..."
      });
      this.isLoading = true;
    },
    loaded() {
      this.isLoading = false;
	  uni.hideLoading();
    },
    normalizeImage(selectors) {
      // let images = document.querySelectorAll(`${selectors} img`);
      // for (let image of images) {
      //   image.removeAttribute("width");
      //   image.removeAttribute("height");
      // }
    }
  }
};

export { mobileMixin };
