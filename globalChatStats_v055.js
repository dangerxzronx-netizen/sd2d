// ==UserScript==
// @name         Global Chat Item Prices and Trade Stats
// @description  Add (price) in global chat after each [item], and some trade stats if the offering is good or bad. Also add price to items in Market, Inventory, and also have a Inventory total value per section.
// @version      0.55
// @author       SheriffCarry, skywalk
// @github       https://api.github.com/repos/SheriffCarry/KirkaScripts/contents/Userscript/globalChatItemPricesAndTradeStats.js
// ==/UserScript==
let priceList = {};
const mappingConfigs = {
  skywalk: {
    default:    { name: "itemName", type: "type", price: "average",  rarity: "rarity" },
    automatic:  { name: "itemName", type: "type", price: "automatic", rarity: "rarity" },
    bros:       { name: "itemName", type: "type", price: "bros",      rarity: "rarity" },
    yzzz:       { name: "itemName", type: "type", price: "yzzz",      rarity: "rarity" }
  }
};
localStorage.globalchatPricesList = "skywalk";
if (!localStorage.globalMappingConfig) {
  localStorage.globalMappingConfig = "default";
};
function createElementWithClass(tagName, className, textContent = "") {
  const el = document.createElement(tagName);
  el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
};
function createElementWithText(tagName, textContent) {
  const el = document.createElement(tagName);
  el.textContent = textContent;
  return el;
};
function createDropdown(id, options) {
  const sel = document.createElement("select");
  sel.id = id;
  options.forEach(({ value, text }) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = text;
    sel.appendChild(opt);
  });
  return sel;
};
const optionGroup = createElementWithClass("div", "option-group");
const optionDiv   = createElementWithClass("div", "option");
const mappingSelect = createDropdown("global_mapping_config", [
  { value: "default",    text: "Default (average)" },
  { value: "automatic",  text: "Automatic" },
  { value: "bros",       text: "BROS" },
  { value: "yzzz",       text: "yzzz" }
]);
const mappingLabel = createElementWithText("span", "Mapping Configuration: ");
optionDiv.append(mappingLabel, mappingSelect);
optionGroup.append(optionDiv);
const tooltipContainer = createElementWithClass("div", "tooltip-container-GVL");
const tooltipIcon      = createElementWithClass("span", "info-icon-GVL", "i");
const tooltipText      = createElementWithClass("div", "tooltip-text-GVL", "Made by SheriffCarry and skywalk");
const tooltipStyle     = document.createElement("style");
tooltipStyle.innerHTML = `
.tooltip-container-GVL { position: relative; display: inline-block; cursor: pointer; font-size: 14px; }
.info-icon-GVL { background-color: #444; color: white; border-radius: 50%; padding: 5px; width: 20px; height: 20px; text-align: center; display: inline-block; font-weight: bold; line-height: 20px; }
.tooltip-text-GVL { visibility: hidden; width: 400px; background-color: #333; color: #fff; text-align: center; border-radius: 5px; padding: 10px; position: absolute; z-index: 1; bottom: 125%; left: 50%; transform: translateX(-50%); opacity: 0; transition: opacity 0.3s; white-space: nowrap; }
.tooltip-text-GVL::after { content: ""; position: absolute; top: 100%; left: 50%; margin-left: -5px; border-width: 5px; border-style: solid; border-color: #333 transparent transparent transparent; }
.info-icon-GVL:hover + .tooltip-text-GVL { visibility: visible; opacity: 1; }
`;
tooltipContainer.append(tooltipIcon, tooltipText);
async function fetchData(listName, url) {
  try {
    const resp = await fetch(url);
    priceList[listName] = await resp.json();
  } catch {
    priceList[listName] ||= [];
  }
};
async function fetchPriceList() {
  await Promise.all([
    fetchData("skywalk", "https://kirka.lukeskywalk.com/finalUpdatedBaseList.json")
  ]);
  return true;
};
document.addEventListener("DOMContentLoaded", async () => {
  await fetchPriceList();
  window.priceList = priceList;
  setTimeout(() => {
    if (document.getElementById("scripts-options")) {
      const cont = document.getElementById("scripts-options");
        if (cont) {
          cont.appendChild(tooltipStyle);
          cont.appendChild(tooltipContainer);
          const container = document.getElementById("scripts-options");
          if (container) container.appendChild(optionGroup);
          const mappingSelector = document.getElementById("global_mapping_config");
          if (mappingSelector) {
            mappingSelector.value = localStorage.globalMappingConfig;
            mappingSelector.addEventListener("change", () => {
              localStorage.globalMappingConfig = mappingSelect.value;
            });
          }
          
        }
    }
  }, 1000);
});
setInterval(async () => {
  await fetchPriceList();
  window.priceList = priceList;
}, 1000 * 60);
function getValue(itemName, itemType, selectedList, configKey = localStorage.globalMappingConfig) {
  const listKey = mappingConfigs[selectedList] ? selectedList : "skywalk";
  const mapObj = mappingConfigs[listKey] || {};
  let currKeys = mapObj[configKey] || mapObj.default;
  if (!currKeys) currKeys = mappingConfigs.skywalk.default;
  const currList = priceList[listKey] || [];
  const item = currList.find(entry =>
    entry[currKeys.name] === itemName &&
    entry[currKeys.type] === itemType
  );
  if (!item || item[currKeys.price] == null) return 0;
  return parseFloat(item[currKeys.price].toString().replace(/[.,]/g, "")) || 0;
};
function getValueByRarity(itemName, itemRarity, selectedList = localStorage.globalchatPricesList, configKey = localStorage.globalMappingConfig) {
  const listKey = mappingConfigs[selectedList] ? selectedList : "skywalk";
  const mapObj = mappingConfigs[listKey] || {};
  let currKeys = mapObj[configKey] || mapObj.default;
  if (!currKeys) currKeys = mappingConfigs.skywalk.default;
  const currList = priceList[listKey] || [];
  const item = currList.find(entry =>
    entry[currKeys.name] === itemName &&
    entry[currKeys.rarity] === itemRarity
  );
  if (!item || item[currKeys.price] == null) return 0;
  return parseFloat(item[currKeys.price].toString().replace(/[.,]/g, "")) || 0;
};
const searchItemByName = (itemName, itemType, configKey = localStorage.globalMappingConfig) => {
  const selectedList = localStorage.globalchatPricesList || "skywalk";
  return getValue(itemName, itemType, selectedList, configKey);
};
function returnItemType(weaponType, itemType) {
  return itemType === "BODY_SKIN" ? "Character"
       : itemType === "WEAPON_SKIN" ? weaponType
       : itemType === "CHEST" ? "Chest"
       : itemType === "CARD" ? "Card" : "";
};
function formatNumberWithCommas(number) {
  if (number === undefined || number === null) return 0;
  return number.toLocaleString("en-US");
};
function formatNumber(number) {
  if (!number) return "0";
  const abs = Math.abs(number);
  const suffix = abs >= 1e9 ? "bil" : abs >= 1e6 ? "mil" : abs >= 1e3 ? "k" : "";
  const divisor = suffix === "bil" ? 1e9 : suffix === "mil" ? 1e6 : suffix === "k" ? 1e3 : 1;
  const num = (abs / divisor).toFixed(abs % 1 ? 1 : 0);
  return (number < 0 ? "-" : "") + num + suffix;
};
const regexItemsFix = /\[\s*(.*?)\|(.*?)\|(.*?)\|(.*?)\]x?(\d*)/g;
function trimsplit(x) {
  let parts = [], lastIndex = 0;
  for (let match of x.matchAll(regexItemsFix)) {
    if (match.index !== lastIndex) parts.push(x.slice(lastIndex, match.index));
    parts.push(match[0]);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex !== x.length) parts.push(x.slice(lastIndex));
  return parts;
};
function trimMessage(messageSplit) {
  let newMessage = "", isOffering = true, offeringTotal = 0, wantedTotal = 0;
  let favorableTrade = "";
  for (let segment of messageSplit) {
    const tradeTag = /\*\*\/trade accept (\d+)\*\*/i;
    const itemRegex = /\[([^\|\]]+)\|([^\|\]]*)\|([^\|\]]*)\|([^\|\]]+)](?:x(\d+))?/g;
    const itemDetails = [...segment.matchAll(itemRegex)].map(match => ({
      name: match[1],
      weaponType: match[2],
      itemType: match[3],
      quantity: parseInt(match[5] || "1")
    }));
    if (tradeTag.test(segment)) {
      favorableTrade = (offeringTotal === 0 || wantedTotal === 0) ? "New item?" : "";
      const [prefix, tradeId] = segment.trim().split("**");
      newMessage += ` [${formatNumber(wantedTotal)}] Status: ${offeringTotal - wantedTotal > 0 ? '+' : ''}${formatNumber(offeringTotal - wantedTotal)}${favorableTrade !== '' ? ' ' + favorableTrade : ''} ${prefix}**${tradeId}** `;
    } else {
      if (segment.includes("for your")) {
        isOffering = false;
        newMessage += ` [${formatNumber(offeringTotal)}] ${segment}`;
      } else {
        for (let { name, weaponType, itemType, quantity } of itemDetails) {
          const pricelistItemType = returnItemType(weaponType, itemType);
          const itemPrice = searchItemByName(name, pricelistItemType);
          if (isOffering) offeringTotal += quantity * itemPrice;
          else wantedTotal += quantity * itemPrice;
          newMessage += `${segment} (${(quantity > 1) ? `${quantity}x${formatNumber(itemPrice)}= ` : ''}${formatNumber(quantity * itemPrice)})`;
        }
        if (!itemDetails.length) newMessage += segment;
      }
    }
  }
  return newMessage;
};
const regex = /\[([^\|]+).*?\]/gm;
const originalWebSocket = window.WebSocket;
window.WebSocket = function(...args) {
  const wsUrl = args[0];
  if (wsUrl.includes("chat.")) {
    const ws = new originalWebSocket(...args);
    ws.addEventListener("message", function(event) {
      try {
        let messageData = JSON.parse(event.data);
        if (messageData && messageData["message"] && !messageData["testfield"]) {
          const msgSplit = trimsplit(messageData["message"]);
          const newMessageArray = trimMessage(msgSplit);
          messageData["message"] = newMessageArray;
          messageData["testfield"] = true;
          event.stopImmediatePropagation();
          const modifiedEvent = new MessageEvent("message", {
            data: JSON.stringify(messageData),
            origin: event.origin,
            lastEventId: event.lastEventId,
            source: event.source,
            ports: event.ports
          });
          ws.dispatchEvent(modifiedEvent);
        } else if (messageData && messageData["messages"] && !messageData["testfield"]) {
          let newmessages = [];
          messageData["messages"].forEach(item => {
            const msgSplit = trimsplit(item["message"]);
            const newMessageArray = trimMessage(msgSplit);
            item["message"] = newMessageArray;
            newmessages.push(item);
          });
          messageData["messages"] = newmessages;
          messageData["testfield"] = true;
          event.stopImmediatePropagation();
          const modifiedEvent = new MessageEvent("message", {
            data: JSON.stringify(messageData),
            origin: event.origin,
            lastEventId: event.lastEventId,
            source: event.source,
            ports: event.ports
          });
          ws.dispatchEvent(modifiedEvent);
        }
      } catch (e) {
        console.error("Error processing WebSocket message:", e);
      }
    });
    return ws;
  }
  return new originalWebSocket(...args);
};
function processInventoryItems() {
  const inventory = document.querySelector(".inventory");
  if (!inventory) return;
  const isMarket = document.querySelector(".hub-container") !== null;
  const subjects = inventory.querySelectorAll(".content .subjects .subject");
  let inventoryTotal = 0;
  subjects.forEach(subject => {
    if (!subject.dataset.priceInjected) {
      const itemNameElem = subject.querySelector(".hover-btns-group .item-name");
      const countElem = subject.querySelector(".bottom-subj .count");
      const rarSkinElem = subject.querySelector(".rar-skin");
      const pricePositionElem = subject.querySelector(".hover-btns-group .item-name");
      if (itemNameElem && rarSkinElem && pricePositionElem) {
        const itemName = itemNameElem.textContent.trim();
        const count = isMarket && countElem ? 1 : (countElem ? parseInt(countElem.textContent.trim()) : 1);
        let subjectType = null;
        if (subject.classList.contains("character-card")) {
          subjectType = "Card";
        } else if (subject.classList.contains("chest")) {
          subjectType = "Chest";
        }
        let pricePerItem = 0;
        if (subjectType) {
          pricePerItem = searchItemByName(itemName, subjectType);
        } else {
          const bg = window.getComputedStyle(rarSkinElem).backgroundImage;
          let rarity;
          if (bg.includes("rgb(137, 4, 20)")) {
            rarity = "M";
          } else if (bg.includes("rgb(255, 133, 45)")) {
            rarity = "L";
          } else if (bg.includes("rgb(162, 45, 255)")) {
            rarity = "E";
          } else if (bg.includes("rgb(24, 99, 198)")) {
            rarity = "R";
          } else if (bg.includes("rgb(101, 213, 139)")) {
            rarity = "C";
          } else {
            rarity = "U";
          }
          pricePerItem = getValueByRarity(itemName, rarity);
        }
        const totalPrice = isMarket ? pricePerItem : (pricePerItem * count);
        const priceInfo = document.createElement("div");
        priceInfo.className = "price-info";
        priceInfo.style.position = "absolute";
        priceInfo.style.bottom = "0";
        priceInfo.style.left = "0";
        priceInfo.style.backgroundColor = "rgba(0,0,0,0.6)";
        priceInfo.style.color = "#fff";
        priceInfo.style.padding = "2px 4px";
        priceInfo.style.fontSize = "10px";
        priceInfo.style.lineHeight = "1.2";
        priceInfo.style.textAlign = "left";
        if (isMarket) {
          priceInfo.innerHTML = formatNumberWithCommas(pricePerItem);
        } else {
          priceInfo.innerHTML = `(${formatNumberWithCommas(totalPrice)})<br/>${formatNumberWithCommas(pricePerItem)}`;
        }
        if (getComputedStyle(subject).position === "static") {
          subject.style.position = "relative";
        }
        subject.appendChild(priceInfo);
        subject.dataset.priceInjected = "true";
        subject.dataset.totalPrice = totalPrice;
      }
    }
    if (!isMarket && subject.dataset.totalPrice) {
      inventoryTotal += parseFloat(subject.dataset.totalPrice);
    }
  });
  if (!isMarket) {
    const filterNameElem = inventory.querySelector(".content .filters .filter-name");
    if (filterNameElem) {
      let inventoryTotalElem = document.getElementById("inventory-total");
      if (!inventoryTotalElem) {
        inventoryTotalElem = document.createElement("div");
        inventoryTotalElem.id = "inventory-total";
        filterNameElem.insertAdjacentElement("afterend", inventoryTotalElem);
      }
      inventoryTotalElem.textContent = "Inventory: " + formatNumberWithCommas(inventoryTotal);
    }
  }
};
setInterval(processInventoryItems, 1000);
setTimeout(async () => {
await fetchPriceList();
}, 1500)
(async() => {
await fetchPriceList();
})