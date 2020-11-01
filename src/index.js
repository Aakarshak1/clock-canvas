const getHourAngle = (hour) => Number(hour) * (360 / 12) + 180;

const getMinuteAngle = (mins) => Number(mins) * (360 / 60) + 180;

const getSecondsAngle = (sec) => sec * (360 / 60) + 180;

function initClock({ length, hourAngle, minuteAngle, secondAngle }) {
  let canvas = new fabric.Canvas('clock');
  canvas.setDimensions({ width: length, height: length });

  let center = new fabric.Circle({
    radius: 3,
    top: length / 2,
    left: length / 2,
    fill: '#fcf1f1',
  });

  let parameter = new fabric.Circle({
    top: 30,
    left: 20,
    radius: length / 2 - 20,
    fill: '#fcf1f1',
    strokeWidth: 3,
    stroke: 'blue',
  });

  let hour = new fabric.Rect({
    left: length / 2,
    top: length / 2,
    fill: '#f9813a',
    width: 3,
    height: length / 2 - 80,
    angle: hourAngle,
  });

  let minute = new fabric.Rect({
    left: length / 2,
    top: length / 2,
    fill: '#1a1c20',
    width: 3,
    height: length / 2 - 60,
    angle: minuteAngle,
  });

  let second = new fabric.Rect({
    left: length / 2 + 1,
    top: length / 2,
    fill: 'red',
    width: 3,
    height: length / 2 - 40,
    angle: secondAngle,
  });

  canvas.add(parameter, center, hour, minute, second);
  setInterval(() => {
    let current = currentTime().split(':');
    let secondAngle = getSecondsAngle(current[2]);
    second.animate('angle', secondAngle, {
      duration: 10,
      onChange: () => {
        minute.set('angle', getMinuteAngle(current[1]));
        hour.set('angle', getHourAngle(current[0]));
        canvas.renderAll();
      },
    });
  }, 1000);
}

const currentTime = () => {
  let date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

let current = currentTime().split(':');

initClock({
  length: 350,
  hourAngle: getHourAngle(current[0]),
  minuteAngle: getMinuteAngle(current[1]),
  secondAngle: getSecondsAngle(current[2]),
});
