<template>
    <div>
        <el-row :span="24">
            <el-col :span="4">
                <el-input-number v-model="articNum" size="small" :min="1" :max="10"></el-input-number>
            </el-col>
            <el-col :span="9">
            <el-table  :data="mostReslist" width="100%" stripe border>
                <el-table-column prop="_id" label="期号">
                </el-table-column>
                <el-table-column prop="totalRes" label="赛事编号">
                </el-table-column>
            </el-table>
            </el-col>
            <el-col :span="9">
             <el-table  :data="leastReslist" width="100%" stripe border>
                <el-table-column prop="_id" label="期号" >
                </el-table-column>
                <el-table-column prop="totalRes" label="赛事编号" >
                </el-table-column>
            </el-table>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="8">
            <el-tag type="success">most</el-tag>
            <span>{{article1}}</span>
            </el-col>
            <el-col :span="12">
            <el-tag >least</el-tag>
            <span>{{article2}}</span>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="8">
            <el-tag >shortest</el-tag>
            <span>{{history2}}</span>
            </el-col>
            <el-col :span="12">
            <el-tag type="success">longest three</el-tag>
            <span>{{history1}}</span>
            </el-col>
        </el-row>

        <el-row>
        <el-carousel height="450px" indicator-position="outside" :autoplay=false>
          <el-carousel-item>  
            <ve-histogram :data=this.chartData width="800px"></ve-histogram>
          </el-carousel-item>
          <el-carousel-item>
            <ve-pie :data=this.piechartData width="800px"></ve-pie>
          </el-carousel-item>
        </el-carousel>
        </el-row>

    </div>
</template>
<script type="text/ecmascript-6">
import overallApi from "../../api/overall";

export default {
  mounted() {
    this.getListByrevnum();
    this.getListByuserNum();
    this.getListByhistory();
    this.getStatistics();
  },
  data() {
    return {
      articNum: 1,
      listByresnum: [],
      listByusernum: [],
      listByhistory: [],
      article1: null,
      article2: null,
      history1: null,
      history2: null,
      chartData: {
        columns: ["year", "admin", "anon", "bot", "regular"],
        rows: []
      },
      piechartData: {
        columns: ["type", "number"],
        rows: []
      },
      chartSettings: {
        dimension: "type",
        metrics: "number"
      }
    };
  },
  computed: {
    mostReslist() {
      var list = new Array();
      for (var i = 0; i < this.articNum; i++) {
        list[i] = this.listByresnum[98 - i];
      }
      return list;
    },
    leastReslist() {
      var list = new Array();
      for (var i = 0; i < this.articNum; i++) {
        list[i] = this.listByresnum[i];
      }
      return list;
    }
  },
  methods: {
    getListByrevnum() {
      overallApi
        .getListByrevNum()
        .then(res => {
          // console.log("getListByrevnum", res.data[98]);
          this.listByresnum = res.data;
        })
        .catch();
    },
    getListByuserNum() {
      overallApi
        .getListByuserNum()
        .then(res => {
          //   console.log("getListByrevnum", res.data);
          this.listByusernum = res.data;
          this.article1 = this.listByusernum[97]._id;
          this.article2 = this.listByusernum[0]._id;
        })
        .catch();
    },
    getListByhistory() {
      overallApi
        .getListByhistory()
        .then(res => {
          for (var i = 0; i < 3; i++) {
            this.history1 = this.history1 + "," + res.data[98 - i]._id;
          }
          this.history2 = res.data[0]._id;
        })
        .catch();
    },
    getStatistics() {
      overallApi
        .getOverallStatistic()
        .then(res => {
          var chartData = {
            columns: ["year", "admin", "anon", "bot", "regular"],
            rows: []
          };
          for (var i = 0; i < res.data.length; i++) {
            var year = res.data[i];

            var row = { year: year._id };
            if (year.users.length == 3) {
              row["bot"] = 0;
            }
            for (var j = 0; j < year.users.length; j++) {
              row[year.users[j].type] = year.users[j].total;
            }
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
    }
  }
};
</script>