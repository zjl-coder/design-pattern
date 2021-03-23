// 访问者模式

// 用户抽象类
class User {
  constructor(name) {
    this.name = name;
  }

  read() {
    console.log(this.name + "正在阅读图纸");
  }
}

// 前端开发
class Weber extends User {
  constructor(name) {
    super(name);
  }
}

// 项目经理
class Manager extends User {
  constructor(name) {
    super(name);
  }
}

// 设计稿
class Designs {
  managerRead = {
    beginTime: '2021-01-01',
    endTime: '2022-01-01',
    functions: '用户登录，验证码',
    developmentTime: '2021-01-05~2020-06-30',
    testTime: '2020-07-01~2020-12-01'
  }

  webRead = {
    functions: '用户登录页面开发',
    difficulty: 'html + js + css'
  }

  noRead = {
    message: '什么都读不出来'
  }

  constructor() {
    this.user = null;
  }

  setReader(user){
    this.user = user;
  }

  // 设计稿的反馈信息
  feedback() {
    if(!this.user){
      console.log('没有读者');
      return {};
    }
    this.user.read();
    if(this.user.name === '前端开发'){
      return this.webRead;
    } else if(this.user.name === '项目经理') {
      return this.managerRead;
    } else if(this.user.name === '设计人员'){
      return {
        ...this.webRead,
        ...this.managerRead,
      }
    } else {
      return this.noRead;
    }
  }

  update() {
    if(this.user.name === '设计人员'){
      return "我是设计人员，我可以修改设计稿数据";
    } else {
      return "你没有对设计稿修改的能力";
    }
  }
}

// 前端开发
const weber = new Weber('前端开发');
const manager = new Manager('项目经理');
const hacker = new Weber('骇客');
const designer = new Weber('设计人员');
// 出设计稿
const designs = new Designs();
console.log(designs.feedback());
console.log('------ 同一张设计稿，不同的人读取 信息不同 ------');
designs.setReader(weber);
console.log(designs.feedback());
console.log(designs.update());

designs.setReader(manager);
console.log(designs.feedback());
console.log(designs.update());

designs.setReader(hacker);
console.log(designs.feedback());
console.log(designs.update());

designs.setReader(designer);
console.log(designs.feedback());
console.log(designs.update());