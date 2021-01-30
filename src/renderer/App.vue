<template>
  <div id="app">
    <router-view></router-view>
    <test_update></test_update>
    <div>
      版本号   {{releaseNote}}
    </div>
  </div>
</template>

<script>
import test_update from "./pages/test_update";
export default {
  name: 'App',
  data() {
    return {
      releaseNote:"1.0.1"
    }
  },
  components:{
    test_update
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
