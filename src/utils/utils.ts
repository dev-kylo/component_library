
export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}

export function createId(): string {
  return Math.random().toString(36).substr(2, 10);
};

export function returnDate(utcdate = ''){
  let date;
  if (utcdate) date = new Date(utcdate);
  else date = new Date();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December'];

  return {
    weekday: days[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
    hours : date.getHours(),
    minutes : date.getMinutes()
  }
};

export function removeParams(src){
  let srcArray = src.split('');
  let newSrc = [];
  for(let i = 0; i < srcArray.length; i++){
    let queryBegin;
    if (srcArray[i] === '?'){
      queryBegin = 'found'
      break;
    }
    else if (queryBegin === 'found'){
      return;
    }
    else {
      newSrc.push(srcArray[i]);
    }
  }

  return newSrc.join('');
};



export function getNextEvents(data, length = 0){
  let d = new Date();
  let ISOdate = d.toISOString();
  let index = data.findIndex(evt => {
      return evt.StartDate > ISOdate;
  })

  if (length) return data.slice(index, length)
  else return data.slice(index)
}