<template>
  <div id="shareView" style="">
    <div style="margin-left: 50px;"><h3>创建词条</h3></div>
    <div style="margin-left: 50px; margin-bottom: 20px; font-size: 14px; color: #409eff"><p>
      邀请您写下自己的选课建议,帮助更多同学</p></div>
    <el-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item class="add-input" label="课程" prop="course">
        <el-autocomplete
            v-model="ruleForm.course"
            :fetch-suggestions="querySearchCourse"
            placeholder="请输入课程(尽量与提示一致)"
            @focus="addCourseFocused"
            @select="handleSelect"
            class="add-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item class="add-input" label="老师" prop="teacher">
        <el-input v-model="ruleForm.teacher" placeholder="请输入老师(可空)"></el-input>
      </el-form-item>
      <el-form-item class="add-input" label="建议" prop="comment">
        <el-input type="textarea"
                  :autosize="{ minRows: 5, maxRows: 10}"
                  maxlength="300"
                  placeholder="请输入内容,不超过300字"
                  v-model="ruleForm.comment">
        </el-input>
      </el-form-item>
      <el-form-item class="add-select" label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择">
          <el-option v-for="item in courseTypes"
                     :label="item"
                     :value="item"
                     :key="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="add-rate" label="评分">
        <!-- 难度评分 -->
        <div style="display: inline-flex; margin-right: 10px;">
          难度：
          <el-rate
              v-model="ruleForm.hard_rate"
              :texts="hardRateOptions"
              show-text
          >
          </el-rate>
        </div>
        <!-- 给分评分 -->
        <div style="display: inline-flex;">
          给分：
          <el-rate
              v-model="ruleForm.highscore_rate"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          >
          </el-rate>
        </div>
      </el-form-item>
      <el-form-item class="add-tags" label="标签">
        <el-checkbox-group v-model="ruleForm.tags">
          <el-checkbox v-for="tag in tagsOptions" :key="tag.value" :label="tag.value">{{ tag.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即分享</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue';
//提交表单
const submitForm = ()=>{
  //todo
}
const resetForm = () => {
  ruleForm.value = {};
}
// 定义状态
const courseOptions = ref([]); // 用于存放课程提示数据
const courseTypes = ref(['其他课程', '思政课', '体育课', '数学通识课', '英语通识课', '美育', '网课']);
const hardRateOptions = ref(['极水', '较水', '中等', '较难', '极难']);
// 标签选项
const tagsOptions = ref([
  {value: '专业', label: '专业'},
  {value: '负责', label: '负责'},
  {value: '亲和', label: '亲和'},
  {value: '严谨', label: '严谨'},
  {value: '幽默', label: '幽默'},
  {value: '刻板', label: '刻板'},
  {value: '枯燥', label: '枯燥'},
  {value: '张扬', label: '张扬'},
]);

const ruleForm = ref({
  type: '',
  course: '',
  teacher: '',
  comment: '',
  hard_rate: -1,
  highscore_rate: -1,
  tags: [],
});

const rules = reactive({
  type: [
    {required: true, message: '请选择类型', trigger: 'change'}
  ],
  course: [
    {required: true, message: '请输入课程', trigger: 'change'}
  ],
  comment: [
    {required: true, message: '请输入内容', trigger: 'change'}
  ]
});
</script>

<style scoped>
#shareView {
  width: 100%;
  height: 730px;
  margin-top: 10px;
}

.add-input {
  width: 600px;
}

.add-select {
  width: 400px;
}

.add-autocomplete {
  width: 500px;
}

@media (max-width: 768px) {
  .add-input,
  .add-input input {
    width: 240px;
  }

  .add-select,
  .add-select input {
    width: 240px;
  }

  .add-input textarea {
    width: 240px;
  }

  .add-autocomplete {
    width: 140px;
  }
}
</style>