// 中介者模式
console.log('------ 中介模式 引入调度中心 ------');

class Airplane {
  constructor(name){
    this.name = name;
    this.state = '飞行中'; // 飞行中，降落，在停机场，起飞（降落，起飞都需要使用到跑道）
    this.dispatchingCenter = null; // 接机者
  }

  setDispatchingCenter(dispatchingCenter){
    this.dispatchingCenter = dispatchingCenter;
    console.log(this.name, '接入', dispatchingCenter.name);
  }

  // 飞机状态 要起飞，或者降落
  apply(state){
    this.state = state;
    this.trigger(state);
  }
  // 通讯，即起飞或者降落，都要告知接机人员 和 指引人员，等待他们的就位，没有同时就位就不能下降
  trigger(message){
    console.log('------',this.name, '发出信息', message);
    this.dispatchingCenter.trigger(this, message);
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
    this.dispatchingCenter = null;
  }

  setDispatchingCenter(dispatchingCenter){
    this.dispatchingCenter = dispatchingCenter;
    console.log(this.name, '接入', dispatchingCenter.name);
  }

  // 状态 接机就位，等待命令
  apply(state){
    this.state = state;
    this.trigger(state);
  }
  // 通讯，告知 飞机 和 指引人员 已就位
  trigger(message){
    console.log('------',this.name, '发出信息', message);
    this.dispatchingCenter.trigger(this, message);
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
    this.dispatchingCenter = null;
  }

  setDispatchingCenter(dispatchingCenter){
    this.dispatchingCenter = dispatchingCenter;
    console.log(this.name, '接入', dispatchingCenter.name);
  }

  // 状态 接机就位，等待命令
  apply(state){
    this.state = state;
    this.trigger(state);
  }
  // 通讯，告知 飞机 和 接待人员 已就位
  trigger(message){
    console.log('------',this.name, '发出信息', message);
    this.dispatchingCenter.trigger(this, message);
  }
  // 获取来自某架飞机的信息
  getMessage(message){
    console.log(this.name, '收到信息：', message);
  }
}

// 调度中心 中介者
class DispatchingCenter {
  constructor(){
    this.name = '调度中心';
    this.unitList = []; // 需要通知的单位
  }

  addUnit(unit){
    this.unitList.push(unit);
    console.log(this.name, '接入', unit.name);
  }

  trigger(unit,msg){
    const message = unit.name + msg;
    this.getMessage(message);
    console.log('------',this.name, '发出信息', message);
    this.unitList.forEach(unitItem=>{
      if(unitItem.name !== unit.name){
        unitItem.getMessage(message);
      }
    })
  }

  getMessage(message){
    console.log('调度台收到信息:', message);
  }
}

const airplane = new Airplane('春秋1号飞机');
const receptionStaff = new ReceptionStaff('接机人员小红');
const guider = new Guider('指引人员张三');
const dispatchingCenter = new DispatchingCenter();

// 将三者分别与调度中心关联，形成形状结构
airplane.setDispatchingCenter(dispatchingCenter);
dispatchingCenter.addUnit(airplane);

receptionStaff.setDispatchingCenter(dispatchingCenter);
dispatchingCenter.addUnit(receptionStaff);

guider.setDispatchingCenter(dispatchingCenter);
dispatchingCenter.addUnit(guider);

console.log('------ 各方与调度中心接入完成，可进入工作状态 ------');

// 进入工作状态

// 飞机要降落
// 飞机发通知要降落
airplane.trigger('准备要降落了');
// 等待引导人员就位
guider.apply('就位')
// 引导人员就位，通知飞机和接待人员
guider.trigger('已就位');
// 等待接待人员就位
receptionStaff.apply('就位')
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