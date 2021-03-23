// 适配器

// 在中国使用的电源标准
class ChinesePlug {
  constructor() {
    this.type = '中国插头';
  }

  chineseInPlug() {
    console.log('用中国的电流开始供电');
  }
}

// 在日本使用的电源标准
class JapanesePlug {
  constructor() {
    this.type = '日本插头';
  }

  japaneseInPlug() {
    console.log('用日本的电流开始供电');
  }
}

class AmericanPlug {
  constructor() {
    this.type = '美国插头';
  }

  americanInPlug() {
    console.log('用美国的电流开始供电');
  }
}

// 去日本旅游时，带上的是中国的手机插头，此时无法插入日本的插座
// 日本适配器（转接头：将中国的插头插在转接头上再插入日本的插座）
// 对日本充电器做一下适配，适配器修改一下函数的名称，但是行为不改变
class JapanesePlugAdapter {
  // 要适配的电源保准插头
  constructor() {
    const japanesePlug = new JapanesePlug();
    console.log('使用适配器适配(模拟)->', japanesePlug.type);
    this.plug = japanesePlug;
  }

  // 适配器内置好中国转接日本的功能
  chineseInPlug() {
    this.plug.japaneseInPlug();
  }
}

console.log('------ 中国人在中国时 ------');
const chinesePlug = new ChinesePlug();
chinesePlug.chineseInPlug();

console.log('------ 日本人在日本时 ------');
const japanesePlug = new JapanesePlug();
japanesePlug.japaneseInPlug();

console.log('------ 美国人在美国时 ------');
const americanPlug = new AmericanPlug();
americanPlug.americanInPlug();

console.log('------ 去日本旅游时 ------');
// 用一个适配器, 接入日本标准
const japanesePlugAdapter = new JapanesePlugAdapter();
// 可以不修改各国家的标准的情况下充电，还是使用的中国标准，但是电流已经是日本电流
console.log('手机接入的是中国的标准');
japanesePlugAdapter.chineseInPlug();