// 代理模式

// 明星
class SuperStar {
  name = '小鲜肉';

  // 拍广告
  playAdvertisement(ad) {
    console.log(this.name + '正在拍广告：' + ad);
  }
}

// 经济人
class ProxyAssistant {
  name = '经纪人张某';

  playAdvertisement(reward, ad) {
    if (reward > 100) { // 如果报酬超过100W
      console.log('没问题，我们小鲜鲜最喜欢拍广告了！');
      // 去找小鲜肉
      const superStar = new SuperStar();
      superStar.playAdvertisement(ad);
    } else {
      console.log('没空，滚');
    }
  }
}

console.log('我现在要制作广告，去找经纪人');
const proxyAssistant = new ProxyAssistant();
// 给钱和广告词
proxyAssistant.playAdvertisement(1000, '纯蒸酸牛奶，味道纯纯，尽享纯蒸');
// 不给钱，只给广告词
proxyAssistant.playAdvertisement(0, '纯蒸酸牛奶，味道纯纯，尽享纯蒸');