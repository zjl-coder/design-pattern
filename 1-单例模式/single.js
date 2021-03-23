// 使用 new 方式创建
class Single {
  static sin; // 创建一个静态属性

  constructor(name, age) {
    if (!Single.sin) {
      // 判断静态属性
      this.name = name;
      this.age = age;
      Single.sin = this;
    }
    return Single.sin; // 覆盖构造函数的默认返回对象
  }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}

console.log('------- 使用 new 方式创建 -------');
const s1 = new Single('张三', 10);
console.log(s1.getName(), s1.getAge());
const s2 = new Single('李四', 20);
console.log(s2.getName(), s2.getAge());
console.log('s1 === s2', s1 === s2);