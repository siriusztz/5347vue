<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  /* background-color:white; */
}
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.el-row {
    margin-bottom: 20px;
  }
</style>
