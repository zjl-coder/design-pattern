// 无中介模式，每个类都需要维护其他所有的类
console.log('------ 无中介模式 ------');
// 如飞机的降落需要通知其他飞机 接机人员 指引人员
// 接机人员 指引人员 分别同时就位时，飞机才能真正的降落

class Airplane {
  constructor(name){
    this.name = name;
    this.state = '飞行中'; // 飞行中，降落，在停机场，起飞（降落，起飞都需要使用到跑道）
    this.receptionStaff = null; // 接机者
    this.guider = null; // 指引者
  }

  setReceptionStaff(receptionStaff){
    console.log(this.name, '接入', receptionStaff.name);
    this.receptionStaff = receptionStaff;
  }

  setGuider(guider){
    console.log(this.name, '接入', guider.name);
    this.guider = guider;
  }

  // 飞机状态 要起飞，或者降落
  apply(state){
    this.state = state;
    this.trigger(state);
  }
  // 通讯，即起飞或者降落，都要告知接机人员 和 指引人员，等待他们的就位，没有同时就位就不能下降
  trigger(message){
    console.log('------',this.name, '发出信息', message);
    const msg = this.name + message;
    this.receptionStaff.getMessage(msg);
    this.guider.getMessage(msg);
  }
  // 接收信息
  getMessage(message){
    console.log(this.name, '收到信息：', message);
  }
}

// 接机人员，站在登机口服务的人员
class ReceptionStaff {
  constructor(name){
    this.name = name;
    this.state = '等待命令';
    this.airplane = null;
    this.guider = null;
  }

  setAirplane(airplane){
    this.airplane = airplane;
    console.log(this.name, '接入', airplane.name);
  }

  setGuider(guider){
    this.guider = guider;
    console.log(this.name, '接入', guider.name);
  }

  // 状态 接机就位，等待命令
  apply(state){
    this.state = state;
    this.trigger(state);
  }
  // 通讯，告知 飞机 和 指引人员 已就位
  trigger(message){
    console.log('------',this.name, '发出信息', message);
    const msg = this.name + message;
    this.airplane.getMessage(msg);
    this,guider.getMessage(msg);
  }
  // 获取信息
  getMessage(message){
    console.log(this.name, '收到信息：', message);
  }
}

// 指引者，指引飞机降落的过程
class Guider {
  constructor(name){
    this.name = name;
    this.state = '等待命令';
    this.airplane = null;
    this.receptionStaff = null; // 接机者
  }

  setAirplane(airplane){
    this.airplane = airplane;
    console.log(this.name, '接入', airplane.name);
  }

  setReceptionStaff(receptionStaff){
    this.receptionStaff = receptionStaff;
    console.log(this.name, '接入', receptionStaff.name);
  }

  // 状态 接机就位，等待命令
  apply(state){
    this.state = state;
    this.trigger(state);
  }
  // 通讯，告知 飞机 和 接待人员 已就位
  trigger( message){
    console.log('------',this.name, '发出信息', message);
    const msg = this.name + message;
    this.airplane.getMessage(msg);
    this.receptionStaff.getMessage(msg);
  }
  // 获取来自某架飞机的信息
  getMessage(message){
    console.log(this.name, '收到信息：', message);
  }
}

const airplane = new Airplane('春秋1号飞机');
const receptionStaff = new ReceptionStaff('接机人员小红');
const guider = new Guider('指引人员张三');

// 将三者互相关联起来，因为三者之间互相引用，形成了互相调用个的网状结构
airplane.setGuider(guider);
airplane.setReceptionStaff(receptionStaff);
receptionStaff.setAirplane(airplane);
receptionStaff.setGuider(guider);
guider.setAirplane(airplane);
guider.setReceptionStaff(receptionStaff);

console.log('------ 各方通信接入完成，可进入工作状态 ------');

// 进入工作状态

// 飞机要降落
// 飞机发通知要降落
airplane.trigger('准备要降落了');
// 等待引导人员就位
guider.apply('就位');
// 引导人员就位，通知飞机和接待人员
guider.trigger('已就位');
// 等待接待人员就位
receptionStaff.apply('就位');
// 接待人员就位，通知飞机和引导人员
receptionStaff.trigger('已就位');
// 飞机收到信息，进行降落
airplane.apply('降落');
// 飞机降落完成，进入停机场
airplane.apply('进入停机场');
// 指引完成，回去等待下一个命令
guider.apply('等待命令');
// 接待完成，回去等待下一个命令
receptionStaff.apply('等待命令');


