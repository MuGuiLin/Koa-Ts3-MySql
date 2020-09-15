<template>
  <div id="app">
    <!-- 利用keep-alive做组件缓存，保留组件状态，提高执行效率
    
    1、写在<keep-alive></keep-alive>中的属性
    include 指定需要缓存的页面(注：名字是组件中的name属性值) 
    exclude 指定需要排除缓存的页面，其他都要缓存
    max 最大缓存数（在达到指定值后，就进一个出一个）

    2、写在视图、组件(与data(){}平级)中的生期周期钩子函数
    activated 进入视图钩子, 
    deactivated 离开视图钩子
    -->
    
    <keep-alive :include="['News', 'Main']" max="10">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
