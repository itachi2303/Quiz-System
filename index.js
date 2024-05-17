import inquirer from "inquirer";
let fetcheddata = "https://opentdb.com/api.php?amount=5";
let fetchdata = async (data) => {
    let fetchquiz = await fetch(data);
    let data2 = await fetchquiz.json();
    return data2.results;
};
let data = await fetchdata(fetcheddata);
let startquiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        message: "what is your name",
        type: "input",
        name: "pname"
    });
    for (let i = 1; i < 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((Q) => Q),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
        }
    }
    console.log(`${name.pname} your score is => ${score}`);
};
startquiz();
