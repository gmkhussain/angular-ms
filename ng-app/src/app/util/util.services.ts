export const doSomething = (val: string ): any => {
  return val;
};

// 2021-12-30T06:47:00.241
// Dec 30, 2021 @ 06:47:00.241
export const dateFormat = (val: string = '2021-12-30T06:47:00.241' ): any => {
  let formattedDate = `${new Date( val ).toDateString().slice(4).replace(' ', ', ')} @ ${val.split('T')[1]}`;
  //let formattedDate = val.replace('T', ' @ ')
  return formattedDate;
};


// let currentTab= 'about';
// export const tabChanger = ( selectedTab: string = 'about' ): any => {
//   console.log("tab...")
//   currentTab = selectedTab;
// }
