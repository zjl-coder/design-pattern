// 解释器模式

// 抽象表达式：主要有一个interpret()操作
// 终结符表达式：R = R1 + R2中，R1 R2就是终结符
// 非终结符表达式：R = R1 - R2中，- 就是非终结符 ， R也是非终结符


// 我们希望创建一个新的文法，能够实现当输入 "++-" 字符串的时候 它 等于 1
// 如果不对 "++-" 做解释，直接运行 得到的是字符串 "++-"，如果在js 的 eval 上运行，也是得不到任何结果的。

// 将上下文放置在这个类
class Context {
  constructor() {
    this._list = []; // 存放 终结符表达式
    this._sum = 0; // 存放 非终结符表达式(运算结果)
  }

  get sum() {
    return this._sum;
  }

  set sum(newValue) {
    this._sum = newValue;
  }

  add(expression) {
    this._list.push(expression);
  }

  get list() {
    return [...this._list];
  }
}

// 非终结符 + 的行为
class PlusExpression {
  // 将上下文传进来，获取上下文的终结符进行计算，一次计算一个
  interpret(context) {
    if (!(context instanceof Context)) {
      throw new Error("TypeError");
    }
    context.sum = ++context.sum;
  }
}

// 非终结符 - 的行为
class MinusExpression {
  // 将上下文传进来，获取上下文的终结符进行计算，一次计算一个
  interpret(context) {
    if (!(context instanceof Context)) {
      throw new Error("TypeError");
    }
    context.sum = --context.sum;
  }
}

/** 以下是测试代码 **/

// 创建一个上下文，用来存放终结符表达式和非终结符表达式
// 这里不需要终结符
const context = new Context();

// 我们要执行一个表达式 0 + 1 + 1 - 1; 
// 先将我们需要的非终结符表达式（ + + - ）添加到 上下文中存起来
// 依次添加: 加法 | 加法 | 减法 表达式
context.add(new PlusExpression());
context.add(new PlusExpression());
context.add(new MinusExpression());

// 依次执行: 加法 | 加法 | 减法 表达式
// 将非终结符表达式依次取出来执行，获得sum
context.list.forEach(expression => expression.interpret(context));
console.log(context.sum);