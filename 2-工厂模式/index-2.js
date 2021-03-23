// 优化的工厂模式

// 创建一个水果父类 （这不是一个工厂方法必须的，仅仅作为写各种水果时进行代码复用而已）
class Fruits {
  getName() {
    return this.name;
  }

  getTaste() {
    return this.taste;
  }
}

class Lemon extends Fruits {
  taste = '酸';
  name = '柠檬';
  constructor() {
    super();
  }
}

class Apple extends Fruits {
  taste = '甜';
  name = '苹果';
  constructor() {
    super();
  }
}

// 将工厂的creat方法里面所能生产的水果对象放到一个对象里面，
// 从而可以做到当有新的水果品种时，只需要修改这个对象，而不需要修改工厂方法
const FruitsType = {
  apple: Apple,
  lemon: Lemon,
}

class Factory {
  constructor() {
    console.log('我是水果工厂');
  }

  // 生产水果方法 ， 告诉工厂要什么水果
  createFruits(fruits) {
    console.log('接到水果生产通知：', fruits);
    this.fruits = new FruitsType[fruits];
    return this.fruits;
  }
}

const factory = new Factory();
const apple = factory.createFruits('apple'); // 此时不需要通过  new Apple() 创造苹果对象
console.log(apple.getName(), apple.getTaste());
const lemon = factory.createFruits('lemon');
console.log(lemon.getName(), lemon.getTaste());

// 此时有了生产西瓜的能力

class Watermelon extends Fruits {
  taste = '甜';
  name = '西瓜';
}

// 新增工厂能生产水果种类的清单，从而可以接受生产西瓜的订单通知
FruitsType.watermelon = Watermelon;
console.log('通知：新增了生产西瓜的能力');

const watermelon = factory.createFruits('watermelon');
console.log(watermelon.getName(), watermelon.getTaste());