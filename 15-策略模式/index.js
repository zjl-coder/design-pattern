// 策略模式

// 某个电商网站希望举办一个活动，通过打折促销来销售库存物品，有的商品满 100 减 30，有的商品满 200 减 80，有的商品直接 8 折出售
class PriceStrategy {
  // 价格策略 , 策略，含有具体的算法，其方法的外观相同，因此可以互相代替；(传入参数类型，数量一样，返回类型一样)
  DiscountMap = {
    minus100_30: function (price) {      // 满100减30
      return price - Math.floor(price / 100) * 30
    },
    minus200_80: function (price) {      // 满200减80
      return price - Math.floor(price / 200) * 80
    },
    percent80: function (price) {        // 8折
      return price * 0.8
    }
  }

  // 获取价格
  getPrice(discountType, price) {
    return this.DiscountMap[discountType] && this.DiscountMap[discountType](price)
  }

  // 开闭原则，新增策略
  addStrategy(discountType, fn) {   // 注册新计算方式
    if (this.DiscountMap[discountType]) return;
    this.DiscountMap[discountType] = fn;
  }
}

const priceStrategy = new PriceStrategy();
// 满100减30，270最终是多少钱元
console.log('满100减30，270最终是多少钱元');
const p1  = priceStrategy.getPrice('minus100_30', 270);
console.log(p1);
// 更换策略，满200减80
console.log('满200减80，270最终是多少钱元');
const p2 = priceStrategy.getPrice('minus200_80', 270);
console.log(p2);
// 策略不够了，新增策略, 满150减40
priceStrategy.addStrategy('minus150_40', function(price) {
  return price - Math.floor(price / 150) * 40
});
// 使用策略，满150减40
console.log('满150减40，270最终是多少钱元');
const p3 = priceStrategy.getPrice('minus150_40', 270);
console.log(p3);