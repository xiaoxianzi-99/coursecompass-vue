import axios from "@/axios.js";

export function courseListAll(){
    return axios.get("/course/listAll")
}