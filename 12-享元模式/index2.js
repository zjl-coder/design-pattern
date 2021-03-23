// 享元模式改进，资源池原理（对象池）

let examCarNum = 0                  // 驾考车总数

// 驾考车
class ExamCar {
  constructor(carType) {
    examCarNum++;
    this.carId = examCarNum;
    this.carType = carType ? '手动挡' : '自动挡';
    // 如果车辆正在使用，则考生需要等前一个考生用完再使用
    this.usingState = false;
  }

  // 在车上考试
  examine(candidateId) {
    return new Promise((resolve, reject) => {
      this.usingState = true;
      console.log(`考生- ${candidateId} 开始在${this.carType}驾考车- ${this.carId} 上考试`);
      // 假设每个人的考试时间都是不固定的，但是在 100毫秒 - 1000毫秒范围内。
      const time = Math.random() * (1000 - 100) + 100;
      setTimeout(() => {
        this.usingState = false;
        console.log(`%c考生- ${candidateId} 在${this.carType}驾考车- ${this.carId} 上考试完毕`, 'color:#f40');
        resolve(); // 发出通知，车为可用状态。
      }, time)
    })
  }
}

// 手动挡汽车对象池（考试时可能不止有一辆，假设创建3辆）
class ManualExamCarPool {
  _pool = []; // 驾考车对象池
  constructor(examCarNum) {
    // 注册驾考车对象放入池子里面等待使用
    for (let i = 1; i <= examCarNum; i++) {
      this._pool.push(new ExamCar(true))
    }
  }

  // 获取池子里面没有使用的车对象，如果都在使用则返回空
  getExamCar() {
    return this._pool.find(car => !car.usingState);
  }
}

// 在场考生人数 10人
class Candidate {
  _queue = []; // 考生队列
  constructor(num) {
    for (let i = 1; i <= num; i++) {
      this._queue.push(i);
    }
  }

  // 在场考生开始考试
  startExam(manualExamCarPool) {
    // 判断是否还有考生
    if(!this._queue.length) return;
    // 拿到一辆没有使用的车
    const exmaCar = manualExamCarPool.getExamCar();
    //判断一下是有拿到车
    if (exmaCar) { //拿到车则进行考试
      exmaCar.usingState = true; // 车辆正在使用中
      // 传入考生编号
      const candidateId = this._queue.shift();
      if (!candidateId) {
        console.log('没有考生了，考试结束');
        return;
      }
      exmaCar.examine(candidateId).then(() => {
        exmaCar.usingState = false;
        // 通知有空车可以用
        this.startExam(manualExamCarPool);
      })
      // 循环将所有空车都拿出来用
      this.startExam(manualExamCarPool);
    }
  }
}

const manualExamCarPool = new ManualExamCarPool(3);
const candidate = new Candidate(10);
candidate.startExam(manualExamCarPool);