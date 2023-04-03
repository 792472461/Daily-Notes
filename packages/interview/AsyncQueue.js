class Scheduler {
  constructor(MAX_CONCURRENTLY_EXECUTING = 2) {
    this.MAX_CONCURRENTLY_EXECUTING = MAX_CONCURRENTLY_EXECUTING;
    this.RUNING = 0;
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
    while (this.RUNING < this.MAX_CONCURRENTLY_EXECUTING && this.queue.length) {
      const { run, resolve, reject } = this.queue.shift();
      this.RUNING++;
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
