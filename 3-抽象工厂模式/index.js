// 抽象工厂模式，工厂模式的升级版，将工厂类抽象出来

// 水果类
class Fruits {
  name;
  taste;
  constructor() {
    if (new.target === Fruits) throw new Error('水果抽象类不能直接实例化!')
  }

  // 水果名
  getName() {
    return this.name;
  }

  // 味道
  getTaste() {
    return this.taste;
  }
}

// 柠檬有两个品种
class LemonA extends Fruits {
  taste = '酸';
  name = '柠檬A';
  constructor() {
    super();
  }
}

class LemonB extends Fruits {
  taste = '酸甜';
  name = '柠檬B';
  constructor() {
    super();
  }
}

class AppleA extends Fruits {
  taste = '甜';
  name = '苹果A';
  constructor() {
    super();
  }
}

class AppleB extends Fruits {
  taste = '酸涩';
  name = '苹果B';
  constructor() {
    super();
  }
}

// 抽象 工厂类 只提供接口声明
class Factory {
  constructor() {
    if (new.target === Fruits) throw new Error('工厂抽象类不能直接实例化!')
  }

  createFruits() {
    throw new Error('抽象方法不能调用!');
  }
}

// A品种水果种类菜单
const FruitsTypeA = {
  apple: AppleA,
  lemon: LemonA,
}

// 工厂类A
class FactoryA extends Factory {
  constructor() {
    super();
  }

  // 生产水果方法 ， 告诉工厂A要什么水果
  createFruits(fruits) {
    console.log('工厂A接到水果生产通知：', fruits);
    this.fruits = new FruitsTypeA[fruits];
    return this.fruits;
  }
}

// A品种水果种类菜单
const FruitsTypeB = {
  apple: AppleB,
  lemon: LemonB,
}

// 工厂类B
class FactoryB extends Factory {
  constructor() {
    super();
  }

  // 生产水果方法 ， 告诉工厂B要什么水果
  createFruits(fruits) {
    console.log('工厂B接到水果生产通知：', fruits);
    this.fruits = new FruitsTypeB[fruits];
    return this.fruits;
  }
}

console.log('我是工厂A，我能生产水果, 但是我生产A品种');
const factoryA = new FactoryA();
const appleA = factoryA.createFruits('apple');
const lemonA = factoryA.createFruits('lemon');
console.log(appleA.getName(), appleA.getTaste());
console.log(lemonA.getName(), lemonA.getTaste());

console.log('我是工厂B，我也能生产水果, 但是我生产B品种');
const factoryB = new FactoryB();
const appleB = factoryB.createFruits('apple');
const lemonB = factoryB.createFruits('lemon');
console.log(appleB.getName(), appleB.getTaste());
console.log(lemonB.getName(), lemonB.getTaste());