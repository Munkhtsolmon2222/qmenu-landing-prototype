import { SEAT_DURATION } from "@/lib/config/constant";
import { Timetable } from "@/lib/types";

interface Dates {
  key: keyof Timetable;
  day: string;
  title: string;
  date: string;
}

export const dates: Dates[] = [
  { key: "sun", title: "Ням", day: "", date: "" },
  { key: "mon", title: "Даваа", day: "", date: "" },
  { key: "tue", title: "Мягмар", day: "", date: "" },
  { key: "wed", title: "Лхагва", day: "", date: "" },
  { key: "thu", title: "Пүрэв", day: "", date: "" },
  { key: "fri", title: "Баасан", day: "", date: "" },
  { key: "sat", title: "Бямба", day: "", date: "" },
];

export const getDates = (timetable?: Timetable) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  dates.forEach((date, index) => {
    const dayOffset = index - currentDay;
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + dayOffset);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    date.date = `${year}-${month}-${day}`;
    date.title = date.title;
    date.day = day;
  });

  const filteredDates = dates.filter((e) => {
    const date = new Date(e.date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    return +date >= +currentDate;
  });

  const lastDate = dates.findIndex(
    (e) => filteredDates[filteredDates.length - 1].key === e.key
  );

  const sortedDates = (() => {
    const length = 7 - filteredDates.length;

    const additionalDates = Array.from({ length }, (_, i) => {
      const index = dates[lastDate + 1 + i] ? lastDate + 1 + i : i;
      const item = dates[index];

      const newDate = new Date(item.date);
      newDate.setDate(newDate.getDate() + lastDate + 1);

      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");

      return {
        ...item,
        day,
        date: `${year}-${month}-${day}`,
      };
    });

    return [...filteredDates, ...additionalDates].sort(
      (a, b) => +new Date(a.date) - +new Date(b.date)
    );
  })();

  if (!timetable) return sortedDates;

  return sortedDates.reduce((res: Dates[], item) => {
    const val = timetable[item.key];
    if (val) res.push(item);
    return res;
  }, []);
};

export function convertToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 1) {
    return {
      mn: mins > 0 ? `${hours} цаг ${mins} мин` : `${hours} цаг`,
      en: mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`,
    };
  } else {
    return {
      mn: `${minutes} мин`,
      en: `${minutes} min`,
    };
  }
}

const timesArray = Array.from(
  { length: 60 / SEAT_DURATION },
  (_, i) => i * SEAT_DURATION
);

const getTimetable = (dateValue: Date, timetable?: Timetable) => {
  const days = [
    ["sun", "sunOpen", "sunClose"],
    ["mon", "monOpen", "monClose"],
    ["tue", "tueOpen", "tueClose"],
    ["wed", "wedOpen", "wedClose"],
    ["thu", "thuOpen", "thuClose"],
    ["fri", "friOpen", "friClose"],
    ["sat", "satOpen", "satClose"],
  ];

  const obj = days[dateValue.getDay()];

  let isOpen = timetable?.[obj[0] as keyof Timetable] as boolean;
  const openTime = (timetable?.[obj[1] as keyof Timetable] ??
    "00:00") as string;
  let closeTime = (timetable?.[obj[2] as keyof Timetable] ?? "23:59") as string;

  if (openTime === "00:00" && closeTime === "00:00") closeTime = "23:59";

  isOpen = typeof isOpen === "boolean" ? isOpen : true;

  return { isOpen, openTime, closeTime };
};

const checkTime = (openTime: string, closeTime: string, timeDate: Date) => {
  const open = +getDateByTime(getClosestTime(getDateByTime(openTime)));
  const close = +getDateByTime(getClosestTime(getDateByTime(closeTime)));
  const time = +timeDate;
  if (closeTime === "23:59") return time >= open && time <= close;
  return time >= open && time < close;
};

function getClosestTime(date: Date): string {
  let result = 0;

  const hours = date.getHours();
  const minute = date.getMinutes();

  for (let i = 0; i < timesArray.length; i++) {
    const currentTime = timesArray[i];
    const nextTime = timesArray[i + 1];
    if (minute >= currentTime && (!nextTime || nextTime > minute))
      result = currentTime;
  }

  return `${hours.toString().padStart(2, "0")}:${result
    .toString()
    .padStart(2, "0")}`;
}

export const getDateByTime = (time: string, date: Date = new Date()) => {
  const [h, m] = time.split(":");
  return setDateTime(+h, +m, 0, date);
};

const setDateTime = (
  hours: number,
  minute: number,
  second: number,
  date?: Date
) => {
  const futureDate = date ? new Date(date) : new Date();
  futureDate.setHours(hours);
  futureDate.setMinutes(minute);
  futureDate.setSeconds(second);
  return futureDate;
};

export const generateTimeArray = (timeTable?: Timetable) => {
  const times = [];

  const { isOpen, openTime, closeTime } = getTimetable(new Date(), timeTable);

  if (isOpen) {
    for (let hour = 0; hour < 24; hour++) {
      for (const minute of timesArray) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

        if (checkTime(openTime, closeTime, getDateByTime(time)))
          times.push(time);
      }
    }
  }

  return times;
};

export const sessionTime = () => {
  const sessionStart = localStorage?.getItem("sessionStart");
  if (!sessionStart) return 0;
  const start = +sessionStart;
  const current = new Date().getTime();
  const diff = Math.floor((current - start) / 1000);
  return 60 - diff;
};
