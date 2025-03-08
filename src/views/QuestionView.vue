<template>
  <div id="questionView" style="text-align: center">
    <el-input style="margin-top:10px; width: 90%" placeholder="按提问内容搜索" v-model="searchForm.question">
      <el-button @click="submitSearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div><el-link @click="showFAQ" style="margin-top: 6px" type="primary">点击查看常见问题<i class="el-icon-view el-icon--right"></i> </el-link></div>
    <div style="text-align: left" class="question-list">
      <el-card v-for="(question, index) in questions" :key="question.id" class="question-card">
        <div slot="header" class="question-header">
          <span><b>提问</b></span>
          <span><el-button @click="showAnswerReply(question.id)" type="primary" icon="el-icon-edit">我要回答</el-button></span>
        </div>
        <div class="question-body">
          <p>{{ question.question }}</p>

          <div class="question-meta">
            <span>
              <el-button @click="likeClicked(index, question.id)" size="mini">
                         <i class="el-icon-thumb"></i>&nbsp;&nbsp;{{question.likes}}</el-button>
              <el-button @click="showAnswer(question.id)" size="mini">
                         <i class="el-icon-s-comment"></i>&nbsp;&nbsp;查看回答</el-button>
            </span>
            <span style="font-size: 14px; line-height: 25px;">{{ question.createDate.substring(0,10)}}</span>
          </div>
        </div>
      </el-card>
    </div>
    <el-pagination
        style="margin-top: 30px; float: right;"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="q_pageChange">
    </el-pagination>
    <!-- 回答列表窗口 -->
    <el-dialog title="查看回答" :visible.sync="answerDialogVisible" :width="dialog_width">
      <ul class="answer-list" style="overflow:auto">
        <li v-for="answer in answers">
          <p class="wrap-text">{{ answer.answer}}</p>
          <span style="font-size:14px; line-height:25px; color:#999; float:right;margin-top: 40px; margin-right:20px">
            {{ answer.createDate.substring(0,10)}}
          </span>
        </li>
      </ul>
    </el-dialog>
    <!-- 提问窗口 -->
    <el-dialog title="提问" :visible.sync="askDialogVisible" :width="dialog_width">
      <el-input
          type="textarea"
          v-model="newQuesForm.question"
          autosize placeholder="请简要描述问题"
          maxlength="50"
          show-word-limit>
      </el-input>
      <el-tooltip class="item" effect="dark" content="仅用于收到回答时发送消息提醒" placement="bottom">
        <el-input type="textarea" style="margin-top: 10px;" :rows="1" v-model="newQuesForm.email" placeholder="选填电子邮箱"></el-input>
      </el-tooltip>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="askDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitQuestion()">提交</el-button>
      </span>
    </el-dialog>
    <!-- 回答窗口 -->
    <el-dialog title="答疑" :visible.sync="ansDialogVisible" :width="dialog_width">
      <el-input
          type="textarea"
          v-model="answerReply.answer"
          :rows="5"
          autosize placeholder="请输入内容"
          maxlength="200"
          show-word-limit>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="ansDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitAnswer()">提交</el-button>
      </span>
    </el-dialog>
    <!-- FAQ列表窗口 -->
    <el-dialog class="FAQ-dialog" title="常见问题" :visible.sync="faqDialogVisible" :width="dialog_width">
      <FAQ></FAQ>
    </el-dialog>
    <!-- 悬浮提问按钮 -->
    <div class="el-backtop" @click="showAsk">
      <i class="el-icon-plus"></i>
    </div>

    <!-- 畅言评论 -->
    <div id="SOHUCS" sid="about"></div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 定义状态
const questions = ref([]); // 存放问题列表
const answers = ref([]); // 存放答案列表
const total = ref(0); // 总条数
const currentPage = ref(1); // 当前页码
const pageSize = ref(4); // 每页显示条数
const answerDialogVisible = ref(false); // 控制回答对话框显示/隐藏
const answerCount = ref(0); // 回答计数
const dialog_width = ref('50%'); // 对话框宽度
const askDialogVisible = ref(false); // 控制提问对话框显示/隐藏
const newQuesForm = reactive({
  question: '', // 新问题内容
  email: '' // 提问者邮箱
});
const ansDialogVisible = ref(false); // 控制答案对话框显示/隐藏
const faqDialogVisible = ref(false); // 控制FAQ对话框显示/隐藏
const answerReply = reactive({
  q_id: '', // 回答对应的问题ID
  answer: '' // 回答内容
});
const searchForm = reactive({
  question: '', // 搜索关键词
  page: 1, // 当前页码
  size: 4, // 每页显示条数
});
</script>

<style scoped>
#questionView {
}
.question-list {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.question-card {
  margin-left: 20px;
  margin-top: 20px;
  width: 45%;
}
.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}
.question-body p {
  height: 100px;
  line-height: 25px;
}
.question-meta {
  color: #999;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.answer-list {
  min-height: 300px;
  max-height: 400px;
}
.answer-list li {
  margin-top: 8px;
  margin-left: -30px;
  border-bottom: 1px solid #f0f0f0;
  list-style: none;
  min-height: 120px;
  zoom:1;
  overflow: auto;
}
.el-dialog p {
  text-align: left;
}
.wrap-text {
  white-space: pre-line;/*用于显示文本换行*/
}
.el-backtop{
  bottom: 200px;
  right: 40px;
  background-color: #ecf8ff;
}
.el-dialog__body {
  padding: 0 20px 30px 20px !important;
}

@media (max-width: 768px) {
  .question-card {
    margin-left: 0;
    width: 90%;
  }
}
</style>