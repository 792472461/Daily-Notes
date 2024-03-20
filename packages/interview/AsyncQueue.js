class Scheduler {
  // 限制并发数
  constructor(MAX_CONCURRENTLY_EXECUTING = 2) {
    // 最大并发数
    this.MAX_CONCURRENTLY_EXECUTING = MAX_CONCURRENTLY_EXECUTING;
    // 当前并发数
    this.RUNING = 0;
    // 任务队列
    this.queue = [];
  }

  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        run: promiseCreator,
        resolve,
        reject
      });
      this.run();
    });
  }

  run() {
    // 当前并发数小于最大并发数并且任务队列不为空
    while (this.RUNING < this.MAX_CONCURRENTLY_EXECUTING && this.queue.length) {
      // 取出任务
      const { run, resolve, reject } = this.queue.shift();
      // 并发数+1
      this.RUNING++;
      // 执行任务
      run()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.RUNING--;
          this.run();
        });
    }
  }
}

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

var scheduler = new Scheduler();
let preTime = new Date().getTime();

function addTask(time, order) {
  scheduler
    .add(() => timeout(time))
    .then(() => console.log(order, new Date().getTime() - preTime));
}

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);

//要求
// ouput : 2 3 1 4
// 一开始1,2俩个任务进入队列
// 500ms时,2完成,输出2,
// 800ms时,3完成,输出3,
// 1000ms时,1完成,输出1
// 1200ms时,4完成,输出4
