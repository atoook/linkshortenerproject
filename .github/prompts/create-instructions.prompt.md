---
agent: instructions-generator
model: Claude Sonnet 4.6
name: create-instructions
description: This agent generates highly specific agent instruction files for the /docs directory.
---

Take the information below and generate an agent instructions .md file for it in the /docs directory. If a .md filename is provided, use that, otherwise generate an appropriate filename based on the content. Make sure the instructions are concise and not too long. Make sure to update the AGENTS.md file to reference this new docs file. If no information is provided, prompt the user to give the necessary details about the layer of architecture or coding standards to document.
