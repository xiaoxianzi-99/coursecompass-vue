import axios from "@/axios.js";
const baseUrl = '/comments';

// 获取评论列表
export function getComments(searchForm) {
    console.log(searchForm);
    return axios.get(baseUrl + `/list/${searchForm.page}/${searchForm.size}/${searchForm.sort}`);
}

// 获取所有课程列表
export function listAllCourses() {
    return axios.get(baseUrl + `/listAllCourses`);
}

// 获取所有教师列表
export function listAllTeachers() {
    return axios.get(baseUrl + `/listAllTeachers`);
}

// 搜索评论
export function searchComments(commentsSearchRequest) {
    return axios.post(baseUrl + `/search`, commentsSearchRequest);
}

// 根据类型获取课程列表
export function listCoursesByType(type) {
    return axios.get(baseUrl + `/listCoursesByType/${type}`);
}

// 根据类型获取教师列表
export function listTeachersByType(type) {
    return axios.get(baseUrl + `/listTeachersByType/${type}`);
}

// 根据课程获取教师列表
export function listTeachersByCourse(course) {
    return axios.get(baseUrl + `/listTeachersByCourse/${course}`);
}

// 点赞功能
export function thumbComment(id) {
    return axios.put(baseUrl + `/thumb`, { id: id });
}

// 提交反馈
export function reportFeedback(feedbackRequest) {
    return axios.post(baseUrl + `/report`, feedbackRequest);
}

// 新增建议
export function saveComment(commentRequest) {
    return axios.post(baseUrl + `/save`, commentRequest);
}