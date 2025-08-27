// ==UserScript==
// @name         Custom Skin Link
// @description  Allows you to easily change the skin link
// @version      3
// @author       SheriffCarry
// @github       https://api.github.com/repos/SheriffCarry/KirkaScripts/contents/Userscript/Custom%20Skin%20Link.js
// ==/UserScript==

//Stuff is taken from BKC and improved
//It should work no matter what happens to the file name
const oldIsArr = Array.isArray;

const muzzleImg =
  "data:image/png;base64,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";
const muzzleImg2 = "shooting-fire";

Array.isArray = (...args) => {
  if (args[0] && args[0].map && args[0].map.image) {
    if (
      args[0].map.image.width === 64 &&
      args[0].map.image.height === 64 &&
      args[0].map.image.src !== muzzleImg &&
      !args[0].map.image.src.includes(muzzleImg2) &&
      localStorage.csl_enabled == "true"
    ) {
      let useurl = "";
      if (localStorage.csl_url_or_base64 == "false") {
        useurl = localStorage.csl_url;
      } else {
        useurl = localStorage.csl_colorpicker_inputurl;
      }
      if (useurl !== "" && useurl != undefined) args[0].map.image.src = useurl;
    }
  }

  return oldIsArr(...args);
};

//Runs on the original BKC custom skin link feature (made by infi and boden)
let localStoragekey1 =
  "SETTINGS___SETTING/PLAYERS___SETTING/RENDER_TEXTURE___SETTING";
let localStoragekey2 =
  "SETTINGS___SETTING/PLAYERS___SETTING/RENDER_COLOR___SETTING";

//HTML stuff
let option_group = document.createElement("div");
option_group.className = "csl-group";
let option = document.createElement("div");
option.className = "csl-option";
let canvas = document.createElement("canvas");
canvas.id = "canvas_colorpicker";
let colorpicker_head_label = document.createElement("label");
colorpicker_head_label.setAttribute("for", "colorpicker_head");
colorpicker_head_label.innerHTML = "Head color";
let colorpicker_head = document.createElement("input");
colorpicker_head.type = "color";
colorpicker_head.id = "colorpicker_head";
//colorpicker_head.value = "#ff00ff";
let colorpicker_body_label = document.createElement("label");
colorpicker_body_label.setAttribute("for", "colorpicker_body");
colorpicker_body_label.innerHTML = "body color";
let colorpicker_body = document.createElement("input");
colorpicker_body.type = "color";
colorpicker_body.id = "colorpicker_body";
let colorpicker_output = document.createElement("input");
colorpicker_output.type = "text";
colorpicker_output.id = "colorpicker_output";
colorpicker_output.readOnly = true;
let csl_enabled = document.createElement("div");
csl_enabled.className = "csl-option";
csl_enabled.innerHTML =
  '<span class="left">Enabled</span><div class="csl-checkbox"><input type="checkbox" id="csl_enabled"><label for="csl_enabled"></label></div>';
let output_container = document.createElement("div");
output_container.className = "csl-option";
let csl_url_or_base64 = document.createElement("div");
csl_url_or_base64.className = "csl-slider-switch";
csl_url_or_base64.innerHTML =
  '<input type="checkbox" id="csl_url_or_base64"><label for="csl_url_or_base64"></label>';
let csl_colorpicker_inputurl = document.createElement("input");
csl_colorpicker_inputurl.type = "text";
csl_colorpicker_inputurl.id = "csl_colorpicker_inputurl";
csl_colorpicker_inputurl.placeholder = "Insert custom url here";
let tooltip_container = document.createElement("div");
tooltip_container.className = "csl-tooltip-container";
let tooltip_icon = document.createElement("span");
tooltip_icon.className = "csl-info-icon";
tooltip_icon.innerHTML = "i";
tooltip_icon.tabindex = "0"
tooltip_icon.role = "button"
tooltip_icon.setAttribute('aria-describedby', "csl-tooltip-desc");
let option_inputfield_description = document.createElement("div");
option_inputfield_description.className = "csl-option";
let description_left = document.createElement("span");
description_left.className = "left";
description_left.innerHTML = "Skin from Imagebuilder";
let description_right = document.createElement("span");
description_right.className = "right";
description_right.innerHTML = "Skin from your input";
let tooltip_text = document.createElement("div");
tooltip_text.className = "csl-tooltip-text";
tooltip_text.id = "csl-tooltip-desc"
tooltip_text.role = "tooltip"
tooltip_text.innerText = `Made by SheriffCarry\nRuns on the original BKC custom skin link\n feature (made by infi and boden)`;
let style = document.createElement("style");
style.innerHTML = `
        /* 
         * =============================================
         * Custom Skin Loader (CSL) Component
         * =============================================
         */

        /* --- Variables --- */
        /* Using variables makes it easy to change the theme later */
        .csl-group {
            --csl-bg-primary: #333;
            --csl-bg-secondary: #444;
            --csl-text-primary: #fff;
            --csl-text-placeholder: #999;
            --csl-accent-color: #ffa500;
            --csl-border-radius: 5px;
            --csl-transition-speed: 0.3s;
        }

        /* --- Main Layout --- */
        .csl-group {
            display: flex;
            flex-direction: column;
            gap: 15px; /* Replaces margins for consistent spacing */
            font-family: sans-serif; /* A sensible default font */
            font-size: 14px;
        }

        .csl-option {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
        }

        .csl-option .left,
        .csl-option .right {
            flex-shrink: 0;
        }

        /* --- Tooltip --- */
        /* --- Tooltip --- */
        .csl-tooltip-container {
            position: relative;
            display: inline-block;
        }

        .csl-info-icon {
            display: inline-flex; /* Use flex for perfect centering */
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            background-color: var(--csl-bg-secondary);
            color: var(--csl-text-primary);
            border-radius: 50%;
            font-weight: bold;
            cursor: pointer;
            user-select: none; /* Prevents text selection on click */
        }

        .csl-tooltip-text {
            position: absolute;
            /* MODIFICATION #1: Position BELOW the icon */
            top: 100%; /* Position the top of the tooltip at the bottom of the icon */
            margin-top: 8px; /* Add some space between the icon and the tooltip */
            left: 50%;
            transform: translateX(-50%) scale(0.95); /* Start slightly smaller */
            width: max-content; /* Let the content define the width */
            max-width: 400px; /* But don't let it get too wide */
            padding: 10px;
            background-color: var(--csl-bg-primary);
            color: var(--csl-text-primary);
            border-radius: var(--csl-border-radius);
            /* Bump the z-index to ensure it's on top of other elements in the group */
            z-index: 100;
            text-align: center;
            white-space: normal; /* Allow text to wrap */
            
            /* Visibility & Animation */
            opacity: 0;
            visibility: hidden;
            pointer-events: none; /* Prevents interaction when hidden */
            transition: opacity var(--csl-transition-speed) ease,
                        transform var(--csl-transition-speed) ease;
        }

        /* Tooltip Arrow */
        .csl-tooltip-text::after {
            content: '';
            position: absolute;
            /* MODIFICATION #2: Move arrow to the top and flip it */
            bottom: 100%; /* Position the bottom of the arrow at the top of the tooltip */
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            /* This makes the arrow point UP */
            border-color: transparent transparent var(--csl-bg-primary) transparent;
        }
        
        /* Show tooltip on hover or focus for accessibility */
        .csl-tooltip-container:hover .csl-tooltip-text,
        .csl-info-icon:focus + .csl-tooltip-text {
            visibility: visible;
            opacity: 1;
            transform: translateX(-50%) scale(1); /* Scale to full size */
        }
        
        /* --- Form Elements --- */
        .csl-group input[type="text"] {
            padding: 8px 10px;
            border: 2px solid #555;
            background-color: #222;
            color: var(--csl-text-primary);
            border-radius: var(--csl-border-radius);
            transition: border-color var(--csl-transition-speed) ease;
        }

        .csl-group input[type="text"]:focus {
            outline: none;
            border-color: var(--csl-accent-color);
        }

        .csl-group input[type="text"].is-highlighted {
            border-color: var(--csl-accent-color);
        }

        .csl-group input[type="text"]::placeholder {
            color: var(--csl-text-placeholder);
            transition: color var(--csl-transition-speed) ease;
        }

        .csl-group input[type="text"]:hover::placeholder {
            color: #ccc;
        }

        /* Basic styling for color inputs */
        .csl-group input[type="color"] {
            border: none;
            padding: 0;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
        .csl-group input[type="color"]::-webkit-color-swatch {
            border-radius: 50%;
            border: 2px solid #555;
        }

        /* --- Custom Checkbox (Example) --- */
        /* A more robust and accessible custom checkbox style */
        .csl-checkbox {
          position: relative;
          display: inline-block;
        }
        .csl-checkbox input[type="checkbox"] {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }
        .csl-checkbox label {
          position: relative;
          cursor: pointer;
          padding-left: 28px;
          height: 20px;
          display: inline-block;
          line-height: 20px;
        }
        .csl-checkbox label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 18px;
          height: 18px;
          border: 2px solid #555;
          background-color: #222;
          border-radius: 3px;
          transition: all var(--csl-transition-speed) ease;
        }
        .csl-checkbox input[type="checkbox"]:checked + label::before {
          background-color: var(--csl-accent-color);
          border-color: var(--csl-accent-color);
        }
        .csl-checkbox label::after {
          content: '✔';
          position: absolute;
          left: 4px;
          top: 0;
          color: var(--csl-text-primary);
          opacity: 0;
          transform: scale(0);
          transition: all var(--csl-transition-speed) ease;
        }
        .csl-checkbox input[type="checkbox"]:checked + label::after {
          opacity: 1;
          transform: scale(1);
        }
		        .csl-slider-switch {
            position: relative;
            display: inline-block;
            width: 44px; /* Width of the slider track */
            height: 24px; /* Height of the slider track */
        }
        
        /* Hide the default checkbox input */
        .csl-slider-switch input[type="checkbox"] {
            opacity: 0;
            width: 0;
            height: 0;
            position: absolute;
        }

        /* The slider track */
        .csl-slider-switch label {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #555; /* Unchecked color */
            border-radius: 12px; /* Pill shape */
            transition: background-color var(--csl-transition-speed) ease;
        }

        /* The slider thumb (the moving circle) */
        .csl-slider-switch label::before {
            position: absolute;
            content: "";
            height: 20px; /* Size of the thumb */
            width: 20px;  /* Size of the thumb */
            left: 2px;    /* Initial position */
            bottom: 2px;  /* Initial position */
            background-color: var(--csl-text-primary);
            border-radius: 50%; /* Make it a circle */
            transition: transform var(--csl-transition-speed) ease;
        }

        /* --- The magic part: styles for the CHECKED state --- */
        .csl-slider-switch input:checked + label {
            background-color: var(--csl-accent-color); /* Checked color */
        }

        .csl-slider-switch input:checked + label::before {
            /* Move the thumb to the right. 44px (width) - 20px (thumb) - 4px (padding) = 20px */
            transform: translateX(20px);
        }
`;
option.appendChild(canvas);
option.appendChild(colorpicker_head_label);
option.appendChild(colorpicker_head);
option.appendChild(colorpicker_body_label);
option.appendChild(colorpicker_body);
tooltip_container.appendChild(tooltip_icon);
tooltip_container.appendChild(tooltip_text);
option_group.appendChild(style);
option_group.appendChild(tooltip_container);
option_group.appendChild(csl_enabled);
option_group.appendChild(option);
output_container.appendChild(colorpicker_output);
output_container.appendChild(csl_url_or_base64);
output_container.appendChild(csl_colorpicker_inputurl);
option_inputfield_description.appendChild(description_left);
option_inputfield_description.appendChild(description_right);
option_group.appendChild(option_inputfield_description);
option_group.appendChild(output_container);
let default_url =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAANJJREFUeF7t2EEKBDEIBdF4/0M7MAeIi0HmQ15v022LaJWkTp8+l6frenz79HtWXeM7//x/KYAOMAIY8E8ITYTchjAIPm+BPv2b6KceDj8vBdABRgADwjm1mh4IPm+BaRFa7b+A4OMqHJDjagoKYASGG6HV/gsIbgSMgBG4X4oGjOlqChiAARiAAW9fiGAABmAABqyuWuHBbYIswAIswALhoF5NjwVYgAVYgAVWMRsenAVYgAVYgAXCQb2aHguwAAuwAAusYjY8OAuwAAuwwNMW+AByY7e5Jy8jiwAAAABJRU5ErkJggg==";
let change_event = new Event("change", { bubbles: true });
const pixelData = [];
let d_colorpicker_output;
let d_csl_enabled;
let d_canvas_colorpicker;
let d_colorpicker_head;
let d_colorpicker_body;
let canvas_loaded = false;
function fixLocalStorage() {
  if (!localStorage[localStoragekey1]) {
    localStorage[localStoragekey1] = "1";
  }
  if (localStorage[localStoragekey1] != "1") {
    localStorage[localStoragekey1] = "1";
  }
  if (!localStorage[localStoragekey2]) {
    localStorage[localStoragekey2] = "#ffffff";
  }
  if (localStorage[localStoragekey2] != "#ffffff") {
    localStorage[localStoragekey2] = "#ffffff";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => {
    startfunction();
  }, 1000);
});

  setTimeout(() => {
    startfunction();
  }, 1000);

async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(url);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image")) {
      throw new Error("URL does not point to an image");
    }

    const blob = await response.blob();
    const base64String = await blobToBase64(blob);
    return base64String;
  } catch (error) {
    console.error("Error fetching or converting image: ", error);
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function displayStartingCanvas(img_display) {
  let canvas = d_canvas_colorpicker;
  let ctx = canvas.getContext("2d");
  canvas.width = img_display.width;
  canvas.height = img_display.height;

  //canvas draw
  ctx.drawImage(img_display, 0, 0);
}

function displayNewImage(src) {
  let canvas = d_canvas_colorpicker;
  let ctx = canvas.getContext("2d");
  canvas.width = img_display.width;
  canvas.height = img_display.height;

  //canvas draw
  ctx.drawImage(img_display, 0, 0);
}

function handleHighlight() {
  if (localStorage.csl_url_or_base64 == "true") {
    document.getElementById("colorpicker_output").className = "";
    document.getElementById("csl_colorpicker_inputurl").className =
      "is-highlighted";
  } else {
    document.getElementById("colorpicker_output").className =
      "is-highlighted";
    document.getElementById("csl_colorpicker_inputurl").className = "";
  }
}

function startfunction() {
  //Checks if the script-options are loaded in to ensure it can add stuff in the right menu
  if (document.querySelector("#menuMainContent > div:nth-child(5)")) {
    document.querySelector("#menuMainContent > div:nth-child(5)").appendChild(option_group);
    handleHighlight();
    let csl_url_or_base64 = document.getElementById("csl_url_or_base64");
    if (localStorage.csl_url_or_base64 == undefined) {
      localStorage.csl_url_or_base64 = false;
    }
    if (localStorage.csl_url_or_base64 == "true") {
      csl_url_or_base64.checked = true;
      handleHighlight();
    }
    csl_url_or_base64.addEventListener("change", function (event) {
      let value = csl_url_or_base64.checked;
      if (localStorage.csl_url_or_base64 == undefined) {
        localStorage.csl_url_or_base64 = value;
      } else if (localStorage.csl_url_or_base64 != value) {
        localStorage.csl_url_or_base64 = value;
      }
      handleHighlight();
    });
    let csl_colorpicker_inputurl = document.getElementById(
      "csl_colorpicker_inputurl",
    );
    if (localStorage.csl_colorpicker_inputurl != undefined) {
      csl_colorpicker_inputurl.value = localStorage.csl_colorpicker_inputurl;
    }
    csl_colorpicker_inputurl.addEventListener("change", function (event) {
      localStorage.csl_colorpicker_inputurl = csl_colorpicker_inputurl.value;
      fetchImageAsBase64(csl_colorpicker_inputurl.value).then((base64Image) => {
        if (typeof base64Image == "string") {
          csl_colorpicker_inputurl.value = base64Image;
          localStorage.csl_colorpicker_inputurl = base64Image;
        }
      });
    });
    d_colorpicker_output = document.getElementById("colorpicker_output");
    d_csl_enabled = document.getElementById("csl_enabled");
    d_canvas_colorpicker = document.getElementById("canvas_colorpicker");
    d_colorpicker_head = document.getElementById("colorpicker_head");
    d_colorpicker_body = document.getElementById("colorpicker_body");
    if (localStorage.csl_head != undefined) {
      d_colorpicker_head.value = localStorage.csl_head;
    } else {
      d_colorpicker_head.value = "#ff00ff";
    }
    if (localStorage.csl_body != undefined) {
      d_colorpicker_body.value = localStorage.csl_body;
    } else {
      d_colorpicker_body.value = "#00ff00";
    }

    d_colorpicker_output.addEventListener("change", function (event) {
      let value = d_colorpicker_output.value;
      if (localStorage.csl_url == undefined) {
        localStorage.csl_url = value;
        let img = new Image();
        img.src = value;
        img.onload = function () {
          displayStartingCanvas(img);
        };
      } else if (localStorage.csl_url != value) {
        localStorage.csl_url = value;
        let img = new Image();
        img.src = value;
        img.onload = function () {
          displayStartingCanvas(img);
        };
      }
    });
    if (localStorage.csl_enabled == "true") {
      d_csl_enabled.checked = true;
      fixLocalStorage();
    }
    d_csl_enabled.addEventListener("change", function (event) {
      localStorage.csl_enabled = d_csl_enabled.checked;
      if (localStorage.csl_enabled == "true") {
        fixLocalStorage();
      }
    });
    let img_display = new Image();
    let img = new Image();
    img.src = default_url;
    if (localStorage.csl_url == undefined) {
      d_colorpicker_output.value = default_url;
      d_colorpicker_output.dispatchEvent(change_event);
      img_display.src = default_url;
    } else {
      d_colorpicker_output.value = localStorage.csl_url;
      d_colorpicker_output.dispatchEvent(change_event);
      img_display.src = localStorage.csl_url;
    }

    //modifyable image
    img.onload = function () {
      const canvas = d_canvas_colorpicker;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      //canvas draw
      ctx.drawImage(img, 0, 0);

      //collects pixel information
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let pixels = imgData.data;

      //stores pixel in an array of objects [{x, y, r, g, b, a}]
      for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];

        //x and y coords
        let x = (i / 4) % canvas.width;
        let y = Math.floor(i / 4 / canvas.width);

        //storing
        pixelData.push({ x, y, r, g, b, a });
      }

      //event listener
      d_colorpicker_head.addEventListener("input", updateTexture);
      d_colorpicker_body.addEventListener("input", updateTexture);
      displayStartingCanvas(img_display);
    };

    //display last used image
    img_display.onload = function () {
      displayStartingCanvas(img_display);
    };
  }
}

//big chungis function
function updateTexture() {
  localStorage.csl_body = d_colorpicker_body.value;
  localStorage.csl_head = d_colorpicker_head.value;
  let canvas = d_canvas_colorpicker;
  let ctx = canvas.getContext("2d");
  let headColor = hexToRgb(d_colorpicker_head.value);
  let bodyColor = hexToRgb(d_colorpicker_body.value);

  let pixelData2 = [];

  //makes the new pixel objects
  for (let i = 0; i < pixelData.length; i++) {
    let pixel = {};
    pixel.a = pixelData[i].a;
    pixel.x = pixelData[i].x;
    pixel.y = pixelData[i].y;

    if (pixelData[i].g === 255) {
      //body color
      pixel.r = bodyColor.r;
      pixel.g = bodyColor.g;
      pixel.b = bodyColor.b;
    } else {
      //head color
      pixel.r = headColor.r;
      pixel.g = headColor.g;
      pixel.b = headColor.b;
    }
    pixelData2.push(pixel);
  }

  //data holder for new image data
  let newImageData = ctx.createImageData(canvas.width, canvas.height);

  for (let i = 0; i < pixelData2.length; i++) {
    let pixel = pixelData2[i];
    let index = (pixel.y * canvas.width + pixel.x) * 4;

    //modifies the image with pixel details
    newImageData.data[index] = pixel.r;
    newImageData.data[index + 1] = pixel.g;
    newImageData.data[index + 2] = pixel.b;
    newImageData.data[index + 3] = pixel.a;
  }

  //makes the image on the canvas
  ctx.putImageData(newImageData, 0, 0);

  //output
  let output = canvas.toDataURL();
  d_colorpicker_output.value = output;
  //to ensure that the triggers a change event
  d_colorpicker_output.dispatchEvent(change_event);
}

// the function tells what it does smh
//made this function with chatgpt (thanks to the guy that provided it that data)
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}