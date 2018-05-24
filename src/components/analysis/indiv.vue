<template>
  <div >
    <el-row>
      <el-select v-model="article" :remote-method="articleRemoteMethod" filterable remote placeholder="please enter article name">
        <el-option v-for="(item,index) in selectArticle.options" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-button type="primary" @click="articleQuery()">Qury</el-button>
      <el-tag type="success">article:{{article}}</el-tag>
      <el-tag type="warning">reviseNum:{{resNum}}</el-tag>
    </el-row>
    <el-row :span="24">
      <el-col :span="12">
        <el-table  :data="topList" stripe border>
            <el-table-column prop="_id" label="Editor name">
            </el-table-column>
            <el-table-column prop="total" label="Number">
            </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-carousel height="450px" indicator-position="outside" :autoplay=false>
        <el-carousel-item>
          <ve-histogram :data=this.chartData width="800px"></ve-histogram>
        </el-carousel-item>
        <el-carousel-item>
          <ve-pie :data=this.piechartData  width="800px"></ve-pie>
        </el-carousel-item>
        <el-carousel-item>
          <el-row :span="24" style="text-align: center">  
            <el-checkbox-group v-model="checkedAuthor" @change="handleCheckedChange">
            <el-checkbox v-for="(author,index) in topList" :label="author._id" :key="index">{{author._id}}</el-checkbox>
            </el-checkbox-group>
          </el-row>
          <el-row>
             <ve-histogram :data=this.fivechartData width="800px"></ve-histogram>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </el-row>
  </div>
</template>

<script>
import overallApi from "../../api/overall";

export default {
  data() {
    return {
      article: null,
      resNum: null,
      selectArticle: {
        options: [],
        loading: false
      },
      topList: [],
      checkedAuthor: [],
      chartData: {
        columns: ["year", "admin", "anon", "bot", "regular"],
        rows: []
      },
      piechartData: {
        columns: ["type", "number"],
        rows: []
      },
      fivechartData: {
        columns: ["_id", "total"],
        rows: []
      }
    };
  },
  computed: {},
  methods: {
    articleRemoteMethod(query) {
      this.selectArticle.loading = true;
      overallApi
        .getSelectArticle({ name: query })
        .then(res => {
          console.log("queryArticleOfSelect", res);
          this.selectArticle.loading = false;
          this.selectArticle.options = res.data;
        })
        .catch(error => {
          console.log("error:" + error);
        });
    },
    articleQuery() {
      overallApi
        .getArticleRevnum({ name: this.article })
        .then(res => {
          this.resNum = res.data.num;
        })
        .catch(error => {
          console.log("error:" + error);
        });

      overallApi
        .getTopfiveEditor({ name: this.article })
        .then(res => {
          console.log(res);
          this.topList = res.data;
        })
        .catch(error => {
          console.log("error:" + error);
        });

      this.getStatistics();
    },
    getStatistics() {
      overallApi
        .getIndivStatistic({ name: this.article })
        .then(res => {
          var chartData = {
            columns: ["year", "admin", "anon", "bot", "regular"],
            rows: []
          };
          for (var i = 0; i < res.data.length; i++) {
            var year = res.data[i];

            var row = { year: year._id };
            row["admin"] = year.users.admin;
            row["anon"] = year.users.anon;
            row["bot"] = year.users.bot;
            row["regular"] = year.users.regular;

            chartData.rows[i] = row;
          }
          this.chartData = chartData;

          var admin = 0,
            anon = 0,
            bot = 0,
            regular = 0;
          for (var i = 0; i < chartData.rows.length; i++) {
            var year = chartData.rows[i];
            admin += year.admin;
            anon += year.anon;
            bot += year.bot;
            regular += year.regular;
          }
          var rows = new Array();
          rows.push({ type: "admin", number: admin });
          rows.push({ type: "anon", number: anon });
          rows.push({ type: "bot", number: bot });
          rows.push({ type: "regular", number: regular });

          this.piechartData.rows = rows;
        })
        .catch();
    },
    topfiveQuery() {
      overallApi
        .getTopfiveStatistic(this.checkedAuthor)
        .then(res => {
          this.fivechartData.rows = res.data;
        })
        .catch(error => {
          console.log("error:" + error);
        });
    },

    handleCheckedChange() {
      // console.log(checkedAuthor);
      this.topfiveQuery();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
