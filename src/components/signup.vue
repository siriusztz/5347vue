<template>
     <el-row>
        <el-col :span="12" >
            <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="80px">
                <h3 class="title">System Sign up</h3>
                <el-form-item prop="firstname" label="firstname">
                    <el-input type="text" v-model="form.firstname" auto-complete="off" placeholder="First Name"></el-input>
                </el-form-item>
                <el-form-item prop="lastname" label="lastname">
                    <el-input type="text" v-model="form.lastname" auto-complete="off" placeholder="Last Name"></el-input>
                </el-form-item>
                <el-form-item prop="username" label="username">
                    <el-input type="text" v-model="form.username" auto-complete="off" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="password">
                    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="Password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="email">
                  <el-input type="email" v-model="form.email" auto-complete="off" placeholder="Email"></el-input>
                </el-form-item>
                <el-form-item style="width:50%;">
                    <el-button type="primary" @click.native.prevent="signupSubmit">Sign up</el-button>
                    <el-button type="primary" @click="goBack">Go back</el-button>
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
        firstname: null,
        lastname: null,
        username: null,
        password: null,
        email: null
      },
      rules: {
        firstname: {
          required: true,
          message: "please input firs name",
          trigger: "blur"
        },
        lastname: {
          required: true,
          message: "please input last name",
          trigger: "blur"
        },
        username: {
          required: true,
          message: "please input username",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "please input password",
          trigger: "blur"
        },
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
    goBack() {
      this.$router.go(-1);
    },
    signupSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          overallApi
            .signUp(this.form)
            .then(res => {
              this.$message.success("sign up succeed");
              this.$router.push({ path: "/login" });
            })
            .catch(err => {
              this.$message.error("sign up fail");
              console.log(err);
            });
        } else {
          return;
        }
      });
    }
  }
};
</script>


