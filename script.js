document.getElementById("passwordInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkPassword();
  }
});
// charith neranga website
function checkPassword() {
  const correctPassword = "1234";
  const input = document.getElementById("passwordInput").value.trim();
  if (input === correctPassword) {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("protectedContent").style.display = "block";
  } else {
    alert("❌ Incorrect password. Try again.");
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processText() {
  const input = document.getElementById('inputText').value;
  const outputDiv = document.getElementById('output');
  const highlightAll = document.getElementById('highlightAll').checked;

  const selectionsMatch = input.match(/SELECTIONS\s*([\s\S]*)/i);
  if (!selectionsMatch) {
    outputDiv.innerHTML = "<span style='color:red;'>❌ SELECTIONS section not found.</span>";
    return;
  }

  const selectionText = selectionsMatch[1];
  const horseRegex = /\d{1,2}\.\d{2}\s+([^(,\n\r]+)(\s*\(NAP\))?/g;

  let horseEntries = [];
  let match;
  while ((match = horseRegex.exec(selectionText)) !== null) {
    let horseName = match[1].trim();
    let hasNAP = !!match[2];
    horseEntries.push({ horseName, hasNAP });
  }

  // charith neranga website
  
  if (horseEntries.length === 0) {
    outputDiv.innerHTML = "<span style='color:red;'>❌ No horse names found in SELECTIONS.</span>";
    return;
  }

  horseEntries.sort((a, b) => b.horseName.length - a.horseName.length);
  let outputText = input;

  horseEntries.forEach(entry => {
    const escapedName = escapeRegex(entry.horseName);
    const regex = new RegExp(`(?<!<strong[^>]*?>)(\\b${escapedName}\\b)(?=[\\s.,;!?'")]|$)`, highlightAll ? 'gi' : 'i');

    if (entry.hasNAP) {
      outputText = outputText.replace(regex, match => `<strong class="red-highlight">${match}</strong>`);
    } else {
      outputText = outputText.replace(regex, match => `<strong class="green-highlight">${match}</strong>`);
    }
  });

  const specialWords = ['today', 'yesterday', 'saturday', 'sunday','friday', 'tomorrow', 'monday' , 'on a monday'];
  specialWords.forEach(word => {
    const escapedWord = escapeRegex(word);
    const regex = new RegExp(`(?<!<strong[^>]*?>)(\\b${escapedWord}\\b)`, 'gi');
    outputText = outputText.replace(regex, match => `<strong class="yellow-highlight">${match}</strong>`);
  });

  outputDiv.innerHTML = outputText;
}

function clearText() {
  document.getElementById('inputText').value = '';
  document.getElementById('output').innerHTML = '';
  document.getElementById('highlightAll').checked = false;
}





