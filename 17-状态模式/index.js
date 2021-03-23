// 状态模式, 设置不同的状态，函数的行为不同

// 反模式，不推介
const state = {
    weak: '柔光', // 柔光
    strong: '强光', // 强光
    sleep: '睡眠光', // 睡眠光
    off: '关灯', // 关灯
}

class Light {
    constructor() {
        this.currentState = state.off;
    }

    pressed() {
        if(this.currentState === state.off){
            this.currentState = state.strong;
        } else if(this.currentState === state.strong) {
            this.currentState = state.weak;
        } else if(this.currentState === state.weak) {
            this.currentState = state.sleep;
        } else {
            this.currentState = state.off;
        }
        
        console.log('当前状态:', this.currentState);
    }
}

const light = new Light();
let i = 0;
console.log('第',++i,'次按下开关');
light.pressed();
console.log('第',++i,'次按下开关');
light.pressed();
console.log('第',++i,'次按下开关');
light.pressed();
console.log('第',++i,'次按下开关');
light.pressed();