<template>
  <div>
    <el-backtop><i class="el-icon-caret-top"></i></el-backtop>
    <div class="banner" style="">
      <div class="banner_text" style="">
        <div style="opacity: 1;margin-top: 80px; font-size: 30px; color: white; font-weight: bold; text-align: center">
          发现各类课程的选课建议
        </div>
        <div style="opacity: 1;margin-top: 20px; font-size: 15px; color: white; text-align: center">
          友链：<a style="color: deepskyblue; font-size: 14px" target="_blank" href="https://pd.qq.com/s/e2q339y0c">欢迎加入江财QQ频道</a>、
          <a style="color: deepskyblue; font-size: 14px" target="_blank" href="mailto:2570089541@qq.com">联系站长</a>
        </div>
        <!--搜索-->
        <div style="opacity: 1; margin-top: 30px; color: white; text-align: center">
              <span>
                <span class="pre-txt">课程类别：</span>
                <el-select :size="selectSize" v-model="searchForm.type" placeholder="类别(可空)">
                  <el-option v-for="item in courseTypes"
                             :label="item"
                             :value="item"
                             :key="item">
                  </el-option>
                </el-select>
              </span>
          <span class="home-input">
                <span class="pre-txt">课程：</span>
                <el-autocomplete
                    :size="selectSize"
                    @focus="courseFocused"
                    class="inline-input"
                    v-model="searchForm.course"
                    :fetch-suggestions="querySearchCourse"
                    placeholder="课程(可空)"
                    @select=""
                ></el-autocomplete>
              </span>
          <span class="home-input">
                <span class="pre-txt">老师：</span>
                <el-autocomplete
                    :size="selectSize"
                    @focus="teacherFocused"
                    class="inline-input"
                    v-model="searchForm.teacher"
                    :fetch-suggestions="querySearchTeacher"
                    placeholder="老师(可空)"
                    @select=""
                ></el-autocomplete>
              </span>
          <span class="home-input" id="search-btn">
                <el-button :size="selectSize" icon="el-icon-search" round @click="submitSearch()">搜索</el-button>
              </span>
        </div>
        <div v-if="rankForCourse.length!==0 || rankForTeacher.length!==0" style="margin-top: 20px; text-align: center">
          <span style="color: white;font-size: 14px"><i class="el-icon-menu"></i>正在热搜：</span>
          <el-button @click="rankForCourseClicked(item)" type="text" v-for="item in rankForCourse">{{item}}</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="rankForTeacherClicked(item)" type="text" v-for="item in rankForTeacher">{{item}}</el-button>
        </div>
      </div>
    </div>
    <div class="dataListBox">
      <span style="font-weight: bold; font-size: 20px;line-height: 40px">建议列表 ({{total}})</span>
      <span style="float: right">
        <el-button @click="latestSortClicked" type="text">最新</el-button> <el-button @click="hotSortClicked" type="text">最热</el-button>
      </span>
      <ul class="dataList" style="margin-top: 40px">

<!--          <div style="margin-bottom: 10px">-->
<!--            <p v-if="!expandedItems[index] && shouldDisplayToggle(item)" class="wrap-text" @click="toggleText(index)">-->
<!--              <span style="background-color: #ecf5ff;">评 <span style="color: #3f9af5">{{item.teacher}}</span> 的 <span style="color: #3f9af5">{{item.course}}</span>：</span>-->
<!--              {{ item.comment | truncate(maxLength) }}-->
<!--              <span style="color: #409eff; font-size: 14px">展开<i class="el-icon-arrow-down"></i></span>-->
<!--            </p>-->
<!--            <p v-else class="wrap-text" @click="toggleText(index)">-->
<!--              <span style="background-color: #ecf5ff;">评 <span style="color: #3f9af5">{{item.teacher}}</span> 的 <span style="color: #3f9af5">{{item.course}}</span>：</span>-->
<!--              {{ item.comment }}-->
<!--              <span v-if="shouldDisplayToggle(item)" style="color: #409eff"><i class="el-icon-arrow-up"></i></span>-->
<!--            </p>-->
<!--            <el-tag v-if="item.hardRate && item.hardRate > 0" size="small">难度:{{item.hardRate}}☆</el-tag>-->
<!--            <el-tag v-if="item.highscoreRate && item.highscoreRate > 0" size="small" style="margin-left: 20px">给分:{{item.highscoreRate}}☆</el-tag>-->
<!--            <el-tag v-if="item.tags && item.tags!==''" size="small" style="margin-left: 20px;">{{item.tags.substring(1, item.tags.length-1)}}</el-tag>-->
<!--            <el-tag type="info" size="small" style="margin-left: 20px">{{item.type}}</el-tag>-->
<!--            <el-tag v-if="item.createDate!=='-&#45;&#45;'" type="info" size="small" style="margin-left: 20px; margin-right: 20px">{{item.createDate.substring(0,10)}}</el-tag>-->
<!--            <el-tag v-if="item.createDate==='-&#45;&#45;'" type="info" size="small" style="margin-left: 20px; margin-right: 20px">日期未知，注意时效</el-tag>-->
<!--            <el-tag v-if="item.unlikes > 0" effect="plain" type="warning" size="small" style="margin-right: 20px">注意甄别×{{item.unlikes}}</el-tag>-->
<!--            <el-button style="margin-top: 5px" v-if="likeState[index] === ''" @click="likeClicked(index, item.id)" size="mini"><i class="el-icon-thumb"></i>&nbsp;&nbsp;{{item.likes}}</el-button>-->
<!--            <el-button style="margin-top: 5px" type="primary" v-if="likeState[index] === 'clicked'" @click="cancelLikeClicked(index, item.id)" size="mini"><i class="el-icon-thumb"></i>&nbsp;&nbsp;{{item.likes}}</el-button>-->
<!--            <el-button style="margin-top: 5px" @click="showReportDialog(item.id)" size="mini"><i class="el-icon-warning"></i></el-button>-->
<!--          </div>-->
<!--        </li>-->
        <li v-for="(item, index) in dataList" :key="item.id">
          <div style="margin-bottom: 10px">
            <p v-if="!expandedItems[index] && shouldDisplayToggle(item)" class="wrap-text" @click="toggleText(index)">
              <span style="background-color: #ecf5ff;">评 <span
                  style="color: #3f9af5">{{ item.teacher }}</span> 的 <span
                  style="color: #3f9af5">{{ item.course }}</span>：</span>
              {{ item.comment | truncate(maxLength) }}
              <span style="color: #409eff; font-size: 14px">展开<i class="el-icon-arrow-down"></i></span>
            </p>
            <p v-else class="wrap-text" @click="toggleText(index)">
              <span style="background-color: #ecf5ff;">评 <span
                  style="color: #3f9af5">{{ item.teacher }}</span> 的 <span
                  style="color: #3f9af5">{{ item.course }}</span>：</span>
              {{ item.comment }}
              <span v-if="shouldDisplayToggle(item)" style="color: #409eff"><i class="el-icon-arrow-up"></i></span>
            </p>
            <el-tag v-if="item.hardRate && item.hardRate > 0" size="small">难度:{{ item.hardRate }}☆</el-tag>
            <el-tag v-if="item.highscoreRate && item.highscoreRate > 0" size="small" style="margin-left: 20px">
              给分:{{ item.highscoreRate }}☆
            </el-tag>
            <el-tag v-if="item.tags && item.tags!==''" size="small" style="margin-left: 20px;">
              {{ item.tags.substring(1, item.tags.length - 1) }}
            </el-tag>
            <el-tag type="info" size="small" style="margin-left: 20px">{{ item.type }}</el-tag>
            <el-tag v-if="item.createDate!=='---'" type="info" size="small"
                    style="margin-left: 20px; margin-right: 20px">{{ item.createDate.substring(0, 10) }}
            </el-tag>
            <el-tag v-if="item.createDate==='---'" type="info" size="small"
                    style="margin-left: 20px; margin-right: 20px">日期未知，注意时效
            </el-tag>
            <el-tag v-if="item.unlikes > 0" effect="plain" type="warning" size="small" style="margin-right: 20px">
              注意甄别×{{ item.unlikes }}
            </el-tag>
            <el-button style="margin-top: 5px" v-if="likeState[index] === ''" @click="likeClicked(index, item.id)"
                       size="mini"><i class="el-icon-thumb"></i>&nbsp;&nbsp;{{ item.likes }}
            </el-button>
            <el-button style="margin-top: 5px" type="primary" v-if="likeState[index] === 'clicked'"
                       @click="cancelLikeClicked(index, item.id)" size="mini"><i class="el-icon-thumb"></i>&nbsp;&nbsp;{{ item.likes }}
            </el-button>
            <el-button style="margin-top: 5px" @click="showReportDialog(item.id)" size="mini"><i
                class="el-icon-warning"></i></el-button>
            {{item.teacher}}
          </div>
        </li>
      </ul>
      <el-pagination
          style="margin-top: -20px; float: right;"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          :current-page.sync="currentPage"
          @current-change="page">
      </el-pagination>
    </div>
    <!-- 报告对话框 -->
    <el-dialog
        title="反馈"
        :visible.sync="dialogReportVisible"
        :width="dialog_width">
      <p>错误 | 举报，点击提交按钮进行反馈</p>
      <el-input
          type="textarea"
          v-model="feedbackReason"
          autosize placeholder="请简要描述"
          maxlength="100"
          show-word-limit>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogReportVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitFeedback()">提交</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script setup>
import {ref,reactive,onMounted} from "vue";
import {getComments, listAllCourses, listAllTeachers, searchComments} from "@/api/comments.js";
import {getCourseList, getTeacherList} from "@/api/rank.js";
import {ElMessage} from "element-plus";

const courseTypes=['','其他课程','思政课','体育课','数学通识课','英语通识课','美育','网课'];
const courses = ref([]); // 搜索框提示
const teachers = ref([]); // 搜索框提示
const allCourses = ref([2323]); // 暂存所有Course
const allTeachers = ref([2323]); // 暂存所有Teacher
const rankForCourse = ref([]); // 热搜榜
const rankForTeacher = ref([]); // 热搜榜

const searchForm = ref({
  type: '',
  course: '',
  teacher: '',
  page: 1,
  size: 10,
  sort: 0 // 排序方式 1:热度 0:时间
});

const dataList = ref([]);
const expandedItems = ref([false, false, false, false, false, false]);
const isExpanded = ref(false); // 文本折叠
const maxLength = ref(70);
const currentPage = ref(1);
const pageSize = ref(6);
const total = ref(0);
const likeState = ref(['', '', '', '', '', '']);
const selectSize = ref('medium');
const feedbackReason = ref('');
const dialog_width = ref('30%');
const dialogReportVisible = ref(false); // 控制举报对话框的显示隐藏
const currentItemId = ref(''); // 当前评论的id
// const num=ref(0);
// const size=ref(10);
/**
 *     shouldDisplayToggle(item) {
 *       return item && item.comment && item.comment.length > this.maxLength;
 *     },
 *         toggleText(index) {
 *       this.$set(this.expandedItems,index,!this.expandedItems[index]);
 *     },
 *       filters: {
 *     truncate(text, length) {
 *       return text.length > length ? text.slice(0, length) : text;
 *     },
 *   },
 */
const truncate = (text, length) => {
  return text.length > length ? text.slice(0, length) : text;
}
const shouldDisplayToggle = (item) => {
  return item && item.comment && item.comment.length > maxLength.value;
}
const toggleText = (index) => {
  expandedItems.value[index] = !expandedItems.value[index];
}
/**
 * 搜索框的数据
 */
const createFilter = (queryString) => {
  return (course) => {
    return (course.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}
const courseFocused = () => {
  if (courses.value.length === 0) {
    courses.value = allCourses.value;
  }
}
const teacherFocused = () => {
  if (teachers.value.length === 0) {
    teachers.value = allTeachers.value;
  }
}
const querySearchCourse = (queryString, cb) => {
  let courses = allCourses.value;
  let results = queryString ? courses.filter(createFilter(queryString)) : courses;
  cb(results);
}
const querySearchTeacher = (queryString, cb) => {
  let teachers = allTeachers.value;
  let results = queryString ? teachers.filter(createFilter(queryString)) : teachers;
  cb(results);
}
/**
 * @description 搜索
 */
const  submitSearch=async ()=>{
  searchForm.value.page=1;
  const res = await searchComments(searchForm.value);
  dataList.value=res.data.data.data;
  total.value=res.data.data.total;
  if(total.value===0){
    ElMessage.success("暂无数据，快来分享吧")
  }
  console.log("21212"+dataList.value[1])
}
/**
 * todo
 * 热搜的课程和老师
 */
const rankForCourseClicked = (item) => {
  searchForm.value.course = item;
  submitSearch();
}
/**
 * todo 不能用这个接口
 * 热搜的课程和老师
 */
const rankForTeacherClicked = (item) => {
  searchForm.value.teacher = item;
  submitSearch();
}
/**
 * 分页查询
 */
const page = (val) => {
  console.log(val);
  searchForm.value.page = val;
  getDataList();
}
/**
 * 最新   最热
 */
const latestSortClicked = () => {
  searchForm.value.sort = 0;
  getDataList();
}
const hotSortClicked = () => {
  searchForm.value.sort = 1;
  getDataList();
}
/**
 * 初始化
 */
onMounted(async () => {
  await getDataList();
  await SearchContext();
})
/**
 * 获取datalist
 */
const getDataList = async () => {
  const res=await getComments(searchForm.value);
  dataList.value=res.data.data.data;
  total.value=res.data.data.total;
  // console.log(dataList.value+"======== "+total.value);
}
/**
 * TODO可以优化
 *   展示课程和老师
 */
const SearchContext = async () => {
  const res1 = await getCourseList();
  rankForCourse.value = res1.data.data;
  const res2 = await getTeacherList();
  rankForTeacher.value = res2.data.data;
  const res3 = await listAllCourses();
  allCourses.value = res3.data.data;
  const res4 = await listAllTeachers();
  allTeachers.value = res4.data.data;

}
</script>

<style scoped>
.banner{
  width: 100%;
  height: 400px;
  display:flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/banner.jpg");
  background-size: cover!important;
  background-position: center;
}
.banner_text{
  background: rgba(18, 37, 18, .3);
  height: 400px;
  width: 100%;
}
.dataListBox{
  width: 60%;
  min-height: 800px;
  margin: 20px auto;
}
.dataList li{
  margin-left: -27px;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 25px;
  list-style: none;
  min-height: 180px;
  max-height: 330px;
  overflow:auto;
  zoom:1;
}
.el-tag{
  position: relative;
}
.dataList button{
  position: relative;
}
.dataList li p{
  font-size: 16px;
  margin-top: -1px;
  line-height: 22px;
  min-height: 30px;
}
.home-input {
  margin-left: 15px;
  z-index: 1;
}
@media (max-width: 768px) {
  /*.dataList li {*/
  /*  min-height: 220px;*/
  /*}*/
  /*.dataList li p{*/
  /*  min-height: 50px;*/
  /*}*/
  .dataListBox {
    width: 95%;
  }
  .el-input--small input {
    width: 135px;
  }
  .pre-txt {
    display: none;
  }
  .home-input {
    margin-left: 6px;
  }
  #search-btn button {
    margin-top: 10px;
  }
  .el-scrollbar {
    height: 200px;
  }
  .el-pager li {
    min-width: 20px !important;
  }
  .wrap-text {
    white-space: pre-line;/*用于显示文本换行*/
  }
}
</style>