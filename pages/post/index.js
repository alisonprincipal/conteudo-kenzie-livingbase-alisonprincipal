import { estruturaPost } from "../../scripts/domPost.js";
function postStorage(){
const post = JSON.parse(localStorage.getItem('newPost'))
estruturaPost(post[0])
}postStorage()