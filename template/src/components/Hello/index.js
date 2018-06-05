import index from "./index.vue";

console.log("我是Hello")
console.log(index)
index.beforeDestroy=()=>{
    console.log("我将要被销毁了")
}

export default index;