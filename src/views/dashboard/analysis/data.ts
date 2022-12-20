export interface GrowCardItem {
  funkey:string;
  icon: string;
  title: string;
  value: number;
  valueprefix: string;
  valuesuffix: string;
  total: number;
  totalfix: string;
  totalsuffix: string;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    funkey:"microweb",
    title: '轻站数',
    icon: 'visit-count|svg',
    value: 200,
    valueprefix:"剩余 ",
    valuesuffix:"",
    total: 300,
    totalfix:"",
    totalsuffix:"",
    color: 'green',
    action: '续费/续量',
  },
  {
    funkey:"subaccounts",
    title: '子账号数',
    icon: 'total-sales|svg',
    value: 1,
    valueprefix:"剩余 ",
    valuesuffix:" 个",
    total: 50,
    totalfix:"",
    totalsuffix:" 个",
    color: 'blue',
    action: '',
  },
  {
    funkey:"attachment",
    title: '附件',
    icon: 'download-count|svg',
    value: 8000,
    valueprefix:"剩余 ",
    valuesuffix:" M",
    total: 120000,
    totalfix:"",
    totalsuffix:" M",
    color: 'orange',
    action: '',
  },
  // {
  //   title: '成交数',
  //   icon: 'transaction|svg',
  //   value: 5000,
  //   valueprefix:"剩余",
  //   valuesuffix:"",
  //   totalfix:"",
  //   totalsuffix:"",
  //   total: 50000,
  //   color: 'purple',
  //   action: '-',
  // },
];
