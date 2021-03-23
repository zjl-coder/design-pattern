// 备忘录模式

// 定义备忘录和它的状态属性 （相当于定义一张纸，这张纸上面只能记录哪些信息）
class Memento {
  constructor(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

// 发起者，通过这个类 设置想要备忘的信息，然后通过这个类获取一个备忘录（用设置的信息初始化备忘录）
// 下次想要还原的时候，通过这个类，传入一个备忘录，还原出备忘信息。
class Originator {
  constructor() { }

  // 设置要备忘的信息
  setState(state) {
    this.state = state;
  }

  // 获取备忘录的信息
  getState() {
    return this.state;
  }

  // 保存进备忘录，并将备忘录返回。（相当于写在一张纸上）
  saveStateToMemento() {
    return new Memento(this.state);
  }

  // 从备忘录中将文档初始化出来
  getStateFromMemento(memento) {
    this.state = memento.getState();
  }
}

// 守护者 用来存放 每一个备忘录的地方 存档的地方（相当于书架）
class CareTaker {
  constructor() {
    // 每一个备忘录存放的列表
    this.mementoList = [];
  }

  // 获取所有的备忘录
  getList() {
    return this.mementoList;
  }

  // 将备忘录添加进来
  add(state) {
    this.mementoList.push(state);
  }

  // 获取一个备忘录
  get(index) {
    return this.mementoList[index];
  }
}

// 发起者，准备记录
const originator = new Originator();
// 守护者，准备放置文档
const careTaker = new CareTaker();

originator.setState("State #1"); // 想要存状态1
originator.setState("State #2"); // 想要存状态2，此时状态1没有记录进备忘录，所以被覆盖
careTaker.add(originator.saveStateToMemento()); // 将状态2存入备忘录并且放到守护者那里
originator.setState("State #3");
careTaker.add(originator.saveStateToMemento());
originator.setState("State #4"); // 想要存下状态4，设置好了，但是却忘记记录进备忘录，所以此时无效
console.log("Current State: " + originator.getState());
originator.getStateFromMemento(careTaker.get(0)); // 获取第一个备忘录
console.log("First saved State: " + originator.getState());
originator.getStateFromMemento(careTaker.get(1));
console.log("Second saved State: " + originator.getState());

console.log(careTaker.getList()); // 查看所有备忘录