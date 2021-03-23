// new KVue({data:{...}})

class KVue {
  constructor(options) {
    this.$options = options;

    //数据响应化
    this.$data = options.data;

    this.observe(this.$data);

    // 模拟一个watcher
    new Watcher(); // 此时 Dep.target 已经指向一个watcher实例了
    this.$data.test; // 读取一下值，执行get(), 将watcher添加进行dep,以后test发生变化时，set将执行
    this.$data.test;

    new Watcher(); 
    this.$data.foo.bar;
  }

  observe(value) {
    if(!value || typeof value !== 'object') return;

    // 遍历该对象，对每个key定义set get
    Object.keys(value).forEach(key=>{
      this.defineReactive(value, key, value[key]);
    })
  }

  // 数据响应化
  defineReactive(obj, key, val) {
    this.observe(val);

    // 一个key对应一个dep， 有多少个 key 就有多少个对应的dep，每个dep里面有可能会有多个 watcher
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get(){
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal){
        if(newVal === val){
          return;
        }
        val = newVal;
        // 当数据发生变化的时候，找到需要更新的地方，通知它更新
        // dep中的watcher已经收集过了，只等待有通知就通知执行
        dep.notify();
      }
    })
  }
}

// Dep: 用来管理Watcher
class Dep {
  constructor() {
    // 这里存放若干依赖（watcher）
    // 一个watcher对应一个属性（vue.$data的属性）
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  // 通知方法，通知所有watcher
  notify() {
    this.deps.forEach(dep=>dep.update())
  }
}

class Watcher {
  constructor() {
    // 将当期watcher实例指定到Dep静态属性target
    Dep.target = this;
  }

  update() {
    console.log("属性更新了");
  }
}