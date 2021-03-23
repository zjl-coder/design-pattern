// 模板模式

/* 饮料类，父类 模板 */
class Beverage {
  constructor() {
      if (new.target === Beverage) {
          throw new Error('抽象类不能直接实例化!')
      }
  }

  /* 烧开水，共用方法 行为都一样 */
  boilWater() { console.log('水已经煮沸') }
  
  /* 冲泡饮料，抽象方法 可以冲咖啡，茶，牛奶 */
  brewDrink() { throw new Error('抽象方法不能调用!') }
  
  /* 倒杯子里，共用方法 行为都一样 */
  pourCup() { console.log('倒进杯子里') }
  
  /* 加调味品，抽象方法 可以加咖啡伴侣，枸杞，糖 */
  addCondiment() { throw new Error('抽象方法不能调用!') }
  
  /* 制作流程，模板方法 统一制作流程 */
  init() {
      this.boilWater()
      this.brewDrink()
      this.pourCup()
      this.addCondiment()
  }
}
/* 咖啡类，子类 */
class Coffee extends Beverage {
  constructor() { super() }
  
  /* 冲泡饮料，实现抽象方法 */
  brewDrink() { console.log('冲泡咖啡') }
  
  /* 加调味品，实现抽象方法 */
  addCondiment() { console.log('加点咖啡伴侣') }
}

/* 茶类，子类 */
class Tea extends Beverage {
  constructor() { super() }
  
  /* 冲泡饮料，实现抽象方法 */
  brewDrink() { console.log('冲泡茶') }
  
  /* 加调味品，实现抽象方法 */
  addCondiment() { console.log('加点枸杞') }
}


console.log('------ 冲咖啡 ------');
const coffee = new Coffee()
coffee.init()
// 输出：水已经煮沸
// 输出：冲泡咖啡
// 输出：倒进杯子里
// 输出：加点咖啡伴侣

console.log('------ 冲茶 ------');
const tea = new Tea();
tea.init();