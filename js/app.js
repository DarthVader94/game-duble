const game = document.getElementById('game');



function straGame(game, cardCount) {
   const cardNumArr = [];
   let firstCards = null;
   let secCard = null;

   //Создаю числа
   for (let i = 1; i <= cardCount; i++) {
      cardNumArr.push(i, i)
   }


   //перемешивание
   for (let i = 0; i < cardNumArr.length; i++) {
      let randomIn = Math.floor(Math.random() * cardNumArr.length);
      let temp = cardNumArr[i];

      cardNumArr[i] = cardNumArr[randomIn];
      cardNumArr[randomIn] = temp;
   }

   // Настройка сетки
   let colm = 4;

   switch (colm) {
      case (cardCount === 3):
         colm = 3;
         console.log('+3')
         break;
      case (cardCount === 4):
         colm = 4;
         console.log('+')
         break;
      case (cardCount === 5):
         colm = 5;
         console.log('+5')
         break;
   }


   game.style = `grid-template-columns: repeat(${colm}, 1fr)`;

   //Создание карт
   for (let cardNum of cardNumArr) {
      let card = document.createElement('div');
      card.textContent = cardNum;
      card.classList.add('card');

      // Клик по карте
      card.addEventListener('click', function () {
         if (card.classList.contains('open') || card.classList.contains('success')) {
            return;
         }


         if (firstCards !== null && secCard !== null) {
            firstCards.classList.remove('open')
            secCard.classList.remove('open');
            firstCards = null;
            secCard = null;
         }

         card.classList.add('open');

         if (firstCards === null) {
            firstCards = card;
         } else {
            secCard = card;
         }

         if (firstCards !== null && secCard !== null) {
            let firstCardsNum = firstCards.textContent;
            let secCardNum = secCard.textContent;

            if (firstCardsNum === secCardNum) {
               firstCards.classList.add("success");
               secCard.classList.add("success");
            }
         }

         if (cardNumArr.length === document.querySelectorAll('.success').length) {
            setTimeout(function () {

               game.innerHTML = '';
               alert('Victory');
               let cardCount = Number(prompt('Количество пар +', '4'));
               straGame(game, cardCount);

            }, 400)
         }
      })

      game.append(card);
   }
}

let cardCount = Number(prompt('Количество пар +', '4'));
straGame(game, cardCount);
