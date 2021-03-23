// 轮胎工厂，生产各种各样的轮胎
class Tyre {
  size; // 轮胎大小
  constructor() { }

  getSize() {
    return this.tyreSize;
  }
  setSize(size) {
    this.size = size;
  }
}

// 引擎工厂，生产各种各样的引擎
class Engine {
  type; // 引擎类型
  constructor() { }

  getEngine() {
    return this.type;
  }
  setEngine(type) {
    this.type = type;
  }
}

// 汽车组装工人 (建造者)
class CarBuilder {
  constructor(color) {
    // 工人自己会喷漆
    this.color = color;
  }

  /**
   * 
   * @param {*} size 接收来自指挥者（老板）要的轮胎的大小
   */
  buildTyre(size) {
    // 轮胎
    const tyre = new Tyre();
    switch (size) {
      case 's':
        tyre.setSize('小号轮胎');
        break;
      case 'm':
        tyre.setSize('中号轮胎');
        break;
      default:
        tyre.setSize('大号轮胎');
    }
    this.tyre = tyre;
    return this;
  }

  /**
   * 
   * @param {*} type 接收来自指挥者（老板）要的发动机的类型
   */
  buildEngine(type) {
    const engine = new Engine();
    if (type === '增压') {
      engine.setEngine('涡轮增压发动机 T');
    } else {
      engine.setEngine('自然吸气发动机 L');
    }
    this.engine = engine;
    return this;
  }
}

// 奔驰 （指挥者，老板）这个指挥者有时候是个类（被封装起来）有时候自己直接充当指挥者，从而不需要创建一个指挥类。
class BenChiDirector {
  constructor(color){
    // 找来建造者
    const car = new CarBuilder(color);
    car.buildTyre('s');
    car.buildEngine('增压');
    // 修改构造函数的返回对象
    return car;
  }
}

// 我现在要去奔驰买一辆小车(奔驰本身是指挥者，但是对于消费者来说可以理解成工厂，反正能很简单的得到车辆，可选择的不会太多)
const benchi = new BenChiDirector('白色');
console.log(benchi);

// 弱化指挥者角色，我自己直接充当指挥者（自己招人来做车，自己想配什么配件就配什么，只要功能有这个技能就可以）
console.log('我自己充当指挥者，我去找来一个汽车组装工生产车,不通过奔驰厂');
// 链式操作
const car = new CarBuilder('红色').buildTyre('m').buildEngine('自吸');
console.log(car);
// 让工人修改汽车引擎
// car.buildEngine('增压');