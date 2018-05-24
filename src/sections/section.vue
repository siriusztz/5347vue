<template>
   <el-dropdown>
        <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in value" :key="index" >{{item}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
  props: {
    value: null
  },
  data() {
    return {
      timestamps: []
    };
  },
  watch: {
    value(val) {
      this.selectedLeague = val;
    }
  }
};
</script>
