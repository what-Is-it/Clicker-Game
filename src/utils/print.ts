const t = [
    'Добро пожаловать в небольшую игру!\n',
    'Тебе предстоит сразиться с опасным монстром.\n',
    'Как будешь готов отправиться в битву жми на кнопку.\n',
    'Удачи!\n'
  ];
  
  function typeText(){
    let line = 0;
    let count = 0;
    let out = '';
    function typeLine() {
      let element: HTMLElement = window.document.querySelector('.print')!
      let interval = setTimeout(
        () => {
          out += t[line][count]
          element.innerHTML =out +'|';
       
        
        count++;
    
        if (count >= t[line].length) {
          count = 0;
          line++;
          if (line == t.length) {
            clearTimeout(interval);
             element.innerHTML =out;
            return true;
          }
        }
        typeLine();
      }, getRandomInt(getRandomInt(250*2.5)))
    }
    typeLine();
    
  }
  
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  export default typeText