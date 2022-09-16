<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar v-if="$route.meta.tabBarStatus"></tab-bar>
  </div>
</template>

<script>
import tabBar from '@/components/Tabbar/index.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    tabBar,
},
  methods: {}
}
</script>
 
<style lang = "less">
  #app{
    background-color: #efefef;
    min-height: 100%;

    // 设置默认大小是16像素  
    font-size:.16rem
  }
  html,body{
    height: 100%;
    font-size:100px!important;
  }
</style>