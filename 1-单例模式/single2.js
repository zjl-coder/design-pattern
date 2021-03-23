
// 使用 静态方法创建，不需要创建静态属性
class Single2 {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  // 创建静态方法 代替直接 new 获取对象
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Single2(name);
    }

    return this.instance;
  }
}

console.log('------- 使用 静态方法创建 -------');
const s3 = Single2.getInstance('张三');
console.log(s3.getName());
const s4 = Single2.getInstance('李四');
console.log(s4.getName());
console.log('s3 === s4', s3 === s4);