//vue.js

// 1、插值：mustache语法：{{data}}
// 2、v-bind:语法：绑定动态属性，语法糖：
// 3、计算属性：compute，函数，有缓存，当计算的值改变刷新缓存，有getter和setter
// 4、methods：方法
// 5、用let代替var，杜绝var（全局变量污染）
// 6、能用const不用let
// 7、v-on:绑定事件，语法糖@
// 8、v-if,v-else，判断是否加载dom
// 9、v-showe,判断是否展示（display属性）
// 10、遍历v-for="items in list"，加key可以防止重用虚拟dom
// 11、数组索引复制非响应式
// 12、高阶函数filter（过滤），map（改变原来的元素），reduce（累加）
// 13、v-model，绑定data和input
// 14、组件化，data为什么必须是函数？如果不是函数，多个组件实例会共享一份data
// 15、父子通信，父传子：props，子传父：自定义事件，用$emit("eventname",params)
// 16、whatch：监听属性改变
// 17、父访问子，$children,$refs，子访问父,$parent,访问根组件$root
// 18、solt,插槽，具名插槽加name
// 19、导入导出，export和import，懒加载
// 20、vue实例，template会替换el元素的dom
// 21、runtime-only和runtime-compiler相比，更小，少了对template转化为抽象语法树的过程，直接返回render函数
// 22、hash和history，不进行请求，只改变url，前端路由的实现，改为history，路由，mode:history
// 23、路由跳转，vue页面：router-link标签，代码:this.$router.push()
// 24、路由传参,:to={path='',query:{param1:v1}},取参：$route.query.prop
// 25、导航守卫(全局守卫)：
//前置钩子（hook）
// router.beforeEach((to, from, next) => {
// 	//从from跳转到to
// 	document.title = to.mathed[0].meta.title
// 	//执行跳转
// 	next()
// })
// //后置钩子
// router.afterEach((to, from) => {

// })
// 26、元数据（描述数据的数据），mate，用来放一些自定义的属性
// 27、keep-alive组件，vue内置组件，可以缓存组件，避免重复渲染，
// 用法，直接使用keep-alive标签，用完可以在组件中使用activated和deactivated回调，
// 属性，exclude，排除，include，包含，默认全缓存
// 28、style标签中引用css文件，使用@import 'url'
// 29、常用tabbar高度，49px，背景，#f6f6f6/#dadada
// 30、常用图标，阿里巴巴矢量图标库 https://www.iconfont.cn/
// 31、vuex，用来保存公共的数据，多组件，响应式共享数据，最好用单例
// state保存属性
// mutations：方法，用$store.commit('methodname',params)，最好名称使用常量，
// 	必须是同步的
// getters：相当于计算属性，有缓存
// 特殊提交封装-多个参数，传递
// $store.commit({
// 	type:"methodname",
// 	paramkey:value
// })
// actions:可以使用异步操作，在actions中调用mutations的方法
// 用$store.dispatch('actionname',params)调用
// modules:可以分模块
// modules:{
// 	modulea:{
// 		state:{

// 		},
// 		mutations:{

// 		}...
// 	},
// 	moduleb:{

// 	}
// }

// 推荐用法
// const module1={
// 	state:{

// 	}
// }

// modules:{
// 	module1:module1,
// }
// 32、对象解构，
// const obj={
// 	prop1='v1',
// 	prop2='v2',
// 	prop3='v3',
// }
// const {prop1,prop2,prop3}=obj;
// 33、store目录结构
// --store
//   |--index.js			# 组装模块并导出store
//   |--actions.js			# 根级别的action
//   |--mutations.js		# 根级别的mutation
//   |--modules			# 模块
//      |--cart.js			# 购物车模块
//      |--products.js		# 产品模块
// 34、axios  --npm install axios --save
// 多种请求方式
// axios(config)
// axios.request(config)
// axios.get(url[,config])
// axios.delete(url[,config])
// axios.head(url[,config])
// axios.post(url[,data[,config]])
// axios.put(url[,data[,config]])
// axios.patch(url[,data[,config]])

// axios({
// 	url:'',
// 	method:'get'，最好名称使用常量
// 	params:{

// 	}
// })
// .then(res=>{
// 	//成功回调
// 	console.log(res)
// })

// 35、并发发送
// axios.all([axios(),axios()]).then(results=>{
// 	//返回数组

// })
// 也可以分别获取多个res
// .then(axios.spread((res1,res2)=>{

// }))
// //or数组解构
// let [res1,res2]=res;
// 36、axios全局配置
// 后台api地址，超时时间
// axios.defaults.baseURL="http://host:port/"
// axios.defaults.timeout=5000

// 常见配置选项
// method,url,baseURL,
// //请求前数据处理
// transfromRequest:function(data){},
// //请求后的数据处理
// transformResponse:function(data){},
// headers:{'':''}
// params
// //参数序列化函数
// paramsSerializer:function(params){}
// reguest body
// timeout
// //跨域是否带token
// withCredentials:false
// //自定义请求处理
// adapter:function(resolve,reject,config){}
// //身份验证信息
// auth:{username:'',pod:''}
// //响应的数据格式json/blob/document/arraybuffer/test/stream
// responseType:'json'
// 36、创建axios实例--分模块请求/不同默认配置
// const instance1=axios.create({
// 	baseURL='',
// 	timeout=5000
// })

// instance1({
// 	url:''
// }).then(res=>{

// })
// 37、封装request模块
// export const request1=config=>{
// 	return instance1(config)
// }
// //调用
// request1({
// 	url:''
// })
// .then(res=>{
// 	//成功回调
// })
// .catch(err=>{
// 	//失败回调
// })
// 38、拦截器
// //请求拦截
// axios.interceptors.request.use(config=>{
// 	//拦截到的是请求配置
// 	//可以添加请求头，或者显示请求状态，携带token
// 	return config//返回config才能继续请求
// },err=>{
// 	//发送失败的回调
// })
// //响应拦截
// axios.interceptors.response.use(res=>{
// 	return res.data//返回结果
// },err=>{

// })