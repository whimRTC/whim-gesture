<template>
  <v-app id="app">
    <v-content color="transparent">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
<style lang="scss">
.v-application {
  font-family: 'Noto Sans JP', sans-serif;
}
.text{
  font-family: 'Noto Sans JP', sans-serif;
  &--title{
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
  }
  &--subtitle{
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
  }
  &--body{
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
  }
  &--annotation{
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
  }
}
#app {
  background: rgba(226,226,226,0);
}
</style>
