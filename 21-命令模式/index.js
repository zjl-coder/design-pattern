// 命令模式

// 电灯类
class Light{
  constructor(name){
    this.name = name;
  }
  on(){
    console.log('打开',this.name)
  }
  off(){
    console.log('关掉',this.name)
  }
}

// 热水器
class Heater{
 constructor(name){
   this.name = name;
 }
 on(){
   console.log(this.name,'开始热水')
 }
 off(){
   console.log('关掉',this.name)
 }
}

// 空调
class AirConditioner{
  constructor(name){
    this.name = name;
  }
  on(){
    console.log(this.name,'开始制冷')
  }
  off(){
    console.log('关掉',this.name)
  }
}

// 电视
class Television{
  constructor(name){
    this.name = name;
  }
  on(){
    console.log(this.name,'打开')
  }
  off(){
    console.log('关掉',this.name)
  }
}

// 指令类
class Command {
  constructor(){ }

  execute(command){
    console.log('开始执行指令:',command)
  }
}

// 控制电灯的指令
class LightCommand extends Command{
  constructor(name){
    super();
    this.name = name;
    // 将控制电灯的指令抽离出来独立成类，为了这个指令能准确控制电灯，需要在内部初始化电灯类
    this.light = new Light(name);
  }

  // 这个本来是在电灯类里面的，被独立出来了
  execute(command){
    if(command === 'on'){
      this.light.on();
    }
    else if(command === 'off'){
      this.light.off();
    }
  }
}

// 控制热水器的指令类
class HeaterCommand extends Command{
  constructor(name){
    super();
    this.name = name;
    this.heater = new Heater(name);
  }

  // 这个本来是在热水器类里面的，被独立出来了
  execute(command){
    if(command === 'on'){
      this.heater.on();
    }
    else if(command === 'off'){
      this.heater.off();
    }
  }
}

// 控制空调的指令类
class AirConditionerCommand extends Command{
  constructor(name){
    super();
    this.name = name;
    this.airConditioner = new AirConditioner(name);
  }

  execute(command){
    if(command === 'on'){
      this.airConditioner.on();
    }
    else if(command === 'off'){
      this.airConditioner.off();
    }
  }
}

// 控制电视的指令类
class TelevisionCommand extends Command{
  constructor(name){
    super();
    this.name = name;
    this.television = new Television(name);
  }

  execute(command){
    if(command === 'on'){
      this.television.on();
    }
    else if(command === 'off'){
      this.television.off();
    }
  }
}

// 遥控器，遥控器关注的是有什么指令，不在在乎各个器件是否真的存在
class RemoteControl{
  constructor(){
    // 放置指令的地方
    this.commandObj = {};
  }

  /**
   * 设置指令
   * @param {*} command 指令对象
   */
  setCommand(command){
    this.commandObj[command.name] = command;
  }

  // 打开指定的指令
  buttonOn(name){
    if(this.commandObj[name]){
      this.commandObj[name].execute('on');
    }
  }

  // 关闭指定的指令
  buttonOff(name){
    if(this.commandObj[name]){
      this.commandObj[name].execute('off');
    }
  }
}

// 创建一个遥控器
const control = new RemoteControl();
// 这个遥控器可以发送 大厅的灯指令，但是不关心这个指令是不是真的能关大厅的灯，只有指令对象本身知道能不能关大厅的灯
control.setCommand(new LightCommand('大厅的灯')); 
control.setCommand(new LightCommand('卧室的灯'));
control.setCommand(new HeaterCommand('热水器'));
control.setCommand(new AirConditionerCommand('卧室空调'));
control.setCommand(new TelevisionCommand('大厅电视'));

// 使用这个遥控器
control.buttonOn('大厅的灯')
control.buttonOn('卧室的灯')
control.buttonOn('热水器')
control.buttonOn('卧室空调')
control.buttonOn('大厅电视')

console.log('---------------')

control.buttonOff('大厅的灯')
control.buttonOff('卧室的灯')
control.buttonOff('热水器')
control.buttonOff('卧室空调')
control.buttonOff('大厅电视')