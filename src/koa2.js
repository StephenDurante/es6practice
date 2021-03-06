const Koa = require(`koa`)
const app = new Koa()
const logger = require(`koa-logger`)

const tab = (num) => new Array(num).join(`&nbsp`)
const mid1 = () => {
  return async (ctx, next) => {
    ctx.body = `<h3> 请求 => 第一层中间件</h3>`
    await next()
    ctx.body += `<h3> 响应 <= 第一层中间件</h3>`
  }
}

const mid2 = () => {
  return async (ctx, next) => {
    ctx.body += `<h3>${ tab(4)} 请求 => 第二层中间件</h3>`
    await next()
    ctx.body += `<h3>${ tab(4)} 响应 <= 第二层中间件</h3>`
  }
}

const mid3 = () => {
  return async (ctx, next) => {
    ctx.body += `<h3>${ tab(8)} 请求 => 第三层中间件</h3>`
    await next()
    ctx.body += `<h3>${ tab(8)} 响应 <= 第三层中间件</h3>`
  }
}

app.use(logger())
app.use(mid1())
app.use(mid2())
app.use(mid3())

app.use(async (ctx, next) => {
  ctx.body += `<p style="color:red;">${tab(13)}koa 核心 处理业务</p>`
})

app.listen(2333)