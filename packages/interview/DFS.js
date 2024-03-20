const data = [
  {
    id: '1000',
    parentId: '0',
    name: '全科医学',
    weight: 100,
    icon: 'icon-quanke--copy',
    children: [
      {
        id: '1100',
        parentId: '1000',
        name: '门诊全科医学',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '2000',
    parentId: '0',
    name: '发热门诊',
    weight: 100,
    icon: 'icon-fare'
  },
  {
    id: '3000',
    parentId: '0',
    name: '心理门诊',
    weight: 100,
    icon: 'icon-xinlifudao'
  },
  {
    id: '4000',
    parentId: '0',
    name: '儿科',
    weight: 100,
    icon: 'icon-erke---',
    children: [
      {
        id: '4100',
        parentId: '4000',
        name: '门诊儿科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '5000',
    parentId: '0',
    name: '内科',
    weight: 100,
    icon: 'icon-neike-',
    children: [
      {
        id: '5100',
        parentId: '5000',
        name: '门诊呼吸内科',
        weight: 100,
        icon: ''
      },
      {
        id: '5200',
        parentId: '5000',
        name: '门诊消化内科',
        weight: 100,
        icon: ''
      },
      {
        id: '5300',
        parentId: '5000',
        name: '门诊神经内科',
        weight: 100,
        icon: ''
      },
      {
        id: '5400',
        parentId: '5000',
        name: '门诊肾病科',
        weight: 100,
        icon: ''
      },
      {
        id: '5500',
        parentId: '5000',
        name: '门诊心血管内科',
        weight: 100,
        icon: ''
      },
      {
        id: '5600',
        parentId: '5000',
        name: '高血压门诊',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '6000',
    parentId: '0',
    name: '外科',
    weight: 100,
    icon: 'icon-waike',
    children: [
      {
        id: '6100',
        parentId: '6000',
        name: '门诊泌尿外科',
        weight: 100,
        icon: ''
      },
      {
        id: '6200',
        parentId: '6000',
        name: '乳腺、甲状腺外科',
        weight: 100,
        icon: ''
      },
      {
        id: '6300',
        parentId: '6000',
        name: '门诊普外科',
        weight: 100,
        icon: ''
      },
      {
        id: '6400',
        parentId: '6000',
        name: '门诊骨科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '7000',
    parentId: '0',
    name: '妇产科',
    weight: 100,
    icon: 'icon-tubiao_-',
    children: [
      {
        id: '7100',
        parentId: '7000',
        name: '门诊妇产科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '8000',
    parentId: '0',
    name: '耳鼻喉科',
    weight: 100,
    icon: 'icon-erbihou-',
    children: [
      {
        id: '8100',
        parentId: '8000',
        name: '门诊耳鼻喉科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '9000',
    parentId: '0',
    name: '眼科',
    weight: 100,
    icon: 'icon-yanke---',
    children: [
      {
        id: '9100',
        parentId: '9000',
        name: '门诊眼科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '10000',
    parentId: '0',
    name: '口腔科',
    weight: 100,
    icon: 'icon-kouqiangke',
    children: [
      {
        id: '10100',
        parentId: '10000',
        name: '门诊口腔科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '11000',
    parentId: '0',
    name: '皮肤科',
    weight: 100,
    icon: 'icon-pifuke---',
    children: [
      {
        id: '11100',
        parentId: '11000',
        name: '门诊皮肤科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '12000',
    parentId: '0',
    name: '中医科',
    weight: 100,
    icon: 'icon-zhongyike-copy',
    children: [
      {
        id: '12100',
        parentId: '12000',
        name: '门诊中医科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '13000',
    parentId: '0',
    name: '康复科',
    weight: 100,
    icon: '',
    children: [
      {
        id: '13100',
        parentId: '13000',
        name: '门诊康复科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '14000',
    parentId: '0',
    name: '中西医结合',
    weight: 100,
    icon: '',
    children: [
      {
        id: '14100',
        parentId: '14000',
        name: '中西医结合妇科',
        weight: 100,
        icon: ''
      },
      {
        id: '14200',
        parentId: '14000',
        name: '中西医结合生殖科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '15000',
    parentId: '0',
    name: '感染科',
    weight: 100,
    icon: '',
    children: [
      {
        id: '15100',
        parentId: '15000',
        name: '门诊感染科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '16000',
    parentId: '0',
    name: '心理门诊',
    weight: 100,
    icon: '',
    children: [
      {
        id: '16100',
        parentId: '16000',
        name: '门诊心理门诊',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '17000',
    parentId: '0',
    name: '美容科',
    weight: 100,
    icon: '',
    children: [
      {
        id: '17100',
        parentId: '17000',
        name: '门诊美容科',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '18000',
    parentId: '0',
    name: '生殖与不孕中心',
    weight: 100,
    icon: '',
    children: [
      {
        id: '18100',
        parentId: '18000',
        name: '门诊生殖与不孕中心',
        weight: 100,
        icon: ''
      }
    ]
  },
  {
    id: '19000',
    parentId: '0',
    name: '简易门诊',
    weight: 100,
    icon: ''
  },
  {
    id: '20000',
    parentId: '0',
    name: '其他',
    weight: 100,
    icon: ''
  }
];

const findDataName = (data, name) => {
  let result = [];
  const dfs = (data = [], path, name) => {
    data.forEach((item) => {
      if (item.name.includes(name)) {
        path.push(item);
        result.push(path[0]);
      } else {
        path.push(item);
        dfs(item.children, [...path], name);
      }
      path.pop();
    });
  };
  dfs(data, [], name);
  return result;
};

console.log(JSON.stringify(findDataName(data, '中'), null, 2));
