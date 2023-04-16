export const runtime = "experimental-edge"

type PromptRequest = String


export async function POSTAPI(prompt: PromptRequest) {
  console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY)
  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    console.log("not setup key...")
    throw new Error("Missing API Key...")
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        stream: false,
        n: 1,
      }),
    })
    console.log(response)
    const json = await response.json()
    return new Response(json.choices[0].message.content)
  } catch (e) {
    console.log(e)
    return new Response("Request cannot be processed!", {
      status: 400,
    })
  }
}