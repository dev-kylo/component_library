
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

export function returnDate(utcdate = '') {
  let date;
  if (utcdate) date = new Date(utcdate);
  else date = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return {
    weekday: days[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes()
  }
};

export function removeParams(src) {
  const srcArray = src.split('');
  const newSrc = [];
  for (let i = 0; i < srcArray.length; i++) {
    let queryBegin;
    if (srcArray[i] === '?') {
      queryBegin = 'found'
      break;
    }
    else if (queryBegin === 'found') {
      return;
    }
    else {
      newSrc.push(srcArray[i]);
    }
  }

  return newSrc.join('');
};



export function getNextEvents(dataList: mslEventI[], length: number = -1): mslEventI[] {
  const data = [...dataList]
  const d = new Date();
  const ISOdate = d.toISOString();
  const firstUpcomingEventIndex = data.findIndex(evt => {
    if (!evt.EndDate) return evt.StartDate > ISOdate;
    return evt.EndDate > ISOdate; // An event is still valid if the end date is after the current datetime.
  });

  if (firstUpcomingEventIndex < 0) return [];
  else if (length > 0) return data.slice(firstUpcomingEventIndex, firstUpcomingEventIndex + length)
  else return data.slice(firstUpcomingEventIndex)
}

export function verifyCloudinaryApprovedUrl(url: string) {
  let verified = false;
  if (url.includes('https://www.kclsu.org/asset/News/6015/')) verified = true;
  return verified;
}

export function makeRequest<T extends {}>(url: string, type: any, data?: any): Promise<T> {
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



export function fetchElementAttributes(parent, element) {
  const els = Array.from(parent.querySelectorAll(element)) as any;
  const result = els.map(el => {
    return Array.prototype.slice.call(el.attributes).reduce((acc, cur) => {
      if (cur.name === 'class') return { ...acc }
      return { ...acc, [cur.name]: cur.value }
    }, {});
  });
  return result;
}

export function createArrayFromString(str, separator) {
  return str.split(separator).map(item => item.trim());
}

export function shuffleArray(array) {
  var currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex > 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}