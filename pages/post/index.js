import { estruturaPost } from "../../scripts/domPost.js";
const post = JSON.parse(localStorage.getItem('newPost'))
estruturaPost(post[0])