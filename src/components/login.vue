<template>
     <el-row>
        <el-col :span="12">
            <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="6em">
                <h3 class="title">System Login</h3>
                <el-form-item prop="username" label="username">
                    <el-input type="text" v-model="form.username" auto-complete="off" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="password">
                    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="Password"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary"  @click.native.prevent="loginSubmit">Sign in</el-button>
                    <el-button type="primary"  @click.native.prevent="gotoSignup">Sign up</el-button>
                </el-form-item>
          
            </el-form>
        </el-col>    
    </el-row>
</template>
<script>
import overallApi from "../api/overall";

export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      rules: {
        username: [
          { required: true, message: "please input username", trigger: "blur" }
        ],
        password: [
          { required: true, message: "please input password", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            tyep: "email",
            message: "please input email",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    loginSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          overallApi
            .loginUser(this.form)
            .then(res => {
              console.log(res.data.session);
              //登陆成功后设置sessionStorage
              sessionStorage.setItem("userinfo", res.data.session);
              this.$router.push({ path: "/" });
            })
            .catch(err => {
              this.$message.error('username or password not correct');
              console.log(err);
            });
        } else {
          return;
        }
      });
    },
    gotoSignup(){
      this.$router.push({path:"/signup"})
    }
  }
};
</script>

<style>
* {
  font-size: 13px;
}
</style>