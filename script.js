import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import inquirer from "inquirer";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

async function promptUser() {
  const { input } = await inquirer.prompt([
    {
      type: "input",
      name: "input",
      message: "Enter your input:",
    },
  ]);

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });

  console.log(res.data.choices[0].message.content);

  promptUser();
}

promptUser();
