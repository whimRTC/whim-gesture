<template>
  <div class="container" style="background-color:transparent;">
    <div
      class="player"
      :width="videoWidth" 
      :height="videoHeight" 
      v-if="$route.query.isMe == 'True'"
    >
      <div v-if="theme !== ''" >
        <v-card>{{theme}}</v-card>
        <v-btn color="primary" @click="newTheme"> 次のお題へ </v-btn>
      </div>
      <v-btn v-else @click="newTheme">Game Start</v-btn>
    </div>
  </div>
</template>


<script>

import firebase from "~/plugins/firebase.js"
const db = firebase.firestore();

export default {
  data: function () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      appData: [],
      users: [],
      theme: '',
      words: [],
      vocabulary: ['ウサギ', 'キツネ', '野球', 'サッカー', 'バスケットボール', '料理', '先生', 'ふりかけ', '恐竜', 'テニス', 'ラグビー', '柔道', '剣道', '空手', '水泳', 'スケート', '棒高跳び', '砲丸投げ', '編み物', '茶道', '乳搾り', 'パソコン', 'テレビゲーム', '掃除', '漫才', '宇宙飛行士', '運転', '飛行機', 'オートバイ']
    }
  },
  computed: {
    videoWidth: function(){
      return Math.floor(this.width/2)
    },
    videoHeight: function(){
      return Math.floor(this.height/2)
    },
    fireRoom: function(){
      return db.collection('rooms').doc(this.$route.query.roomId)
    },
    playerId() {
      return this.$route.params.id
    },
    isSelected() {
      return this.appData.find(element => element.id == this.playerId);
    },
    isAllSelected() {
      return this.users.length <= this.appData.length
    },
    selectedShow() {
      if(!this.isSelected){
        return false
      }
      return this.isSelected.show
    }
  },
  methods: {
    newTheme() {
      if(this.words.length === 0) {
        this.words = this.vocabulary
      }
      const arrayIdx = Math.floor(Math.random() * this.words.length)
      const theme = this.words[arrayIdx]
      this.words.splice(arrayIdx, 1) // 既出単語を削除
      return theme
    }
  },
  mounted() {
    console.log('hoge')
  },
  firestore() {
    return {
      room: db.collection('rooms').doc(this.$route.query.roomId),
      appData: this.fireRoom.collection('appData'),
      users: this.fireRoom.collection('users')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.player {
  position: absolute;
  z-index:0;
  border: 1px black;
}
</style>
