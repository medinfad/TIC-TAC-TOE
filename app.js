const board = document.getElementById("board");
const boxes = Array.from(document.getElementsByClassName("box"));
const RecommencerBtn = document.getElementById("Recommencerbtn");
const jouerTxt = document.getElementById("jouertxt");
const cases = [null, null, null, null, null, null, null, null, null];
const O_txt = "O";
const X_txt = "X";
let joueurActuel = X_txt;

const drawboard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 3) {
      styleString += `border-bottom: 3px solid var(--couleur);`;
    }
    if (index % 3 === 0) {
      styleString += `border-right: 3px solid var(--couleur);`;
    }
    if (index % 3 === 2) {
      styleString += `border-left: 3px solid var(--couleur);`;
    }
    if (index > 5) {
      styleString += `border-top: 3px solid var(--couleur);`;
    }
    box.style = styleString;

    box.addEventListener("click", boxClicked);
  });
};

//Pour definir la zone vide selectionner par le joueur
function boxClicked(e) {
  const id = e.target.id;
  if (!cases[id]) {
    cases[id] = joueurActuel;
    e.target.innerText = joueurActuel;
    if (joueurgagne(joueurActuel)) {
      jouertxt.innerHTML = `${joueurActuel} wins!!`;
      return;
    }
    joueurActuel = joueurActuel === O_txt ? X_txt : O_txt;
  }
}

//Pour vérifier si le joueur à gagner
const joueurgagne = (joueur) => {
  //Horizental
  if (cases[0] === joueur) {
    if (cases[1] === joueur && cases[2] === joueur) {
      console.log(`${joueur} wins up top`);
      return true;
    }
    //Verticale
    if (cases[3] === joueur && cases[6] === joueur) {
      console.log(`${joeur} wins on the left`);
      return true;
    }
    //Diagonal
    if (cases[4] === joueur && cases[8] === joueur) {
      console.log(`${joueur} wins on the diagonal`);
      return true;
    }
  }
  //Pour vérifier de la derniére case si le joueur gagne
  if (cases[8] === joueur) {
    //Verticalement
    if (cases[2] === joueur && cases[5] === joueur) {
      console.log(`${joueur} wins on the right`);
      return true;
    }
    //Horizontalement
    if (cases[7] === joueur && cases[6] === joueur) {
      console.log(`${joueur} wins on the bottom`);
      return true;
    }
  }
  //Vérifier de la case au milieu du board
  if (cases[4] === joueur) {
    if (cases[3] === joueur && cases[5] === joueur) {
      console.log(`${joueur} wins on the middle horizontal`);
      return true;
    }
    if (cases[1] === joueur && cases[7] === joueur) {
      console.log(`${joueur} wins on the middle vertical`);
      return true;
    }
  }
};

RecommencerBtn.addEventListener("click", () => {
  cases.forEach((space, index) => {
    cases[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  jouerTxt.innerHTML = `Allez en Recommence !!`;

  joueurActuel = X_txt;
});

drawboard();
