// 发布--订阅者模式

// 售货员
class Salesperson {
  book = []; // 售货员的小本本，记录顾客的联系方式（通知接口）

  // 将顾客的联系方式添加进小本本
  addBook(customer) {
    this.book.push(customer);
  }

  // 店员通知行为，通知所有留下联系方式的顾客
  notify() {
    this.book.forEach(customer=>{
      console.log('店员通知顾客'+ customer.name);
      // 顾客的联系方式
      customer.receiveNotify('来货了');
    })
  }
}

// 顾客
class Customer {
  constructor(name){
    this.name = name;
  }

  // 我的联系方式，有信息时就通知我
  receiveNotify(msg){
    console.log('我是'+this.name+',收到信息'+msg);
  }
}

// 创建两个顾客
const zhang = new Customer('张三');
const li = new Customer('李四');
// 创建一个售货员
const salesperson = new Salesperson();
// 将顾客的联系方式记录在自己的小本本上
salesperson.addBook(zhang);
salesperson.addBook(li);
// 这个时候 店里来货了，店员进行通知行为
salesperson.notify();