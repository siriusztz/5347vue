<template>
    <div>
        <el-row>
        <el-select v-model="author" :remote-method="authorRemoteMethod" :loading="selectAuthor.loading"
        filterable remote placeholder="please enter name">
            <el-option v-for="(item,index) in selectAuthor.options" :key="index" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="primary" @click="authorQuery()">Qury</el-button>
        <el-tag type="warning">reviseNum:{{reviesNum}}</el-tag>
        </el-row>
        <el-row>
            <el-col :span="12">
            <el-table  :data="revisionList" width="100%" max-height="400" stripe border>
                <el-table-column prop="_id" label="article name">
                </el-table-column>
                <el-table-column label="timestamps" width="300px">
                  <template slot-scope="scope" >
                    <el-dropdown>
                      <span class="el-dropdown-link">hover to show timestamp<i class="el-icon-arrow-down el-icon--right"></i></span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in scope.row.timestamps" :key="index" label>{{item}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
            </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import overallApi from "../../api/overall";
import timestamp from "../../sections/section";

export default {
  components: {
    dropdown: timestamp
  },
  data() {
    return {
      author: null,
      selectAuthor: {
        options: [],
        loading: false
      },
      revisionList: [],
      reviesNum: null,
      test: [1, 2, 3]
    };
  },
  methods: {
    authorRemoteMethod(query) {
      if (
        query !== "" &&
        query !== null &&
        query !== undefined &&
        query.length != 1
      ) {
        this.selectAuthor.loading = true;
        overallApi
          .getSelectAuthor({ name: query })
          .then(res => {
            console.log("queryLeagueOfSelect", res);
            this.selectAuthor.loading = false;
            this.selectAuthor.options = res.data;
          })
          .catch(error => {
            console.log("error:" + error);
          });
      }
    },
    authorQuery() {
      this.reviesNum = 0;
      if (this.author !== "" && this.author !== null) {
        overallApi
          .getRevisonByauthor({ name: this.author })
          .then(res => {
            this.revisionList = res.data;
            for (var i = 0; i < res.data.length; i++) {
              this.reviesNum += this.revisionList[i].titleNum;
              this.revisionList[i].timestamp = "";
              for (var j = 0; j < this.revisionList[i].timestamps.length; j++)
                this.revisionList[i].timestamp +=
                  this.revisionList[i].timestamps[j] + "\r";
            }
          })
          .catch(error => {
            console.log("error:" + error);
          });
      }
    }
  }
};
</script>

<style>
</style>