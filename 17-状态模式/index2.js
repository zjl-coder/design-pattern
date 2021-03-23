// 优化，为了可以拓展，将灯的状态抽离出来，加入责任链模式，先找到当前状态的灯，然后再切换等的状态

class LightState {
  constructor(name){
      this.name = name; 
      this.nextLightState = '';
  }
  setNextSate(nextLightState){
    this.nextLightState = nextLightState;
    return nextLightState;
  }
  changeState(state){
    if(state === this.name){
      return this.nextLightState;
    }
    return this.nextLightState.changeState(state);
  }
}

class OffLightState extends LightState {
  constructor(){
      super('关灯');
  }
}

class StrongLightState extends LightState {
  constructor(){
      super('强灯');
  }
}

class WeakLightState extends LightState {
  constructor(){
      super('柔灯');
  }
}

class SleepLightState extends LightState {
  constructor(){
      super('睡眠灯');
  }
}

class Light {
  constructor(lightState){
    this.currentLight = lightState;
  }

  pressed(){
    this.currentLight = this.currentLight.changeState(this.currentLight.name);
    console.log('当前状态:', this.currentLight.name);
  }
}

// 组织好 灯的状态的排序
const offLightState = new OffLightState();
offLightState.setNextSate(new StrongLightState()).setNextSate(new WeakLightState()).setNextSate(new SleepLightState()).setNextSate(offLightState);

const light = new Light(offLightState);
let i = 0;
console.log('第',++i,'次按下开关');
light.pressed();
console.log('第',++i,'次按下开关');
light.pressed();
console.log('第',++i,'次按下开关');
light.pressed();
console.log('第',++i,'次按下开关');
light.pressed();

// 当有一个新的状态时，添加很方便