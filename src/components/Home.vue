<template>
    <div class="navi">
        <el-row :span="24">
            <el-col :span="12">
                <div id="logo">
                    <img src="../assets/logo.png" class="logo-home"/>
                </div>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" round @click.native="logout">Logout</el-button>
            </el-col>
        </el-row>
            <el-row :gutter="10">
               <el-col :span="4">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
                    <template v-for="(item,rindex) in $router.options.routes" v-if="!item.hidden" >
                        <el-submenu :key="item.key" :index="rindex+''">
                            <template slot="title" >
                                <i :class=item.iconCls></i>
                                <span>{{item.name}}</span>
                            </template>
                            <div v-for="child in item.children" :key="child.path"> 
                                <el-menu-item :index="child.path" v-if="!child.hidden" >
                                    <i :class="child.icon"></i>
                                    <span>{{child.name}}</span>
                                </el-menu-item>
                            </div>
                        </el-submenu>
                    </template>
                </el-menu>
               </el-col>
               
                <el-col :span="18">
                    <div style="margin-top:10px">                     
                     <router-view></router-view>
                    </div>
                </el-col>
            </el-row>
    </div>
</template>

<script>
import router from "../router";
import Vue from "vue";
import overallApi from "../api/overall";

export default {
  components: {},
  data() {
    return {
      username: ""
    };
  },
  mounted() {
    let userinfo = sessionStorage.getItem("userinfo");
    this.username = userinfo;
  },
  methods: {
    logout: function() {
      this.$confirm("Are you sure logout?", "Mention", {}).then(() => {
        sessionStorage.removeItem("userinfo");
        overallApi
          .logout()
          .then(res => {
            console.log("logout");
          })
          .catch();
        router.push({ path: "/login" });
      });
    }
  }
};
</script>

<style>
.navi {
  /* background-color: white; */
  min-height: 600px;
}
.logo-home {
  height: 70px;
  width: 80px;
}
</style>