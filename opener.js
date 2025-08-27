let git_base = "https://raw.githubusercontent.com/SheriffCarry/KirkaScripts/main/";

async function start_chests_input(inputarray) {
  let customchestlist = inputarray;
  let response = await fetch(`${git_base}ConsoleScripts/Open%20All%20Chests.js`);
  let text = await response.text();
  eval(text);
}

async function start_chests() {
  let response = await fetch(`${git_base}ConsoleScripts/Open%20All%20Chests.js`);
  let text = await response.text();
  eval(text);
}

async function start_cards_input(inputarray) {
  let customcardlist = inputarray;
  let response = await fetch(`${git_base}ConsoleScripts/Open%20All%20Cards.js`);
  let text = await response.text();
  eval(text);
}

async function start_cards() {
  let response = await fetch(`${git_base}ConsoleScripts/Open%20All%20Cards.js`);
  let text = await response.text();
  eval(text);
}

function createDropdown() {
  const container = document.querySelector("#menuMainContent > div:nth-child(5)");
  if (!container) return setTimeout(createDropdown, 100);

  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    margin-top: 15px;
    padding: 10px 15px;
    border-radius: 5px;
    font-family: sans-serif;
    color: white;
    width: 250px;
    background: transparent !important;
    backdrop-filter: blur(0px);
  `;

  const label = document.createElement("label");
  label.textContent = "Pack/Chest Opener:";
  label.style.cssText = `
    margin-bottom: 2px;
    display: block;
  `;
  wrapper.appendChild(label);

  const subLabel = document.createElement("div");
  subLabel.textContent = "Refresh to stop";
  subLabel.style.cssText = `
    font-size: 11px;
    color: #ccc;
    margin-bottom: 8px;
  `;
  wrapper.appendChild(subLabel);

  const select = document.createElement("select");
  select.id = "opener";
  select.style.cssText = `
    width: 100%;
    padding: 6px 8px;
    border-radius: 4px;
    background: transparent;
    color: #fff;
    border: 1px solid #555;
    font-size: 14px;
    cursor: pointer;
  `;

  const options = [
    { value: "None", text: "None" },
    { value: "Chest_Golden", text: "Golden" },
    { value: "Chest_Ice", text: "Ice" },
    { value: "Chest_Wood", text: "Wood" },
    { value: "Chest_All", text: "All Chests" },
    { value: "Card_Cold", text: "Cold" },
    { value: "Card_Girlsband", text: "Girls band" },
    { value: "Card_Party", text: "Party" },
    { value: "Card_Soldiers", text: "Soldiers" },
    { value: "Card_Periodic", text: "Periodic" },
    { value: "Card_All", text: "All Cards" },
  ];

  options.forEach(({ value, text }) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = text;
    select.appendChild(opt);
  });

  wrapper.appendChild(select);
  container.appendChild(wrapper);

  select.addEventListener("change", async () => {
    let value = select.value;
    if (value == "None") return;

    if (value == "Chest_Golden") {
      let customchestlist = [
        { chestid: "077a4cf2-7b76-4624-8be6-4a7316cf5906", name: "Golden" },
      ];
      start_chests_input(customchestlist);
    } else if (value == "Chest_Ice") {
      let customchestlist = [
        { chestid: "ec230bdb-4b96-42c3-8bd0-65d204a153fc", name: "Ice" },
      ];
      start_chests_input(customchestlist);
    } else if (value == "Chest_Wood") {
      let customchestlist = [
        { chestid: "71182187-109c-40c9-94f6-22dbb60d70ee", name: "Wood" },
      ];
      start_chests_input(customchestlist);
    } else if (value == "Chest_All") {
      start_chests();
    } else if (value == "Card_Cold") {
      let customcardlist = [
        { cardid: "723c4ba7-57b3-4ae4-b65e-75686fa77bf2", name: "Cold" },
      ];
      start_cards_input(customcardlist);
    } else if (value == "Card_Girlsband") {
      let customcardlist = [
        { cardid: "723c4ba7-57b3-4ae4-b65e-75686fa77bf1", name: "Girls band" },
      ];
      start_cards_input(customcardlist);
    } else if (value == "Card_Party") {
      let customcardlist = [
        { cardid: "6281ed5a-663a-45e1-9772-962c95aa4605", name: "Party" },
      ];
      start_cards_input(customcardlist);
    } else if (value == "Card_Soldiers") {
      let customcardlist = [
        { cardid: "9cc5bd60-806f-4818-a7d4-1ba9b32bd96c", name: "Soldiers" },
      ];
      start_cards_input(customcardlist);
    } else if (value == "Card_Periodic") {
      let customcardlist = [
        { cardid: "a5002827-97d1-4eb4-b893-af4047e0c77f", name: "Periodic" },
      ];
      start_cards_input(customcardlist);
    } else if (value == "Card_All") {
      start_cards();
    }
  });
}

createDropdown();
