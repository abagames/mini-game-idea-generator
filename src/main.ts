import * as keywords from "./keywords";

let lang: string;
let verbs: string[];
let isTransitive: boolean[];
let objectives: string[];

let listDiv;

function init() {
  // Get lang URL query parameter
  lang = new URLSearchParams(window.location.search).get("lang") as string;
  // If lang is not specified, use en
  if (!lang) {
    lang = "en";
  }
  verbs = keywords[`verbs_${lang}`];
  isTransitive = keywords[`isTransitive_${lang}`];
  objectives = keywords[`objectives_${lang}`];
  listDiv = document.getElementById("list");
  // Add new ideas if the button is clicked
  const addButton = document.getElementById(
    "add-ideas-button"
  ) as HTMLButtonElement;
  addButton.addEventListener("click", addNewIdeas);
  addNewIdeas();
}

function addNewIdeas() {
  // Remove unchecked ideas from the array
  ideas = ideas.filter((idea) => {
    if (idea.isChecked) {
      return true;
    } else {
      idea.div.remove();
      return false;
    }
  });
  const addingCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < addingCount; i++) {
    addIdeaListItem();
  }
}

let ideaIndex = 0;
let ideas: { idea: string; div: HTMLDivElement; isChecked: boolean }[] = [];

function addIdeaListItem() {
  // Select the random verb from the array
  const verbsIndex = Math.floor(Math.random() * verbs.length);
  const randomVerb = verbs[verbsIndex];
  // Is randomVerb is transitive?
  const _isTransitive = isTransitive[verbsIndex];
  // Select the random objective from the array
  const randomObjective =
    objectives[Math.floor(Math.random() * objectives.length)];
  // If randomVerb is transitive, generate verb + objective string
  const idea =
    _isTransitive && Math.random() < 0.7
      ? keywords[`getTransitiveIdea_${lang}`](randomVerb, randomObjective)
      : keywords[`getIntransitiveIdea_${lang}`](randomVerb, randomObjective);
  // Add the idea to the list
  const ideaDiv = document.createElement("div");
  ideaDiv.classList.add("form-check");
  ideaDiv.innerHTML = `
  <input class="form-check-input" type="checkbox"
  value="idea-check-${ideaIndex}"
  id="idea-check-id-${ideaIndex}">
  <label class="form-check-label display-5" for="idea-check-${ideaIndex}">
  ${idea}
  </label>`;
  listDiv.appendChild(ideaDiv);
  // Add animation to the new idea list item
  ideaDiv.classList.add("animate__animated", "animate__fadeInUp");
  // Set duration of animation
  ideaDiv.style.setProperty("--animate-duration", "0.5s");
  const ideaItem = { idea, div: ideaDiv, isChecked: false };
  ideas.push(ideaItem);
  // Set isChecked to true if the checkbox is checked
  const ideaCheckBox = document.getElementById(
    `idea-check-id-${ideaIndex}`
  ) as HTMLInputElement;
  ideaCheckBox.addEventListener("change", () => {
    ideaItem.isChecked = ideaCheckBox.checked;
  });
  ideaIndex++;
}

window.addEventListener("load", init);
