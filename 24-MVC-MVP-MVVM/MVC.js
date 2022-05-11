// 发布---订阅者
class Event {
  constructor(publisher) {
    this._publisher = publisher; // 发布者
    console.log('发布者', this._publisher);
    this._listeners = []; // 订阅者
  }

  // 添加订阅者
  attach(listener) {
    this._listeners.push(listener);
  }

  // 通知订阅者
  notify(obj) {
    const length = this._listeners.length;
    for (let i = 0; i < length; i++) {
      // 在进行通知时，第一个参数默认传 发布者对象，第二个参数传 发布者广播的数据
      this._listeners[i](this._publisher, obj);
    }
  }
}

// 数据库数据 ['PHP', 'JS']
// 实现对数据的 增 删 改 查 (SQL语句) 
class Model {
  constructor(data) {
    // 所有数据
    this.data = data;

    // 被选中(查询)元素的索引
    this._selectedIndex = -1;

    // 注册一个发布者，当新增时，通知自己的订阅者队列（View模块）
    this.itemAdd = new Event(this);

    // 选择的列表元素更改行为，注册成为发布者
    this.selectedIndexChanged = new Event(this);

    console.log('model 初始化');
  }

  // 获取所有的元素数据
  getItems() {
    const data = [].concat(this.data);
    console.log('model', data);
    return data;
  }

  // 增加一项
  addItem(data) {
    console.log('model', data);
    this.data.push(data);
    // 通知 视图 有新增元素
    this.itemAdd.notify({ elem: data });
  }

  // 获取被选中元素
  getSelectedIndex() {
    console.log('model', this._selectedIndex);
    return this._selectedIndex;
  }

  // 设置元素被选中
  setSelectedIndex(index) {
    console.log('setModel', index);
    // 备份前一个被选中元素
    const previousIndex = this._selectedIndex;
    // 更新被选中元素
    this._selectedIndex = index;
    // 通知 有新元素被选中
    this.selectedIndexChanged.notify({ previous: previousIndex });
  }
}

// 视图
class View {
  constructor(model, elements) {
    // model数据来源
    this._model = model;
    // 要处理的元素
    this._elements = elements;

    this.listModified = new Event(this);
    // 为新增按钮注册成为发布者
    this.addButtonClicked = new Event(this);
    // 将this保存下来，在window elements 元素 或者 model对象 执行函数调用本类成员时可以使用
    var that = this;

    // 订阅model的新增数据的消息，更新界面
    this._model.itemAdd.attach(function (model, data) {
      // obj: 发布订阅器里定义的，在进行通知时，第一个参数传 发布者对象
      // data:  modle 执行 addItem 方法时的通知参数 { elem: data }，在这里并没有运用起来。
      console.log('model: model 对象，data: { elem: data }',model, data);
      // 因为这个函数是在model里面被调用执行的，所以这个函数里面的this指向的是model
      // 使用that 代替this
      that.rebuildList();
    });

    // 列表选中事件（选择变化事触发） 通知 Controller 订阅者
    this._elements.list.change(function (e) {
      console.log('view list change');
      //  当列表发生变化时，通知订阅者
      // 因为这个函数是在window document里面被调用执行的，所以这个函数里面的this指向的是window
      // 使用that 代替this
      that.listModified.notify({ index: e.target.selectedIndex });
    });
    // 添加按钮绑定事件，监听按钮事件, 通知 Controller 订阅者
    this._elements.addButton.click(function (e) {
      console.log('view add');
      // 当有按钮事件时，通知订阅者
      that.addButtonClicked.notify();
    });

    console.log('view 初始化');
  }

  show() {
    console.log('view show');
    this.rebuildList();
  }

  // 重新排列列表
  rebuildList() {
    console.log('view rebuildList');
    // 获取列表
    const list = this._elements.list;
    // 重置 列表
    list.html("");
    // 从model获取所有元素
    const items = this._model.getItems();
    // 循环元素
    for (let key in items) {
      if (items.hasOwnProperty(key)) {
        // 按照一定规则挂载到页面
        list.append('<option value="' + items[key] + '">' + items[key] + '</option>');
      }
    }
    // 设置查询的下标为-1
    this._model.setSelectedIndex(-1);
  }
}

class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    const that = this;

    // 注册成为 View的订阅者，接收view 按钮事件发起的通知，操作model 修改数据
    this._view.listModified.attach(function (sender, args) {
      console.log('controller list',sender, args);
      that.updateSelected(args.index);
    });
    this._view.addButtonClicked.attach(function () {
      console.log('controller add btn click');
      that.addItem();
    });

    console.log('controller 初始化')
  }

  addItem() {
    const item = window.prompt('Add item:', '');
    console.log('add controller', item);
    if (item) {
      // 调用model的添加功能
      this._model.addItem(item);
    }
  }

  updateSelected(index) {
    console.log('update controller', index);
    // 调用model的查询功能
    this._model.setSelectedIndex(index);
  }
}