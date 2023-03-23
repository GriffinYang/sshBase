let min = undefined;
let max = undefined;
let middleWare = undefined;
let current_page;
let main;
let total;
let perNum;
let middle;

function createPageBar(
  totalNum,
  number,
  currentPage,
  middleNum,
  container,
  fn,
  err
) {
  middle = middleNum;
  perNum = number;
  const totalPage = Math.ceil(totalNum / number);
  middleWare = Math.floor(currentPage % number);
  if (middleWare == 0) {
    min = Math.floor(currentPage / number);
  } else {
    min = Math.floor(currentPage / number) + 1;
  }
  total = Math.ceil(totalNum / number);
  max = min + middleNum - 1;
  if (max > totalPage) max = totalPage;
  current_page = currentPage;
  main = container;
  generateBtn(currentPage, max, min, container, fn, err);
}

function generateBtn(current, max, min, parent, fn, err) {
  middleWare = Math.floor(current % middle);
  if (middleWare == 0) {
    if (current < middle) {
      middleWare = Math.floor(current / middle) - 1;
      min = middleWare + 1;
    } else {
      min = current - middleWare;
    }
  } else {
    if (current < middle) {
      middleWare = Math.floor(current / middle);
      min = middleWare + 1;
    } else {
      min = current - middleWare;
    }
  }
  max = min + middle - 1;
  if (max > total) max = total;
  parent.innerHTML = '';
  const first = document.createElement('button');
  first.textContent = '首页';
  first.setAttribute('value', 'first');
  first.classList.add('btn');
  first.classList.add('pager-btn');
  const last = document.createElement('button');
  last.textContent = '末页';
  last.setAttribute('value', 'last');
  last.classList.add('btn');
  last.classList.add('pager-btn');
  const prev = document.createElement('button');
  prev.textContent = '上一页';
  prev.setAttribute('value', 'prev');
  prev.classList.add('btn');
  prev.classList.add('pager-btn');
  const next = document.createElement('button');
  next.textContent = '下一页';
  next.setAttribute('value', 'next');
  next.classList.add('btn');
  next.classList.add('pager-btn');
  const container = document.createElement('div');
  container.append(first);
  container.append(prev);
  if (current == 1) {
    prev.disabled = true;
    first.disabled = true;
  } else {
    prev.disabled = false;
    first.disabled = false;
  }
  if (current == total) {
    last.disabled = true;
    next.disabled = true;
  } else {
    last.disabled = false;
    next.disabled = false;
  }
  for (let index = min; index < max + 1; index++) {
    const element = document.createElement('button');
    element.textContent = index;
    element.classList.add('btn');
    element.classList.add('pager-btn');
    element.setAttribute('value', index);
    if (current == index) element.classList.add('active');
    container.append(element);
  }
  container.append(next);
  container.append(last);
  parent.append(container);
  eventAdd(fn);
}

async function eventAdd(fn, err) {
  const btns = document.querySelectorAll('.pager-btn');
  btns.forEach((item) => {
    const value = item.getAttribute('value');
    if (value == 'first')
      item.addEventListener('click', () => {
        let initial = current_page;
        current_page = 1;
        asyncWrapper(fn, err, initial);
      });
    else if (value == 'last')
      item.addEventListener('click', () => {
        let initial = current_page;
        current_page = total;
        asyncWrapper(fn, err, initial);
      });
    else if (value == 'prev')
      item.addEventListener('click', () => {
        let initial = current_page;
        current_page--;
        asyncWrapper(fn, err, initial);
      });
    else if (value == 'next')
      item.addEventListener('click', () => {
        let initial = current_page;
        current_page++;
        asyncWrapper(fn, err, initial);
      });
    else
      item.addEventListener('click', (e) => {
        let initial = current_page;
        current_page = value;
        asyncWrapper(fn, err, initial);
      });
  });
}
async function asyncWrapper(fn, error, initial) {
  new Promise(async (resolve, reject) => {
    fn()
      .then(() => {
        resolve('success');
      })
      .catch(() => {
        reject('error to fetch');
      });
  })
    .then(() => {
      generateBtn(current_page, max, min, main, fn, error);
    })
    .catch(() => {
      current_page = initial;
      if (error) error();
      else alert('Request failed, we have revoked the changes!');
    });
}
createPageBar(
  20,
  2,
  1,
  3,
  document.querySelector('.main'),
  async () => {
    return new Promise((resolve, reject) => {
      resolve('success');
    });
  },
  null
);
