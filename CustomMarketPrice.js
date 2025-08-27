// from CarrySheriff!

const customReqScripts = (settings) => {
  const originalXHR = window.XMLHttpRequest;

  const base_url = settings.base_url;

  let custom_list_price = localStorage.getItem("customMarketPrices") !== "false";
  let market_names = localStorage.getItem("marketNamesToggle") !== "false";

  let ids = [];
  let newprice;
  let updating = false;

  window.XMLHttpRequest = function () {
    const xhr = new originalXHR();
    let requestUrl = "";

    xhr.open = function (method, url, ...args) {
      requestUrl = url;
      originalXHR.prototype.open.apply(this, [method, url, ...args]);
    };

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (
          requestUrl.includes(`api2.${base_url.replace("https://", "")}`) &&
          window.location.href === `${base_url}hub/market` &&
          market_names
        ) {
          ids = [];
          let modifiedResponse = JSON.parse(xhr.responseText);
          try {
            modifiedResponse.forEach((item) => {
              if (Object.keys(item).length == 3) {
                Object.keys(item).forEach((item2) => {
                  if (typeof item[item2] == "string") {
                    ids.push(item[item2]);
                  }
                });
              }
            });
          } catch {}
          try {
            let jsonResponse = modifiedResponse;
            modifiedResponse = JSON.stringify(jsonResponse);
          } catch (e) {}
          Object.defineProperty(xhr, "responseText", {
            value: modifiedResponse,
          });
        }

        if (
          requestUrl.includes(`api2.${base_url.replace("https://", "")}`) &&
          location.href === `${base_url}inventory` &&
          xhr.responseText &&
          newprice &&
          custom_list_price
        ) {
          try {
            const json = JSON.parse(xhr.responseText);
            if (Object.keys(json).length === 2) {
              for (let key in json) {
                if (typeof json[key] === "number" && json[key] !== 0) {
                  json[key] = newprice;
                }
              }
            }
            xhr.responseText = JSON.stringify(json);
          } catch {}
        }
      }
    };

    xhr.send = function (data) {
      if (
        requestUrl.includes(`api2.${base_url.replace("https://", "")}`) &&
        location.href === `${base_url}inventory` &&
        document.querySelector(".vm--container > .vm--modal > .wrapper-modal")?.id !== "sell-item-modal" &&
        data &&
        newprice &&
        custom_list_price
      ) {
        try {
          const json = JSON.parse(data);
          if (Object.keys(json).length === 2) {
            for (let key in json) {
              if (typeof json[key] === "number" && json[key] !== 0) {
                json[key] = newprice;
              }
            }
          }
          data = JSON.stringify(json);
        } catch {}
      }
      originalXHR.prototype.send.call(this, data);
    };

    return xhr;
  };

  async function marketUsers() {
    const itemElements = document.getElementsByClassName("item-name");

    let count = 0;
    for (let i = 0; i < itemElements.length; i++) {
      let sellerId = ids[i];

      try {
        await new Promise((resolve) => setTimeout(resolve, 200));

        let fetchreq = await fetch(`https://api.kirka.io/api/user/getProfile`, {
          headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8",
            Referer: base_url,
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: `{"id":"${sellerId}"}`,
          method: "POST",
        });
        fetchreq = await fetchreq.json();
        if (fetchreq["shortId"]) {
          count++;
          if (count >= itemElements.length) {
            updating = false;
          }
          itemElements[i].innerText = itemElements[i].innerText.split(" - ")[0];
          itemElements[i].innerText += ` - ${fetchreq["name"]}#${fetchreq["shortId"]}`;
        }
      } catch {
        count++;
        if (count === itemElements.length) {
          updating = false;
        }
      }
    }
  }

  const inputElem = Object.assign(document.createElement("input"), {
    id: "juice-custom-listing",
    type: "number",
    min: "0",
    placeholder: "Custom amount",
    onchange: (e) => (newprice = Number(e.target.value)),
  });

  Object.assign(inputElem.style, {
    marginTop: "-.5em",
    marginBottom: "1em",
    border: ".125rem solid #202639",
    background: "none",
    outline: "none",
    background: "#2f3957",
    width: "50%",
    height: "2.875rem",
    paddingLeft: ".5rem",
    boxSizing: "border-box",
    fontWeight: "600",
    fontSize: "1rem",
    color: "#f2f2f2",
    boxShadow: "0 1px 2px rgba(0,0,0,.4), inset 0 0 8px rgba(0,0,0,.4)",
    borderRadius: ".25rem",
  });

  const observer = new MutationObserver(() => {
    if (window.location.href === `${base_url}inventory` && custom_list_price) {
      const sellElem = document.querySelector(".cont-sell");
      if (sellElem && !document.getElementById("juice-custom-listing") && sellElem.parentElement.parentElement.id !== "sell-item-modal") {
        sellElem.children[1].after(inputElem);
      }
    }

    if (
      window.location.href === `${base_url}hub/market` &&
      document.getElementsByClassName("subjects").length === 2 &&
      !document.getElementsByClassName("item-name")[0]?.innerText.includes(" - ") &&
      !updating &&
      ids.length > 0 &&
      market_names
    ) {
      marketUsers();
      updating = true;
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const checkInterval = setInterval(() => {
    const menuElem = document.querySelector("#menuMainContent > div:nth-child(5)");
    if (menuElem) {
      clearInterval(checkInterval);

      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "5px";
      container.style.marginBottom = "5px";

      function createToggle(label, value, key, callback) {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";

        const labelElem = document.createElement("span");
        labelElem.textContent = label;
        labelElem.style.color = "#fff";
        labelElem.style.fontWeight = "600";
        labelElem.style.fontSize = "14px";

        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.checked = value;
        toggle.style.cursor = "pointer";

        Object.assign(toggle.style, {
          width: "40px",
          height: "20px",
          appearance: "none",
          backgroundColor: value ? "#4caf50" : "#666",
          borderRadius: "20px",
          position: "relative",
          outline: "none",
          transition: "0.3s",
        });

        const slider = document.createElement("div");
        Object.assign(slider.style, {
          content: '""',
          position: "absolute",
          top: "2px",
          left: value ? "22px" : "2px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          transition: "0.3s",
        });

        toggle.addEventListener("input", () => {
          const isChecked = toggle.checked;
          toggle.style.backgroundColor = isChecked ? "#4caf50" : "#666";
          slider.style.left = isChecked ? "22px" : "2px";
          localStorage.setItem(key, isChecked);
          callback(isChecked);
        });

        toggle.appendChild(slider);
        row.appendChild(labelElem);
        row.appendChild(toggle);
        container.appendChild(row);
      }

      createToggle("Custom Market Prices", custom_list_price, "customMarketPrices", (state) => {
        custom_list_price = state;
      });

      createToggle("Market Names", market_names, "marketNamesToggle", (state) => {
        market_names = state;
      });

      menuElem.appendChild(container);
    }
  }, 50);
};

customReqScripts({
  base_url: "https://kirka.io/",
});
