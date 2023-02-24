let threeNums = [1, 2, 3];

async function favNum() {
    let data = await $.getJSON("http://numbersapi.com/7?json");
    console.log(data);
}

async function favNums() {
    let data = await $.getJSON(`http://numbersapi.com/7?json/${threeNums}?json`);
    console.log(data);
}

async function fourFacts() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON("http://numbersapi.com/7?json"))
    );
    facts.forEach(data => {
        $("ul").append(`<li>${data.text}</li>`);
    });
}

favNum();
favNums();
fourFacts();


