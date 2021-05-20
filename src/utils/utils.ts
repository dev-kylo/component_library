
import { mslEventI } from '../types/mslEvents';

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



export function getNextEvents(dataList, length: number = -1): mslEventI[] {
  let data = [...dataList]
  let d = new Date();
  let ISOdate = d.toISOString();
  let dateIndex = data.findIndex(evt => {
      return evt.StartDate > ISOdate;
  });

  if (dateIndex < 0) return [];
  else if (length > 0) return data.slice(dateIndex,dateIndex + length)
  else return data.slice(dateIndex)
}

export function verifyCloudinaryApprovedUrl(url:string){
    let verified = false ;
    if (url.includes('https://www.kclsu.org/asset/News/6015/')) verified = true;
    return verified;
}

export function makeRequest< T extends {}>(url: string, type:any, data?:any) : Promise<T>{
  const payload: any = {
    method: type,
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  };

  return fetch(url, payload)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
}



export function fetchElementAttributes(parent, element){
  const els = Array.from(parent.querySelectorAll(element)) as any;
  const result = els.map(el => {
      return Array.prototype.slice.call(el.attributes).reduce((acc, cur) => {
          if (cur.name === 'class') return {...acc}
          return {...acc, [cur.name]: cur.value}
       }, {});
  });
  return result;
}

export function createArrayFromString(str, separator){
   return str.split(separator).map(item => item.trim());
}

