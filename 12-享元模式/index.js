// 享元模式

let examCarNum = 0;      // 驾考车的数量
// 驾考车
class ExamCar {
  constructor(carType) {
    examCarNum++; // 每次创建一辆车，数字增加一次
    this.carType = carType ? '手动档' : '自动档';
    this.carId = examCarNum; // 并且将数字直接作为考车编号
  }

  examine(candidateId) {
    console.log('考生-' + candidateId + ' 在' + this.carType + '驾考车-' + this.carId + ' 上考试');
  }
}

const candidateNum = 10   // 考生数量

// // 如果不使用享元模式，则一个考生分配一辆车
// for (let candidateId = 1; candidateId <= candidateNum; candidateId++) {
//   // id为奇数的考生分配手动档，为偶数的考生分配自动挡
//   const examCar = new ExamCar(candidateId % 2);
//   examCar.examine(candidateId)
// }
// console.log('使用车数' + examCarNum + '辆');

// 启用享元模式
// 先创建一辆自动挡的车和一辆手动档的车
const manualExamCar = new ExamCar(true);
const autoExamCar = new ExamCar(false);
for (let candidateId = 1; candidateId <= candidateNum; candidateId++) {
  // id为奇数的考生分配手动档，为偶数的考生分配自动挡
  const examCar = candidateId % 2 ? manualExamCar : autoExamCar;
  examCar.examine(candidateId)
}
console.log('使用车数' + examCarNum + '辆');