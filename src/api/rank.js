import axios from "@/axios.js";
//    axios.get(this.$baseUrl+'/rank/getCourseList').then(function (resp) {
//       _this.rankForCourse = resp.data.data
//     })
//     axios.get(this.$baseUrl+'/rank/getTeacherList').then(function (resp) {
//       _this.rankForTeacher = resp.data.data
//     })
const baseUrl = '/rank'
export function getCourseList(){
    return axios.get(baseUrl+'/getCourseList')
}
export function getTeacherList(){
    return axios.get(baseUrl+'/getTeacherList')
}