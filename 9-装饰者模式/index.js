// 装饰者模式

// 这个类的能力是画一个圆
class Circle {
  draw(){
    console.log('画一个圆');
  }
}

// 装饰器，装饰一下 Circle 类，在不改变它原来能力的情况下，赋予能设置颜色的能力
class Decorator {
  // 装饰器，要装饰的对象
  constructor(circle){
    this.circle = circle;
  }

  // 复制一个同名函数，但是行为在目标对象能力的基础上拓展(新增能力，不是修改能力)
  draw(){
    this.circle.draw();
    this.setRedBorder(circle)
  }

  setRedBorder(circle) {
    console.log('设置红色边框')
  }
}

// 测试
console.log('------ 原来的能力 ------');
let circle = new Circle()
circle.draw()
console.log('------ 经过装饰器之后的能力 ------');
let decorator = new Decorator(circle)
decorator.draw()