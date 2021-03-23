// 桥接模式

// 电机
class Motor {
  constructor(type) {
    this.motorType = type + '电机';
  }

  run() {
    console.log(this.motorType + '开始工作');
  }
}

// 滚筒
class Roller {
  constructor(type) {
    this.rollerType = type + '滚桶';
  }

  run() {
    console.log(this.rollerType + '开始工作');
  }
}

// 变频器
class Transducer {
  constructor(type){
    this.transducerType = type + '变频器';
  }

  run(){
    console.log(this.transducerType + '开始工作');
  }
}

// 组装洗衣机
class Washer {
  constructor(motorType, rollerType, transducerType){
    this.motor = new Motor(motorType);
    this.roller = new Roller(rollerType);
    this.transducer = new Transducer(transducerType);
  }

  //  开始工作
  work(){
    this.motor.run();
    this.roller.run();
    this.transducer.run();
  }
}

// 创建一台小功率直立滚筒洗衣机
const washerA = new Washer('小功率', '直立', '小功率');
washerA.work();
console.log(washerA);