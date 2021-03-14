import { distribute, MeanSquare } from "./utils/utils";
import Dice from "./component/Dice";
import LCG from "./random/LCG";
import Khi2 from "./component/Khi2";
import "../public/styles/index.css";
import Chart from "chart.js";
import Walk from "./component/Walk";

window.onload = () => {
    // Run partie 2
    document.getElementById("runP2").onclick = () => {
        Partie_2();
    };

    // Setup P3
    let walk = "randomWalk";

    $(document).on("click", 'input[name="walk"]', function () {
        $('input[name="walk"]').not(this).prop("checked", false);
        walk = this.value;
    });

    document.getElementById("runP3").onsubmit = (e) => {
        let nStep = document.getElementById("nSteps").value;
        Partie_3(nStep, walk);
        e.preventDefault();
    };

    document.getElementById("runP3_4").onsubmit = (e) => {
        let nStep = parseInt(document.getElementById("p3_4_n").value);
        let k = parseInt(document.getElementById("p3_4_iteration").value);
        Partie_3_4(nStep, k);
        e.preventDefault();
    };
    //Partie_3_4(p3StepSize);
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

    // Variables
    const attendue = dice.prob_comb_side6.map((prob) => prob * ITER);
    const distribution = distribute(random_values_dice);
    const observed = Object.keys(distribution).map((key, index) => distribution[key].length);

    // Khi2 teste
    const result = khi2.execute(observed, attendue);

    // Render
    charP2.data.datasets[0].data = attendue;
    charP2.data.datasets[1].data = observed;
    charP2.update();
    document.querySelectorAll(".lcg-param").forEach((el, index) => (el.innerHTML = dice.random.params[index]));
    document.getElementById("Khi2-result").innerHTML = result;
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
                borderColor: "rgba(255, 99, 132, 1)",
                fill: false,
            },
            {
                label: "Observé",
                data: [],
                borderColor: "rgba(54, 162, 235, 1)",
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
    var parent = document.getElementById("march");
    canvas = createCanvas(500, 500);
    canvas.parent(parent);
}

function Partie_3(n, choix) {
    // Clear March and Canvas if exist

    if (marche != null) {
        marche.clear();
    }

    marche = new Walk(n);

    if (choix === "randomWalk") {
        marche.randomWalk() ? marche.render() : console.log(false);
    }
    if (choix === "nonReversingWalk") {
        marche.nonReversingWalk() ? marche.render() : console.log(false);
    }
    if (choix === "selfAvoidingWalk") {
        marche.selfAvoidingWalk() ? marche.render() : console.log(false);
    }
}

function Partie_3_4(n, k) {
    var rdmWalk_meanSquare = [];
    var nRvsWalk_meanSquare = [];
    var selfAvdWalk_meanSquare = [];
    try {
        var lcg = new LCG({});

        for (let i = 1; i < n + 1; i++) {
            // rdmWalk
            let tmp = [];
            for (let j = 0; j < k; j++) {
                let rdmWalk = new Walk(i, lcg);
                rdmWalk.randomWalk();
                tmp.push(rdmWalk.getEndToEndDistance());
                rdmWalk.clear();
            }
            rdmWalk_meanSquare.push(tmp);

            // nRvsWalk
            tmp = [];
            for (let j = 0; j < k; j++) {
                let nRvsWalk = new Walk(i, lcg);
                nRvsWalk.nonReversingWalk();
                tmp.push(nRvsWalk.getEndToEndDistance());
                nRvsWalk.clear();
            }
            nRvsWalk_meanSquare.push(tmp);

            //selfAvdWalk
            tmp = [];
            for (let j = 0; j < k; j++) {
                let selfAvdWalk = new Walk(i, lcg);
                selfAvdWalk.selfAvoidingWalk();
                tmp.push(selfAvdWalk.getEndToEndDistance());
                selfAvdWalk.clear();
            }
            selfAvdWalk_meanSquare.push(tmp);
        }
        chartP3_4.data.datasets[0].data = rdmWalk_meanSquare.map((arr) => MeanSquare(arr));
        chartP3_4.data.datasets[1].data = nRvsWalk_meanSquare.map((arr) => MeanSquare(arr));
        chartP3_4.data.datasets[2].data = selfAvdWalk_meanSquare.map((arr) => MeanSquare(arr));
        chartP3_4.config.data.labels = [...Array(n).keys()].map((x) => ++x);
        chartP3_4.update();
    } catch (e) {
        console.log(e);
    }
}

let chartP3_4 = new Chart(document.getElementById("chartP3_4"), {
    type: "line",
    data: {
        labels: [...Array(60).keys()].map((x) => ++x),
        datasets: [
            {
                label: "Random Walk",
                data: [],
                borderColor: "rgba(255, 99, 132, 1)",
                fill: false,
            },
            {
                label: "Non reversing",
                data: [],
                borderColor: "rgba(54, 162, 235, 1)",
                fill: false,
            },
            {
                label: "Self-Avoinding Walk",
                data: [],
                borderColor: "rgba(54, 49, 235, 1)",
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
        scales: {
            xAxes: [
                {
                    ticks: {
                        // Include a dollar sign in the ticks
                        userCallback: function (label, index, labels) {
                            return index;
                        },
                    },
                },
            ],
        },
    },
});
