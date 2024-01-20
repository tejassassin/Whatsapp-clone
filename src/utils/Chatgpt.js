import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "put your api key here",
  dangerouslyAllowBrowser: true,
});

async function chatgpt(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 50,
  });

  let reply = completion.choices[0].message.content;

  return reply;
}

export default chatgpt;
