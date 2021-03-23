// new Compile(el, vm)

class Compile{
  constructor(el, vm) {
    // 要遍历的数组节点  （#app）
    this.$el = document.querySelector(el);

    this.$vm = vm;

    // 判断el是否存在，编译
    if(el) {
      // 先将dom片段拿出来转换为新的虚拟的不在页面中的dom片段，不要直接操作文档，以提高性能
      this.$fragment = this.$node2Fragment(this.$el);
      // 执行编译 (替换浏览器中不认识的标示符)
      this.compile(this.$fragment);
      // 将编译完的html结果追加至$el, 更新真实的dom
      this.$el.appendChild(this.$fragment);

    }
  }
}