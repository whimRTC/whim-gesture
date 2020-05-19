<template>
  <div class="container">
    <div
      class="player"
      v-if="
        isMe &&
          $store.state.accessUserId === appState.questioner &&
          appState.phase === 'playing'
      "
    >
      <div class="theme">
        {{ theme }}
      </div>
      <div class="answer">
        正解数: {{ appState.nAnswer }} あと{{ timeLeft }}秒！
      </div>
      <button color="danger" @click="newTheme">パス</button>
      <button color="success" @click="correct">OK</button>
    </div>
    <div v-else-if="isMe && appState.phase === 'finished'" class="player">
      <div class="answer">結果: {{ appState.nAnswer }}ポイント</div>
      <button @click="initialize">もう一度やる!！</button>
    </div>
    <div
      v-else-if="
        displayUser.id === appState.questioner && appState.phase === 'playing'
      "
      class="player"
    >
      <div class="mb-12">ジェスチャーちゅう</div>
      <span />
    </div>
    <a
      v-else-if="isMe && !appState.phase"
      @click="start"
      class="fuwatto_btn_yellow"
      >出題者になる</a
    >
  </div>
</template>
<script>
const TIME_LIMIT = 60;

export default {
  name: "Player",
  props: ["displayUser"], // 表示されているUserの情報
  data() {
    return {
      now: new Date().getTime(),
      indices: [],
      vocabulary: [
        "ウサギ",
        "キツネ",
        "野球",
        "サッカー",
        "バスケットボール",
        "料理",
        "先生",
        "ふりかけ",
        "恐竜",
        "テニス",
        "ラグビー",
        "柔道",
        "剣道",
        "空手",
        "水泳",
        "スケート",
        "棒高跳び",
        "砲丸投げ",
        "編み物",
        "茶道",
        "乳搾り",
        "パソコン",
        "テレビゲーム",
        "掃除",
        "漫才",
        "宇宙飛行士",
        "運転",
        "飛行機",
        "オートバイ"
      ]
    };
  },
  computed: {
    isMe() {
      return this.$store.state.accessUserId === this.displayUser.id;
    },
    appState() {
      return this.$store.state.appState;
    },
    timeLeft() {
      console.log("timeLeft");
      if (this.appState.phase !== "playing") return undefined;
      const timeBegin = this.appState.timeBegin;
      if (timeBegin === undefined) return undefined;
      const between = this.now - timeBegin;
      const t = TIME_LIMIT - Math.floor(between / 1000);
      if (t <= 0) {
        this.$store.dispatch("appState", { phase: "finished" });
      }
      return t;
    }
  },
  methods: {
    start() {
      console.log("started");
      this.$store.dispatch("appState", {
        questioner: this.$store.state.accessUserId,
        nAnswer: 0,
        timeBegin: new Date().getTime(),
        phase: "playing"
      });
      this.newTheme();
    },
    initialize() {
      this.$store.dispatch("resetAppState", {});
    },
    newTheme() {
      if (this.indices.length === 0) {
        this.indices = Array.from(
          { length: this.vocabulary.length },
          (v, k) => k
        );
      }
      const arrayIdx = Math.floor(Math.random() * this.indices.length);
      this.theme = this.vocabulary[this.indices[arrayIdx]];
      this.indices.splice(arrayIdx, 1); // 既出単語を削除
    },
    correct() {
      this.$store.dispatch("appState", {
        nAnswer: this.appState["nAnswer"] + 1
      });
      this.newTheme();
    }
  },
  mounted() {
    setInterval(() => {
      this.now = new Date().getTime();
    }, 100);
  }
};
</script>
<style lang="scss" scoped>
.fuwatto_btn_yellow {
  display: block;
  background-color: #ffc605;
  color: #fff;
  padding: 0.8em;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-out;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  text-align: center; /*一応BOX内の文字も中央寄せ*/
}
.fuwatto_btn_yellow:hover {
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.12), 0 3px 20px 0 rgba(0, 0, 0, 0.12),
    0 5px 6px -2px rgba(0, 0, 0, 0.2);
}

.player {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 20%;
  text-align: center;
  background: rgba(256, 256, 256, 0.7);
  border-radius: 10px;
}
</style>
