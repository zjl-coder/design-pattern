class Lemon {
  taste = '酸';
  name = '柠檬';
  constructor() { }

  getName() {
    return this.name;
  }

  getTaste() {
    return this.taste;
  }
}

class Apple {
  taste = '甜';
  name = '苹果';
  constructor() { }

  getName() {
    return this.name;
  }

  getTaste() {
    return this.taste;
  }
}

class Factory {
  constructor() {
    console.log('我是水果工厂');
  }

  // 生产水果方法 ， 告诉工厂要什么水果
  createFruits(fruits) {
    console.log('接到水果生产通知：', fruits);
    if (fruits === 'apple') {
      this.fruits = new Apple();
    }
    else if(fruits === 'lemon'){
      this.fruits = new Lemon();
    } else {
      // 如果不告诉要什么什么水果，则默认生产苹果
      this.fruits = new Apple();
    }
    return this.fruits;
  }
}

const factory = new Factory();
const apple = factory.createFruits('apple'); // 此时不需要通过  new Apple() 创造苹果对象
console.log(apple.getName(), apple.getTaste());
const lemon = factory.createFruits('lemon');
console.log(lemon.getName(), lemon.getTaste());