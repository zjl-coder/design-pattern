// 定义KVue的构造函数
class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    console.log(this.$options);

    // 传入data
    this.$data = options.data

    // 响应化处理
    this.observe(this.$data)

    // 测试代码
    // new Watcher(this, 'foo')
    // this.foo
    // new Watcher(this, 'foo.bar.mua')
    // this.bar.mua

    // 测试编译器
    new Compile(options.el, this)

    if(options.created) {
      options.created.call(this)
    }
  }

  observe(value) {
    // 如果value不存在，或者value不是对象，就直接return
    // 这里不对数组进行处理
    if (!value || Object.prototype.toString.call(value) !== '[object Object]') {
      return
    }
    // 遍历value
    Object.keys(value).forEach(key => {
      // 响应式处理
      this.defineReactive(value, key, value[key])
      // 代理data中的属性到vue根上
      this.proxyData(key)
    })
  }

  defineReactive(obj, key, val) { // 这里实质上就是一个闭包，内部的get和set一直使用的是这里的val
    this.observe(val) // 如果是对象的话，进一步递归

    // 定义了一个Dep
    const dep = new Dep() // 每个dep实例和data中每个key有一对一关系

    // 给obj的每一个key定义拦截
    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal
          // console.log(key + '属性更新了')
          dep.notify() // 通知
        }
      }
    })
  }

  // 在vue根上定义属性代理data中的数据
  proxyData(key) {
    // this指的是KVue的实例
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}

// 创建Dep：管理所有的Watcher（发布--订阅模式） 订阅收集中心
class Dep {
  constructor() {
    // 存储所有依赖
    this.watchers = []
  }
  addDep(watcher) {
    this.watchers.push(watcher)
  }
  notify() {
    this.watchers.forEach(watcher => watcher.update())
  }
}

// 创建Watcher：保存data中数值和页面中的挂钩关系 订阅者
class Watcher {
  constructor(vm, key, cb) { // 某个组件中的某个key
    // 创建实例时立刻将该实例指向Dep.target，便于依赖收集
    Dep.target = this
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this
    this.vm[this.key] // 读一下，触发依赖收集
    Dep.target = null
  }
  // 更新
  update() {
    // console.log(this.key + '更新了！！！')
    this.cb.call(this.vm, this.vm[this.key])
  }
}