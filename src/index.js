import { distribute, getLCGparams } from "./utils/utils";
import Dice from "./component/Dice";
import LCG from "./random/LCG";
import Khi2 from "./component/Khi2";
import "../public/styles/index.css";
import Chart from "chart.js";
import March from "./component/March";
import March2 from "./component/March2";

window.onload = () => {
    // Run partie 2
    document.getElementById("runP2").onclick = () => {
        Partie_2();
    };

    document.getElementById("runP3").onclick = () => {
        Partie_3();
    };
};

function Partie_2() {
    // Variables
    const dice = new Dice();
    const khi2 = new Khi2();
    const random_values_dice = [];
    const ITER = document.getElementById("p2Iter").value; // Default 1000

    // Generate roll combinaison
    for (let i = 0; i < ITER; i++) {
        random_values_dice.push(dice.roll() + dice.roll());
    }

    // Khi2 varabile
    const attendue = dice.prob_comb_side6.map((prob) => prob * ITER);
    const distribution = distribute(random_values_dice);
    const observed = Object.keys(distribution).map((key, index) => distribution[key].length);

    // Khi2 teste
    const result = khi2.execute(observed, attendue);

    // Render
    charP2.data.datasets[0].data = observed;
    charP2.data.datasets[1].data = attendue;
    charP2.update();
    document.querySelectorAll(".lcg-param").forEach((el, index) => (el.innerHTML = dice.random.params[index]));
}

// Setup partie 2
// Chart Partie 2
let charP2 = new Chart(document.getElementById("chartP2"), {
    type: "line",
    data: {
        labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
            {
                label: "Attendue",
                data: [],
                borderColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
            },
            {
                label: "Observé",
                data: [],
                borderColor: "rgba(54, 162, 235, 0.2)",
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: "Dice Sum for Iteration",
        },
    },
});

// Setup partie 3

window.setup = setup;
var marche;

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent(document.getElementById("march"));
}

function Partie_3() {
    /*if (marche != null) marche.clear();
    marche = new March(20);

    while (marche.selfAvoidingWalk().stuck == true) {
        marche.clear();
        marche = new March(15);
    }*/

    if (marche != null) marche.clear();
    marche = new March2(300);

    if (marche.selfAvoidingWalk()) {
        marche.render();
    } else console.log(false);
}
